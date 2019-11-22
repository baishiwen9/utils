/**
 * version 是用来比较两个版本号的方法
 * 
 */


/**
 * 比较大
 */
 function greater(v1, v2) {
    if (v1 > v2) {
        return true;
    }
    return false;
 }

 /**
  * 比较小
  */
 function smaller(v1, v2) {
    if (v1 < v2) {
        return true;
    }
    return false;
 }

 /**
  * 相等
  */
 function equal(v1, v2) {
    if (v1 === v2) {
        return true;
    }
    return false;
 }


 
 export default{
    greater,
    smaller,
    equal
 }