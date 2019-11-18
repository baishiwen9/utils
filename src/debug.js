/**
 * 开启测试模式的方法，开启后可打开VConsole
 */

const vconsoleUrl = 'https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js';

function open() {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    if (hostname.indexOf('dev') !== -1 || hostname.indexOf('localhost') !== -1 
        || hostname.indexOf('test') !== -1 || protocol === 'file:') {
        loadjs(vconsoleUrl, () => {
            if (window.VConsole) {
                new window.VConsole();
            } 
        });
    }
}


function close() {
    const vconsole = document.querySelector('#__vconsole');
    vconsole && vconsole.remove();
}

 // 加载js脚本
 const loadjs = (url, success, fail) => {
    const script = document.createElement('script');
    script.onload = () => {
        success && typeof success === 'function' && success();
    };
    script.onerror = () => {
        fail && typeof fail === 'function' && fail();
    };
    script.async = true;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}



export default {
    open,
    close
}