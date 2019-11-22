/*
* 对localStorage进行封装，使用更方便
*/


function set(key, value) {
    try{
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        return null;
    }
}

function get(key) {
    try{
        let value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    } catch (e) {
        return null;
    }
}

function remove(key) {
    window.localStorage.removeItem(key);
    return true;
}

function clear() {
    window.localStorage.clear();
    return true;
}


export default {
    set,
    get,
    remove,
    clear,
}