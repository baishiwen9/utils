

 export default class TableList{
    constructor(datas) {
        if (!datas || Object.prototype.toString.call(datas) !== '[object Array]') {
            console.log('参数只能是数组');
            datas = [];
        }
        this.listsize = datas.length;
        this.pos = 0;
        this.dataStore = datas;
        this.clear = clear;
        this.find = find;
        this.append = append;
        this.remove = remove;
        this.front = front;
        this.end = end;
        this.prev = prev;
        this.next = next;
        this.hasNext = hasNext;
        this.hasPrev = hasPrev;
        this.length = length;
        this.currPos = currPos;
        this.moveTo = moveTo;
        this.contains = contains;
        this.getCurElement = getCurElement;
        this.getElementByIndex = getElementByIndex;
        this.insertAfterByElement = insertAfterByElement;
        this.insertBeforeByElement = insertBeforeByElement;
        this.insertAfterByIndex = insertAfterByIndex;
        this.insertBeforeByIndex = insertBeforeByIndex;
        this.removeByIndex = removeByIndex;
    }
}
//在最后插入数据
function append(element) {
    this.dataStore[this.listsize++] = element;
}
// 返回该元素的索引
function find(element) {
    return this.dataStore.indexOf(element);
}
// 删除该元素
function remove(element) {
    const foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        --this.listsize;
        return true;
    }
    return false;
}
// 通过索引删除元素
function removeByIndex(index) {
    if (index > -1) {
        this.dataStore.splice(index, 1);
        --this.listsize;
        return true;
    }
    return false;
}
// 返回数组长度
function length() {
    return this.listsize;
}
// 在原有的元素后面插入新元素
function insertAfterByElement(newElement, afterElement) {
    const index = this.find(afterElement);
    if (index > -1) {
        this.dataStore.splice(index + 1, 0, newElement);
        ++this.listsize;
        return true;
    }
    return false;
}
// 在原有的元素前面插入新元素
function insertBeforeByElement(newElement, beforeElement) {
    const index = this.find(beforeElement);
    if (index > -1) {
        this.dataStore.splice(index, 0, newElement);
        ++this.listsize;
        return true;
    }
    return false;
}
// 在该索引之后插入新元素
function insertAfterByIndex(index, newElement) {
    if (index > -1) {
        this.dataStore.splice(index + 1, 0, newElement);
        ++this.listsize;
        return true;
    }
    return false;
}
// 在该索引之前插入新元素
function insertBeforeByIndex(index, newElement) {
    if (index > -1) {
        this.dataStore.splice(index, 0, newElement);
        ++this.listsize;
        return true;
    }
    return false;
}
// 清空
function clear() {
    this.dataStore.length = 0;
    this.listsize = this.pos = 0;
}
// 判断是否包含一个元素
function contains(element) {
    return this.find(element) > -1 ? true : false;
}
// 返回到第一个元素
function front() {
    this.pos = 0;
}
// 返回到最后一个元素
function end() {
    this.pos = this.listsize - 1;
}
// 上一个元素
function prev() {
    --this.pos;
}
// 下一个元素
function next() {
    if (this.pos < this.listsize) {
        ++this.pos;
    }
}
// 当前的位置
function currPos() {
    return this.pos;
}
// 移动到该位置
function moveTo(position) {
    this.pos = position;
}
// 获取当前的元素
function getCurElement() {
    return this.dataStore[this.pos];
}
// 通过索引获取元素
function getElementByIndex(index) {
    return this.dataStore[index];
}
// 是否有下一个元素
function hasNext() {
    return this.pos < this.listsize;
}
// 是否存在上一个元素
function hasPrev() {
    return this.pos > 0;
}
