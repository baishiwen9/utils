// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target/*, varArgs*/) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            const to = Object(target);

            for (let index = 1; index < arguments.length; index++) {
                const nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (let nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

// 为了兼容所有浏览器，以下为onhashchange的polyfill:
(function (window){
    if ('onhashchange' in window) { return; };
    let location = window.location,
    oldURL = location.href,
    oldHash = location.hash;

    setInterval(function() {
        let newURL = location.href, newHash = location.hash
        if (newHash != oldHash && typeof window.onhashchange === 'function') {     
        window.onhashchange({
            type: 'hashchange',
            oldURL: oldURL,
            newURL: newURL
        });
        oldURL = newURL
        oldHash = newHash
        }
    }, 100);
 })(window);
