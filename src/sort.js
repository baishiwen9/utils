
const Sort = {
    /**
     * 冒泡排序
     * 最慢的排序方法之一，但是最容易实现
     * 原理：将一组数据按照升序排列，较大的值会浮动到数组的右侧，较小的值会浮动到数组的左侧
     */
    bubbleSort(data) {
        if (!data || data.length === 0) {
            return [];
        }
        console.time('冒泡排序耗时');
        for (let outer = data.length; outer >= 2; outer -= 1) {
            for (let inner = 0; inner <= outer - 1; inner += 1) {
                if (data[inner] > data[inner + 1]) {
                    [data[inner], data[inner + 1]] = [data[inner + 1], data[inner]];
                }
            }
        }
        console.timeEnd('冒泡排序耗时');
        return data;
    },
    /**
     * 选择排序
     * 原理：选择排序从数组的开头开始，将第一个元素和其他元素进行比较，检查完所有的元素后，最小的元素会被放到数组的第一位置，然后从第二位重新开始。
     */
    selectionSort(data) {
        if (!data || data.length === 0) {
            return [];
        }
        console.time('选择排序耗时');
        for (let outer = 0; outer <= data.length - 2; outer += 1) {
            // min = outer;
            for(let inner = outer + 1; inner < data.length - 1; inner += 1) {
                if (data[inner] < data[outer]) {
                    // min = inner;
                    [data[outer], data[outer]] = [data[outer], data[outer]];
                }
                
            }
        }
        console.timeEnd('选择排序耗时');
        return data;
    },

    /**
     * 插入排序
     * 原理：插入循环有两个循环，外循环将数组元素挨个移动，而内循环则对外循环中选中的元素及它后面的元素进行比较。如果外循序中选中的元素比内循环选中的元素小，name数组元素会向右移动，为内循环中的这个元素腾出位置。
     */

    insertionSort(data) {

    },

    /**
     * 希尔排序
     * 原理：通过定义一个间隔序列来表示在排序过程中进行比较的元素之间有多远的间隔
     * 在开始做最后一次排序的时候，大部分的元素已经在正确的位置上，算法不必对很多的元素进行交换，这就是希尔排序的更搞笑的地方
     * 中间间隔序列数组： 给固定或者动态生成不会影响希尔排序的性能
     */
    shellSort(data, autoGaps) {
        if (!data || data.length === 0) {
            return [];
        }
        console.time('希尔排序耗时');
        let gaps = [];
        if (autoGaps) {
            //动态生成间隔序列数组
            gaps.push(1);
            while (gaps[0] < (data.length / 3)) {
                gaps.unshift(3 * gaps[0] + 1);
            }
        } else {
            //硬编码，提前固定好一个间隔序列数组
            gaps = [5, 3, 1];
        }

        for (let gap = 0; gap < gaps.length; gap += 1) {
            for (let index = gaps[gap]; index < data.length; index += 1) {
                const temp = data[index];
                for (var inner = index; inner >= gaps[gap] && data[inner - gaps[gap]] > temp; inner -= gaps[gap]) {
                    data[inner] = data[inner - gaps[gap]];
                }
                data[inner] = temp;
            }
        }
        console.timeEnd('希尔排序耗时');
        return data;
    },

    
}


export default Sort;