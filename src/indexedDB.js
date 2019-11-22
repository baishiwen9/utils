/*
* 对indexedDB进行封装，使用更方便
*/

/**
 * indexedDB简介：
 *  IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。
 *  
 * IndexedDB 具有以下特点：
 *  1. 键值对储存， IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。
 *  2. 异步，IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，异步设计是为了防止大量数据的读写，拖慢网页的表现
 *  3. 支持事务， IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
 *  4. 同源限制，IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
 *  5. 储存空间大，IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。
 *  6. 支持二进制储存， IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。
 */


 const createIndexedDB = (config) => {
    const {databaseName, version, success} = config;
    const request = window.indexedDB.open(databaseName, version);
    let db = '';

    request.onerror = (e) => {
        console.log('数据库打开失败');
        config.fail && config.fail({
            msg: '数据库打开失败',
            e: e,
        })
    };

    request.onsuccess = (e) => {
        console.log('数据库打开成功');
        db = request.result;
        success && success();
    };

    let objectStore = null;
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        const {table_header, table_name, main_key} = config;
        if (!db.objectStoreNames.contains(table_name)) {
            objectStore = db.createObjectStore(
                table_name, 
                { 
                    keyPath: main_key, 
                    autoIncrement: true,
                }
            );

            if (table_header && Object.prototype.toString.call(table_header) === '[object Array]') {
                table_header.length > 0 && table_header.map(item => { 
                    objectStore.createIndex(item.key, item.key, { unique: item.unique ? item.unique : false });
                });
            }
        }
    };
    
    //获取所有数据
    const getAll = (table_name, success, fail) => {
        const objectStore = db.transaction(table_name).objectStore(table_name);
        const result = [];
        objectStore.openCursor().onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                result.push(cursor.value);
                cursor.continue();
            } else {
                console.log('没有更多数据了！');
                success && success(result);
            }
        };

        objectStore.openCursor().onerror = function (event) {
            fail && fail(event);
        }
    }

    return {
        /**
         * options
         *      table_name: 表名， string
         *      data：要添加的数据, array
         *      callback： 回调函数，成功返回的code为1，其他返回的code为-1， function
         */
        add: (options) => {
            const {data, table_name, callback} = options;

            if (!table_name || !data) {
                callback && callback({
                    code: -1,
                    msg: 'table_name或data不能为空'
                });
                return;
            }

            const transaction = db.transaction([table_name], 'readwrite');
            const store = transaction.objectStore(table_name);
            let _request = null;
            if (Object.prototype.toString.call(data) === '[object Array]') {
                data.length > 0 && data.map(item => {
                    _request = store.add(item);
                })
            }
            
            _request.onsuccess = function (event) {
                console.log('数据写入成功');
                callback && callback({
                    code: 1,
                    e: event
                })
            };

            _request.onerror = function (event) {
                console.log('数据写入失败');
                callback && callback({
                    code: -1,
                    e: event
                })
            }
        },
        /**
         * options
         *      table_name: 表名
         *      index_key: 索引
         *      index_value: 索引值
         *      callback： 回调函数，成功返回的code为1，其他返回的code为-1
         */
        get: (options) => {
            const {table_name, callback, index_key, index_value} = options;
            if (!table_name) {
                callback && callback({
                    code: -1,
                    msg: 'table_name不能为空'
                });
                return;
            }

            getAll(table_name, (res) => {
                if (res && res.length > 0) {
                    let result = [];
                    if (index_value) {
                        result = res.filter(item => {
                            return item[index_key] === index_value;
                        });
                    } else {
                        result = res;
                    }
                    callback && callback({
                        code: 1,
                        data: result,
                    })
                } else {
                    callback && callback({
                        code: 1,
                        data: [],
                    })
                }
            }, (err) => {
                callback && callback({
                    code: -1,
                    e: err,
                });
            });

            // const transaction = db.transaction([table_name]);
            // const objectStore = transaction.objectStore(table_name);
            // let request = null;
            // if (index_key === objectStore.keyPath) {
            //     request = objectStore.get(index_value);
            // } else {
            //     const index = objectStore.index(index_key);//获取索引
            //     request = index.get(index_value);
            // }

            // request.onerror = function(event) {
            //     console.log('获取数据失败');
            //     callback && callback({
            //         code: -1,
            //         e: event,
            //     });
            // };

            // request.onsuccess = function( event) {
            //     console.log('获取数据成功');
            //     if (request.result) {
            //         console.log('获取数据成功：有数据');
            //         callback && callback({
            //             code: 1,
            //             e: event,
            //             data: request.result
            //         });
            //     } else {
            //         console.log('获取数据成功：无数据');
            //         callback && callback({
            //             code: 1,
            //             e: event,
            //             data: {}
            //         });
            //     }
            // };
        },
        /**
         * options
         *      table_name: 表名
         *      data: 要更新的数据
         *      callback： 回调函数，成功返回的code为1，其他返回的code为-1
         */
        update: (options) => {
            const {table_name, data, callback} = options;
            if (!table_name || !data) {
                callback && callback({
                    code: -1,
                    msg: 'table_name或data不能为空'
                });
                return;
            }

            const transaction = db.transaction([table_name], 'readwrite');
            const objectStore = transaction.objectStore(table_name);
            let request = null;
            if (Object.prototype.toString.call(data) === '[object Array]') {
                data.length > 0 && data.map(item => {
                    request = objectStore.put(item);
                })
            }

            request.onsuccess = function (event) {
                console.log('数据更新成功');
                callback && callback({
                    code: 1,
                    data: data,
                    e: event,
                })
            };

            request.onerror = function (event) {
                console.log('数据更新失败');
                callback && callback({
                    code: -1,
                    e: event,
                })
            }
        },
        /**
         * options
         *      table_name: 表名
         *      id： 要删除数据的id
         *      callback： 回调函数，成功返回的code为1，其他返回的code为-1
         */
        delete: (options) => {
            const {table_name, ids, callback} = options;
            if (!table_name || !ids) {
                callback && callback({
                    code: -1,
                    msg: 'table_name或id不能为空'
                });
                return;
            }

            const transaction = db.transaction([table_name], 'readwrite');
            const objectStore = transaction.objectStore(table_name);
            let request = null;
            if (ids && Object.prototype.toString.call(ids) === '[object Array]') {
                ids.length > 0 && ids.map(item =>{
                    request = objectStore.delete(item);
                })
            } else {
                request = objectStore.delete(ids);
            }
            request.onsuccess = function (event) {
                console.log('数据删除成功');
                callback && callback({
                    code: 1,
                    e: event,
                })
            };

            request.onerror = function (event) {
                console.log('数据删除失败');
                callback && callback({
                    code: -1,
                    e: event,
                })
            }
        },
        clear: (table_name) => {
            const transaction = db.transaction(table_name, 'readwrite');
            const store = transaction.objectStore(table_name);
            store.clear();
        },
        remove: (table_name) => {
            const transaction = db.transaction(table_name, 'versionchange');
            db.deleteObjectStore(table_name);
        }
    }

 }


 export default {
     createIndexedDB
};