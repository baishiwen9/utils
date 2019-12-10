/**
 * 对history进行封装，使用更加方便
 */


 export default {

    go: function(num) {
        window.history.go(num);
    },
   
    back: function(num) {
        window.history.back(num);
    },
   
    forward: function() {
        window.history.forward();
    },
    /**
     * pushState方法不会触发页面刷新，只是导致history对象发生变化，地址栏的显示地址发生变
     * @param {object} state 状态对象是一个由pushState()方法创建的、与历史纪录相关的javascript对象。当用户定向到一个新的状态时，会触发popstate事件。事件的state属性包含了历史纪录的state对象。如果不需要这个对象，此处可以填null
     * @param {string} title 新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null
     * @param {string} url  这个参数提供了新历史纪录的地址。新URL必须和当前URL在同一个域，否则，pushState()将丢出异常。这个参数可选，如果它没有被特别标注，会被设置为文档的当前URL
     */
    pushState: function(state, title, url) {
        if (title) {
            document.title = title;
        }
        window.history.pushState(state, title, url);
    },
   
    /**
     * replaceState()方法会修改当前历史记录条目而并非创建新的条目
     * @param {object} state 
     * @param {string} title 
     * @param {string} url 
     */
    replaceState: function(state, title, url) {
        if (title) {
            document.title = title;
        }
        window.history.replaceState(state, title, url);
    },
   
   /**
    * 当同一个文档的浏览历史(即history对象)出现变化时，就会触发popstate事件
    * 仅仅调用pushState方法或replaceState方法，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用javascript调用back()、forward()、go()方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发
    */
    popstate: function(callback) {
        window.onpopstate = (e) => {
            console.log('state changed!!!');
            callback && callback(e);
        }
    },
    /**
     * hashchange事件是html5新增的api，用来监听浏览器链接的hash值变化
     * @param {function} callback 
     */
    hashchange: function(callback) {
        window.onhashchange = (e) => {
            console.log('new url', e.newURL);
            console.log('old url', e.oldURL);
            callback && callback(e);
        }
    }
 }