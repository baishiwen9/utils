/**
 * version 是用来比较两个版本号的方法
 * 
 */


/**
 * 比较大
 */
 function greater(v1, v2) {
    if (compare(v1, v2) > 0) {
      console.log('v1 > v2');
      return true;
    }
    return false;
 }

 /**
  * 比较小
  */
 function smaller(v1, v2) {
      if (compare(v1, v2) < 0) {
         console.log('v1 < v2');
         return true;
      }
      return false;
 }

 /**
  * 相等
  */
 function equal(v1, v2) {
      if (compare(v1, v2) === 0) {
         console.log('v1 === v2');
         return true;
      }
      return false;
 }



function compare(v1, v2) {
   const vArr1 = v1 && v1.replace(/[A-Za-z]/, '').split('.');
   const vArr2 = v2 && v2.replace(/[A-Za-z]/, '').split('.');
   const $length = Math.max(vArr2.length, vArr1.length);
   let vi1 = 0;
   let vi2 = 0;
   let i = 0;
   for (i = 0; i < $length; i += 1) {
      vi1 = Number(vArr1[i]) ? Number(vArr1[i]) : 0;
      vi2 = Number(vArr2[i]) ? Number(vArr2[i]) : 0;
      if (vi2 > vi1) {
         return 1;
      }
      if (vi2 < vi1) {
         return -1;
      }
   }
   return 0;
}

 
 export default{
    greater,
    smaller,
    equal
 }