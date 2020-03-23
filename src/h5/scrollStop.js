/**
 * 在h5页面中判断页面是否停止了滚动
 * 实现原理：在页面滚动后每100ms进行一次检测，如果相邻两次的滚动条的高度值一样，则判断为停止了滚动
 */

export function scrollStop(callback) {
    const original = window.onscroll;
    let isCall = false;
    window.onscroll = function() {
        let preScrollTop = getScrollTop();
        let timeId = window.setInterval(() => {
            let scrollTop = getScrollTop();
            if (preScrollTop === scrollTop) {
                clearInterval(timeId);
                console.log('-------滚动停止了------');
                !isCall && callback && callback();
                isCall = true;
                original && original.apply(undefined, arguments);
            } else {
                preScrollTop = scrollTop;
                console.log('--------滚动没有停止---------');
            }
        }, 500);
    }
}

function getScrollTop() {
    let scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scroll_top = document.body.scrollTop;
    }
    return scroll_top;
}