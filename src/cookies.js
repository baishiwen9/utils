/*
* 对cookies进行封装，使用更方便
*/

/**
 * cookies简介：
 * 存储cookie是浏览器提供的功能。cookie 其实是存储在浏览器中的纯文本，浏览器的安装目录下会专门有一个 cookie 文件夹来存放各个域下设置的cookie。
 * 每个域名下的cookie 的大小最大为4KB，每个域名下的cookie数量最多为20个
 * JS 原生的 API提供了获取cookie的方法：document.cookie（这个方法只能获取非HttpOnly类型的cookie）
 * 
 */

 /**
  * cookies属性简介：
  *  expires：设置“cookie什么时间内有效”。expires其实是cookie失效日期，expires必须是 GMT 格式的时间（可以通过new Date().toGMTString()或者 new Date().toUTCString() 来获得）
  *  domain： 域名， domain的默认值为设置该cookie的网页所在的域名
  *  path： 路径， path默认值为设置该cookie的网页所在的目录
  *  所以domain和path两个选项共同决定了cookie何时被浏览器自动添加到请求头部中发送出去。
  *  secure：用来设置cookie只在确保安全的请求中才会发送。当请求是HTTPS或者其他安全协议时，包含 secure 选项的 cookie才能被发送至服务器。
  *  HttpOnly： 用来设置cookie是否能通过 js 去访问
  * 在设置这些属性时，属性之间由一个分号和一个空格隔开。
  */

/**
 * 正则解读：
 * (^| ) ：表示是字符串开头或者空格
 * ([^;]*)：其中[^;]表示除开";"之外的其它字符([^;]*)表示0到多个";"之外的字符
 * (;|\x24)：表示以";"或者"\x24"作为匹配结束。
 */

function getRaw(key) {
    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
        result = reg.exec(document.cookie);
        
    if (result) {
        return result[2] || null;
    }

    return null;
}

function setRaw(key, value, options) {
    options = options || {};
    var expires = options.expires;
    if ('number' == typeof options.expires) {
        expires = new Date();
        expires.setTime(expires.getTime() + options.expires);
    }
    
    document.cookie =
        key + "=" + value
        + (options.path ? "; path=" + options.path : "")
        + (expires ? "; expires=" + expires.toGMTString() : "")
        + (options.domain ? "; domain=" + options.domain : "")
        + (options.secure ? "; secure" : ''); 
}



function set(key, value, options) {
    setRaw(key, encodeURIComponent(value), options);
}

function get(key) {
    var value = getRaw(key);
    if ('string' == typeof value) {
        value = decodeURIComponent(value);
        return value;
    }
    return null;
}

function remove(key, options) {
    options = options || {};
    options.expires = new Date(0);
    setRaw(key, '', options);
}


export default {
    set,
    get,
    remove,
}