/**
 * 集成一些数组常用的方法
 */


 /**
  * 两个数组求并集
  */

  function arrayUnion(arr1, arr2) {
      const set1 = new Set(arr1 ? arr1 : []);
      const set2 = new Set(arr2 ? arr2 : []);
      return [...(new Set([...set1, ...set2]))];
  }

  /**
   * 两个数组求交集
   */

   function arrayIntersect(arr1, arr2) {
        const set1 = new Set(arr1 ? arr1 : []);
        const set2 = new Set(arr2 ? arr2 : []);
        return [...(new Set([...set1].filter(x => set2.has(x))))];
   }

   /**
   * 两个数组求差集
   */

  function arrayDifference(arr1, arr2) {
    const set1 = new Set(arr1 ? arr1 : []);
    const set2 = new Set(arr2 ? arr2 : []);
    return [...(new Set([...set1].filter(x => !set2.has(x))))];
  }

  /**
   * 数组去重
   */

   function arrayDedupe(arr) {
       return [...new Set(arr)];
   }

  export default {
    arrayUnion,
    arrayIntersect,
    arrayDifference,
    arrayDedupe
  }