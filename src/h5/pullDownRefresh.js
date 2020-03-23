
const style = {
    refresh_bar: {
        'margin-top': '-60px',
        'height': '50px',
        'text-align': 'center',
        'line-height': '50px',
        'font-size': '14px',
        'color': '#666',
        'z-index': 1,
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
    },
    refresh_icon: {
        'width': '10px',
        'height': '20px',
        'display': 'inline-block',
        'vertical-align': 'middle',
        'background-image': 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABQBAMAAAD8TNiNAAAAJ1BMVEUAAACqqqplZWVnZ2doaGhqampoaGhpaWlnZ2dmZmZlZWVmZmZnZ2duD78kAAAADHRSTlMAA6CYqZOlnI+Kg/B86E+1AAAAhklEQVQ4y+2LvQ3CQAxGLSHEBSg8AAX0jECTnhFosgcjZKr8StE3VHz5EkeRMkF0rzk/P58k9rgOW78j+TE99OoeKpEbCvcPVDJ0OvsJ9bQs6Jxs26h5HCrlr9w8vi8zHphfmI0fcvO/ZXJG8wDzcvDFO2Y/AJj9ADE7gXmlxFMIyVpJ7DECzC9J2EC2ECAAAAAASUVORK5CYII=")',
        'background-size': '100% 100%',
        'margin-right': '6px',
        'margin-bottom': '3px',
    },
    up: {
        'transform': 'rotate(180deg)',
        'transition': '-webkit-transform .5s',
    },
    loading: {
        'display': 'inline-block',
        'width': '16px',
        'height': '16px',
        'content': " ",
        '-webkit-animation': 'pull-loading 1.6s step-start infinite',
        'vertical-align': 'middle',
        'background-image': 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAABg1BMVEUAAAC9vcGpqayzs7bNzdGYmJuVlZjKys6bm5/Jyc2cnJ+cnJ/Kys3Ly8+cnJ/R0dWfn6PJyczDw8fIyMzR0dXIyMzExMeioqXLy8+oqKzNzdGzs7a2trmdnaCUlJevr7LHx8uXl5q2trmenqGwsLO2trqxsbWhoaSXl5qxsbS1tbmwsLSjo6eUlJe4uLucnJ+VlZjIyMzDw8eysragoKOXl5qVlZjR0dXR0dW2trqioqbCwsbR0dWjo6a2trqZmZyzs7agoKPR0dWjo6bCwsbQ0NSvr7LJyc2cnKDFxcm8vL+ZmZzOztHMzNC+vsKXl5uZmZyjo6a9vcGYmJyurrGtrbHOztK3t7ucnJ+urrGjo6fHx8uxsbTDw8etrbCkpKe4uLzBwcWxsbSbm564uLvExMjR0dWYmJuUlJiioqbNzdHDw8e7u7+oqKvIyMy3t7q1tbmwsLOurrKdnaCcnJ+pqazCwsa9vcHJyc3OztLMzNCXl5qqqq2hoaW+vsK+vsHIyMsWRiyNAAAAZnRSTlMA5uYS5uaBExMQEAwLAQH4+Pf2wYODg4BfSSAMAcHBwKqpg4KBf19fXCL49/f39fX05ubm5ubm5cTEw8G+vru4q6uqhX9+fn19WUpKSUlJSSQhHh739efl5eTkxsS3qKinpoeEWSQqdCoWAAACIElEQVQ4y7XT91faUBTA8RumEBKRLaAisrR171m3VVut3Xs3JVDCtnQI/dN783g5jDzHL35/5HzOveddTkDfA5PpIdwkUyZjgiuy7e3ZQO1XJvO7+cvBgY0B1yRpSWiHgrumuBmwV5KkQDs8rClKHwNuI1x0tKBjGmGEAYPqSE8LetWBQWDkQdgb1GCwr6b88wIrxyLKbYDn5DwRHDjt6AD2wfHhR4AF1JHawdWB5G3fIq53zStZ0un0uIXHeyxJ0hrQ3IryRsA1Plc2m93VILaQEsHq8Vg1aPV6rSAEZpCdn+/S1WnSYA90ZXVniVulf5CYWiDS0g19hM0cCqDFW6aYEJnL1/n0J8NT9/SrV12fHsOtdTr/hzR/CoxOuHq93mg0uBMwf6eZWZD7SeOugz9oHBybqTtmwSOOuiO4rfDgk/qDGzcmPnYenP8yWalURrphPJ/PT0RDoCWmXiIrl3UwWiggffE1DCT7AGHlAf3q5QKhy0ZQu0/YXFKEHr8fMUWxmBHCiVlC402IzDnCA4grF/K6BodKxbe4MhQdQxqnq51b5ONKXsjyXYB+g6Ef4FmpWEwANro5tmHsfPocwg8AhlzVAPC+VCrOhoDVjjrwDCCXq/7FQU9x5GeWO3PKsrwDGoQYjrwzyoBb6F7zLRh6hSM3GVAdmIQWhIQ6kgHXZXlFbIdhvNAQA9r9fjtQWG3efH/fCJdGz3N99OC6/gMPF6RsShfrcQAAAABJRU5ErkJggg==")',
        'background-size': '100% 100%',
        'margin-bottom': '3px',
    }
}


