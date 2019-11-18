/**
 * web端实现滚动到底部的方法(滚动触底方法)
 * 
 * 实现原理：
 * 
 * 判断滚动条到底部，需要用到DOM的三个属性值，即scrollTop、clientHeight、scrollHeight。
 *   scrollTop为滚动条在Y轴上的滚动距离。
 *   clientHeight为内容可视区域的高度。
 *   scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
 *   滚动条到底部的条件即为scrollTop + clientHeight == scrollHeight
 *
 */

/**
 * document.body 与 document.documentElement区别介绍
 * 
 * document.body  返回html dom中的body节点 即<body>
 * document.documentElement  返回html dom中的root 节点 即<html>
 * 
 * 获取 scrollTop 方面的具有差异（https://www.cnblogs.com/mrdooo/p/6633688.html）
 * 兼容方法： var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
 *      
 */

// 滚动条在Y轴上的滚动距离
function getScrollTop(dom) {
    if (dom) {
        return dom.scrollTop;
    } else {
        let scrollTop = 0;
        let bodyScrollTop = 0;
        let documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }
}

// 文档的总高度
function getScrollHeight(dom) {
    if (dom) {
        return dom.scrollHeight;
    } else {
        let scrollHeight = 0;
        let bodyScrollHeight = 0;
        let documentScrollHeight = 0;

        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        if (bodyScrollHeight - documentScrollHeight > 0) {
            scrollHeight = bodyScrollHeight;
        } else {
            scrollHeight = documentScrollHeight;
        }
        return scrollHeight;
    }
}

// 浏览器视口的高度
function getWindowHeight() {
    let windowHeight = 0;
    if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

function onReachBottom(callback, dom, offset) {
    let node = dom ? dom : window;
    offset = offset ? offset : 0;
    node.onscroll = () => {
        if ((getScrollTop(dom) + getWindowHeight(dom) - offset) === getScrollHeight(dom)) {
            console.log('已经到最底部了');
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    };
}


export default {
    onReachBottom,
    
}