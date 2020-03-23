/**
 * 开启测试模式的方法，开启后可打开VConsole
 */

const loadjs = (success, fail) => {
    const vconsoleUrl = 'https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js';
    const script = document.createElement('script');
    script.onload = () => {
        if (success && typeof success === 'function') {
            success();
        }
    };
    script.onerror = () => {
        if (fail && typeof fail === 'function') {
            fail();
        }
    };
    script.async = true;
    script.crossorigin = 'anonymous';
    script.src = vconsoleUrl;
    document.getElementsByTagName('head')[0].appendChild(script);
};

export default function openDebug() {
    const hostname = window.location.hostname;
    if (hostname.indexOf('-dev') !== -1 || hostname.indexOf('-test') !== -1) {
        loadjs(() => {
            if (window.VConsole) {
                const vc = new window.VConsole();
                console.log(vc);
            } 
        });
    } else {
        //默认情况下通过样式让vconsole不显示在可视区域，通过特殊操作唤出vconsole
        //如果通过显示隐藏来操作vconsole，则第一次加载时的log日志会丢失，所以通过移动位置来解决
        const style = document.createElement('style');
        style.type = 'text/css';
        const styleId = `__${Math.random().toString(36).substr(2)}_${new Date().getTime()}`;
        style.id = styleId;
        const css = '#__vconsole .vc-switch{right: -100px !important}';
        style.innerText = css;
        document.getElementsByTagName('head')[0].appendChild(style);
        //在线上环境中唤出vconsole,方便排查bug
        //操作方法： 在当前页面中3s之内分别点击右上角和左下角(100px的正方形区域)2下，即可唤出vconsole
        loadjs(() => {
            if (window.VConsole) {
                const vc = new window.VConsole();
                console.log(vc);
            }
            const defaultState = {
                startTs: null,
                //坐标值
                coordinate: {
                    top: [],
                    bottom: [],
                },
            };
            window.addEventListener('click', (e) => {
                const curTs = new Date().getTime();
                if (!defaultState.startTs) {
                    defaultState.startTs = curTs;
                }
                const { top, bottom } = defaultState.coordinate;
                if ((curTs - defaultState.startTs) / 1000 <= 3) {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;
                    //左上角
                    if (clientX >= (innerWidth - 100) && clientY <= 100 && top.length < 2) {
                        defaultState.coordinate.top.push(1);
                    }
                    //右下角
                    if (clientX <= 100 && clientY >= (innerHeight - 100) && bottom.length < 2) {
                        defaultState.coordinate.bottom.push(1);
                    }
                    //唤出vconsole
                    if (defaultState.coordinate.top.length === 2 
                        && defaultState.coordinate.bottom.length === 2) {
                        const styleDom = document.getElementById(styleId);
                        if (styleDom) {
                            styleDom.remove();
                        }
                    }
                } else {
                    defaultState.coordinate.top = [];
                    defaultState.coordinate.bottom = [];
                    defaultState.startTs = null;
                }
            }, false); 
        });
    }
}
