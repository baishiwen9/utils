/**
 * h5实现瀑布流布局
 * 
 * todo: 优化代码（修复bug），实现屏幕大小改变的时候瀑布流自适应
 */


const heightArr = [];

function createWaterFull(root, src, index, configs) {
	const div = document.createElement('div');
    div.classList.add('item');
    div.style.position = 'absolute';
    div.style.width = configs.width + 'px';

	const img = document.createElement('img');
    img.src = src;
    img.style.width = '100%';
	img.onload = function () {
		const height = img.clientHeight;
		if (index < configs.column) {
			div.style.top = '0px';
			heightArr.push(height);
		} else {
			const minV = getMin(heightArr);
			const minIndex = heightArr.indexOf(minV);
			index = minIndex;
			div.style.top = (configs.diffY + minV) + 'px';
			heightArr[minIndex] = minV + height + configs.diffY;
		}
		div.style.left = (configs.width + configs.diffX)*index + 'px';
	}
	img.classList.add('item-img');
	img.classList.add('img'+ index);
	div.appendChild(img);
	root.appendChild(div);
}


function getMin(arr) {
	return Math.min.apply(null, arr);
}


function init(id, datas, config) {
    const root = document.querySelector('#'+id);
    root.style.position = 'relative';
    root.style.width = '100%';
    root.style.height = innerHeight + 'px';
    datas.map((item, index) => {
		createWaterFull(root, item, index, config);
	});
}

export default {
    init
}