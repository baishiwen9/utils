/**
 * 小程序性能监控方法，主要监控小程序的启动时间，白屏时间，首屏时间
 * 
 */


/**
 * SDK 公共信息
 *    sv: 版本号
 *    baseUrl: 上报数据的url
 */

const SDK_config = {
    sv: '1.0.0',
    baseUrl: 'https://xxx.xxxxx.com/performance.gif',
};

/**
 * 用来存储性能的所有信息的obj
 */
const performanceObj = {};

/**
 * 获取公共信息
 */
const getCommonInfo = async (options) => {
    const wxInfo = wx.getSystemInfoSync();
    const network = await getNetworkType();
    const commonInfo = {
        ts: new Date().getTime(),                   //时间戳
        sv: SDK_config.sv,                          //该SDK的版本号
        nt: network,                                //网络类型
        os: wxInfo.platform,                        //操作系统，ios，android
        dm: wxInfo.brand + '-' + wxInfo.model,      //机型
        wv: wxInfo.version,                         //微信版本号
        sdkv: wxInfo.SDKVersion,                    //基础库SDK版本号
        ov: wxInfo.system,                          //操作系统版本号
        appid: '',                                  //项目id
        type: 'miniApp',                            //小程序标志
    };
    Object.assign(performanceObj, commonInfo, options);
}

/**
 * 获取网络状态
 */
const getNetworkType = () => {
    return new Promise((resolve, reject) => {
        wx.getNetworkType({
            success ({ networkType }) {
                resolve(networkType);
            },
            fail () {
                reject('unknown');
            }
        });
    });
}

/**
 * 初始化
 * @param {*} options 
 */
const init = (options) => {
    if (options && Object.prototype.toString.call(options) === "[object Object]") {
        getCommonInfo(options);
    }
}

/**
 * 计时开始
 * @param {*} pi 当前页面的id
 */
const start = (pi) => {
    if (!pi || Object.prototype.toString.call(pi) !== '[object String]') {
        throw Error('pi不能为空&pi只能为字符串');
    }
    Object.assign(performanceObj, {
        startTime: new Date().getTime(),
        pi: pi,
    });
}

/**
 * 统计时间并且发送请求上报
 * @param {*} type 计时的类型，分为：启动时间，白屏时间，首屏时间 
 */
 //每个页面只发送一次请求，所以会等到首屏时间统计完成后一起发送

const send = (type) => {
    const endTime = new Date().getTime();
    const diffTime = endTime - performanceObj.startTime;
    let isSend = false;
    //启动时间
    if (!type || type == 0 || type === 'st') {
        performanceObj.st = diffTime;
        isSend = true;
    }
    //白屏时间
    if (type === 'frt'|| type == 1) {
        performanceObj.frt = diffTime;
        isSend = false;
    }
    //首屏时间
    if (type === 'fst' || type == 2) {
        performanceObj.fst = diffTime;
        isSend = true;
    }
    //上报数据
    if (isSend) {
        delete performanceObj.startTime;
        console.log('性能监控上报的数据: ', performanceObj);
        imgLog(SDK_config.baseUrl, performanceObj);
    }
}

/**
 * 格式化参数
 * @param {*} dataObj 
 */
const jsonToUrlString = (dataObj) => {
    if(Object.prototype.toString.call(dataObj) != "[object Object]"){
        console.log('invalid param type, expected object.')
        return '';
    }
    const arr = [];
    for(let i in dataObj){
        arr.push( i + '=' + encodeURIComponent(dataObj[i]) );
    }
    return arr.join('&');
}

/**
 * 图片打点发送数据
 * @param {*} baseUrl 
 * @param {*} data  
 */
const imgLog = (baseUrl, data) => {
    if(data && Object.prototype.toString.call(data) != "[object Object]"){
        console.log('invalid param type, expected object.')
        return;
    };
    wx.getImageInfo({
        src: baseUrl + '?' + jsonToUrlString(data),
        success: function(res) {
            console.log('性能数据上报成功', res);
        }
    })
}

export default {
    init,
    start,
    send,
}