/**
 * 印章组件
 * type： 方印，圆印
 */

 function init(configs) {
    const {type='square'} = configs;
    if (type === 'square') {
        createSquareSeal(configs, true);
    } else if ('rectangle' === type) {
        createRectangleSeal(configs);
    } else if (type === 'circular') {
        createCircularSeal(configs);
    }
 }

/**
 * 生成方形印章
 */
 function createSquareSeal(configs, isSquare) {
    configs = configs ? configs : {};
    const div = document.createElement('div');
    div.classList.add('seal-wrap');
    const defaultStyle = {
        border: '4px solid red',
        background: 'transparent',
        borderRadius: '4px',
        lineHeight: 1,
        fontSize: '20px',
        textAlign: 'center',
        color: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        writingMode: 'tb-rl',
    };
    
    let style = Object.assign(defaultStyle, configs.style ? configs.style : {});
    for (let key in style) {
        div.style[key] = style[key];
    }

    if (isSquare) {
        div.style.width = div.style.height = configs.size ? configs.size + 'px' : '50px';
    }
    div.innerText = configs.text ? configs.text : '天下太平';
    document.body.appendChild(div);
 }


/**
 * 生成长方形印章
 * @param {*} configs 
 */
 function createRectangleSeal(configs) {
    configs.style.width = configs.width ? configs.width : '100px';
    configs.style.height = configs.height ? configs.height : '40px';
    configs.style.writingMode = 'initial';
    createSquareSeal(configs, false);
 }

/**
 * 生成圆形印章
 * @param {*} configs 
 */
 function createCircularSeal(configs) {
    const canvas = document.createElement('canvas');
    canvas.height = canvas.width = configs.size ? configs.size : '400';
    const context = canvas.getContext('2d');
    
    context.fillStyle="#ffffff";
    context.fillRect(0, 0, configs.size, configs.size);

    // 绘制印章边框   
    var width = canvas.width / 2;
    var height = canvas.height / 2;
    context.lineWidth = 4;
    context.strokeStyle = "#f00";
    context.beginPath();
    //创建弧/曲线（用于创建圆形或部分圆）
    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    //x,y: 圆心坐标， r：半径，sAngle，eAngle 起始和结束角度（弧度），counterclockwise规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
    context.arc(width, height, configs.r, 0, Math.PI * 2);//宽、高、半径
    // 绘制已定义的路径
    context.stroke();

    create5star(context, width, height, 20, "#f00", 0);

    //绘制印章名称   
    context.font = '8px 宋体';
    context.textBaseline = 'middle';//设置文本的垂直对齐方式
    context.textAlign = 'center'; //设置文本的水平对对齐方式
    context.lineWidth=1;
    context.fillStyle = '#f00';
    context.save();
    context.translate(width, height+60);// 平移到此位置,
    context.scale(1, 1.8);//伸缩要先把远点平移到要写字的位置，然后在绘制文字
    context.fillText(configs.text, 0, 0);//原点已经移动
    context.restore();

    // 绘制印章单位   
    context.translate(width, height);// 平移到此位置,
    context.font = '16px 宋体';
    let count = configs.title.length;// 字数
    let angle = 4*Math.PI/(3*(count - 1));// 字间角度   
    let chars = configs.title.split("");
    let c;
    for (let i = 0; i < count; i++) {
        c = chars[i];// 需要绘制的字符 
　　　　　//绕canvas的画布圆心旋转  
        if (i == 0) {
            context.rotate(5 * Math.PI / 6);
        } else{
            context.rotate(angle);
        }
        context.save();
        context.translate(60, 0);// 平移到此位置,此时字和x轴垂直，公司名称和最外圈的距离
        context.rotate(Math.PI / 2);// 旋转90度,让字平行于x轴
        context.scale(1, 1.8);//伸缩画布，实现文字的拉长
        context.fillText(c, 0, 0);// 此点为字的中心点
        context.restore();
    }
    // 设置画布为最初的位置为原点，旋转回平衡的原位置，用于清除画布
    context.rotate(-Math.PI/6);
    context.translate(0-canvas.width/2, 0-canvas.height/2);
    document.body.appendChild(canvas);
 }

 //绘制五角星  
/** 
 * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上 
 * rotate:绕对称轴旋转rotate弧度 
 */
function create5star(context, sx, sy, radius, color, rotato) {
    context.save();
    context.fillStyle = color;
    context.translate(sx, sy);//移动坐标原点
    context.rotate(Math.PI + rotato);//旋转
    context.beginPath();//创建路径
    let x = Math.sin(0), y = Math.cos(0), dig = Math.PI / 5 * 4;
    for (let i = 0; i < 5; i++) {//画五角星的五条边
        x = Math.sin(i * dig);
        y = Math.cos(i * dig);
        context.lineTo(x * radius, y * radius);
    }
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
}




 export default {
     init,
 }