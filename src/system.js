import { UAParser } from 'ua-parser-js';

/**
 * system: 获取系统，或者浏览器的一些信息
 * 
 */

 
/*
判断横屏竖屏
*/
function getOrientInfo() {
    if (window.orientation == 180 || window.orientation == 0) {
        return 'horizontal';
    }
    if (window.orientation == 90 || window.orientation == -90) {
        return 'vertical';
    }
    return null;
}
 
class DeviceInfo {
    constructor() {
        const uaParser = new UAParser();
        const { browser, cpu, device, engine, os, ua } = uaParser.getResult();
        this.browser = browser;
        this.cpu = cpu;
        this.device = device;
        this.engine = engine;
        this.os = os;
        this.ua = ua;
        this.orientInfo = getOrientInfo();
    }
    getBrowser() {
        return this.browser;
    }
    getCPU() {
        return this.cpu;
    }
    getDevice() {
        return this.device;
    }
    getEngine() {
        return this.engine;
    }
    getOs() {
        return this.os;
    }
    getUA() {
        return this.ua;
    }
    getOrient() {
        return this.orientInfo;
    }
}

const deviceInfo = new DeviceInfo();

export default{
    deviceInfo,
}