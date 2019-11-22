/**
 * 在页面点击的时候出现不同颜色的小心心
 */


/**
 * todo: 实现心心每次可以是不同的颜色
 */


import common from './common';

const config = {
    width: 20,
    height: 20,
    canClick: true,
    loadCss: false,
};

const iconSVG = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1574062685525" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="753" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs><style type="text/css"></style></defs><path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" fill="#d81e06" p-id="754"></path></svg>`;

function initIcon (x, y) {
    let div = document.createElement('div');
    div.classList.add('icon-heart');
    const id = 'heart_' + getId();
    div.id = id;
    div = addStyle(div, x, y);
    let wrap = document.createElement('div');
    wrap.classList.add('bounceInUp');
    wrap.innerHTML = iconSVG;
    div.appendChild(wrap);
    document.body.appendChild(div);
    addCss();
    clearDom(id);
}
//随机生成一个id，时间戳防止id重复
function getId() {
    return Math.random().toString(36).slice(2) + (new Date().getTime());
}

function addStyle(dom, x, y) {
    dom.style.position = 'fixed';
    dom.style.left = x + 'px';
    dom.style.top = y + 'px';
    dom.style.width = config.width + 'px';
    dom.style.height = config.height + 'px';
    // dom.style.transform = `rotate(${common.getRandom(-30, 30)}deg)`;
    return dom;
}


function addCss() {
    if (config.loadCss) {
        return;
    }
    let style = document.createElement("style");
    style.type = "text/css";
    try{
    　　style.appendChild(document.createTextNode(".bounceInUp{animation-name: bounceInUp;animation-duration: 1.4s;animation-fill-mode: both;}"));
    　　style.appendChild(document.createTextNode("@keyframes bounceInUp{from{transform: translate3d(0, 0, 0);} to {transform: translate3d(0, -100px, 0); opacity: 0} }"));
    }catch(ex){
    　　 style.styleSheet.cssText = ".bounceInUp{animation-name: bounceInUp;animation-duration: 1.4s; animation-fill-mode: both;}";//针对IE
        style.styleSheet.cssText = "@keyframes bounceInUp{from{transform: translate3d(0, 0, 0);}  to {transform: translate3d(0, -100px, 0); opacity: 0} }";
    }
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
    config.loadCss = true;
}

function start() {
    document.addEventListener('click',(e) => {
        const x = e.clientX, y = e.clientY;
        if (config.canClick) {
            initIcon((x-config.width/2), (y-config.height/2));
        }
    }, false);
}

function stop() {
    config.canClick = false;
}

function restart() {
    config.canClick = true;
}
//定时清除多余dom，防止由于dom过多导致浏览器崩溃
function clearDom(id) {
    const node = document.querySelector('#' + id);
    setTimeout(() => {
        node && node.remove();
    }, 5000);
}

export default {
    start,
    stop,
    restart
}