const nodeObj = {
    iconNode: null,
    textNode: null,
}
/**
 * 获取刷新时的顶部bar
 */
function getRefreshBar(root) {
    let barDom = document.createElement('div');
    barDom.setAttribute('class', 'refresh-bar');
    barDom = setStyle(barDom, style.refresh_bar);

    let iconDom = document.createElement('div');
    iconDom.setAttribute('class', 'refresh-icon');
    iconDom = setStyle(iconDom, style.refresh_icon);
    iconDom = setStyle(iconDom, style.loading);
    nodeObj.iconNode = iconDom;

    let textDom = document.createElement('div');
    textDom.setAttribute('class', 'refresh-text');
    textDom.innerText = '下拉刷新';
    nodeObj.textNode = textDom;

    barDom.appendChild(iconDom);
    barDom.appendChild(textDom);
    root.appendChild(barDom);
}
/**
 * 
 * @param {node} node dom节点
 * @param {object} style 样式
 */
function setStyle(node, style){
    for (let key in style) {
        let newKey = '';
        if (key.indexOf('-') > -1) {
            let keys = key.split('-');
            newKey = keys[0] + keys[1].slice(0,1).toLocaleUpperCase() + keys[1].slice(1);
        } else {
            newKey = key;
        }
        node.style[newKey] = style[key];
    }
    return node;
}

function addClass(node, cls) {
    node.classList.add(cls);
    return node;
}

function removeClass(node, cls) {
    node.classList.remove(cls);
    return node;
}

/**
 * 辅助工具
 */
const Utils = {
    getEle: function(selector, scope) {
        let doc = scope || document;
        return doc.querySelector(selector);
    },

}

function PullDownRefresh(){
    this.dragStart = 0;           // 开始抓取标志位
    this.translateY = 0;          // 滑动值，Y轴
    this.moveCount = 50;     // 临界值
    this.wrapper = null;
    // this.init();
    this.callback = null;
}

PullDownRefresh.prototype = {
    init: function(options) {
        this.wrapper = Utils.getEle(options.root);
        getRefreshBar(this.wrapper);
        this.callback = options.callback;
        this.moveCount = options.moveCount || 50; 
        this.bindEvent();
    },
    bindEvent: function() {
        this.start = this._start.bind(this);
        this.move = this._move.bind(this);
        this.end = this._end.bind(this);

        this.wrapper.addEventListener('touchstart', this.start, false);
        this.wrapper.addEventListener('touchmove', this.move, false);
        this.wrapper.addEventListener('touchend', this.end, false);
    },
    _start: function(e) {
        this.dragStart = e.touches[0].pageY;
        this.translateY = 0;
        setStyle(this.wrapper, {
            'transitionDuration': '0ms',
        });
    },
    _move: function(e) {
        if (this.dragStart === 0) {
            return;
        }
        let clientY = e.touches[0].pageY;
        this.translateY = (clientY - this.dragStart);
        // 当scrolltop是0且往下滚动
        if (document.documentElement.scrollTop + document.body.scrollTop === 0) {
            if (this.translateY > 0) {
                e.cancelable && e.preventDefault(); // 必须

                if (Math.abs(this.translateY) > this.moveCount) {
                    addClass(nodeObj.iconNode, 'up');
                    nodeObj.textNode.innerText = '释放刷新';
                } else {
                    removeClass(nodeObj.iconNode,'up');
                    nodeObj.textNode.innerText = '下拉刷新';
                }

                setStyle(this.wrapper, {
                    'transform': 'translate3d(0,' + this.translateY + 'px,0)'
                });
            }
        }
    },
    _end: function(e) {
        if (this.translateY === 0) {
            return;
        }
        // 超过刷新临界值
        if (this.translateY > this.moveCount) {
            removeClass(nodeObj.iconNode, 'up');
            addClass(nodeObj.iconNode,'loading');
            nodeObj.textNode.innerText = '正在刷新';
            setStyle(this.wrapper, {
                'transitionDuration': '300ms',
                'transform': 'translate3d(0,0,0)',
            });
            this.callback && this.callback();
        }
        //恢复初始值
        this.dragStart = 0;       
        this.translateY = 0; 
        removeClass(nodeObj.iconNode,'up');
        removeClass(nodeObj.iconNode,'loading');
        nodeObj.textNode.innerText = '向下刷新';
    },
}

const pullDownRefresh = new PullDownRefresh();

export {pullDownRefresh};