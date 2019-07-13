var $ = function (_this) {  //传进来的_this 是当前的html dom 
    return new Base(_this)
}
function Base(_this) {
    this.elements = [];   //创建一个数组 用来保存dom节点
    if(_this != undefined){
        this.elements[0] = _this;
    }
    this.getId = function (id) { //获取dom节点的方法
        this.elements.push(document.getElementById(id));  //将获取到的dom节点保存到this.elements这个数组中
        return this;  //将Base  实例返回   这是关键 ==> 这样做了之后 就可以实现链式调用  继续调用 Base 上的方法
    };
    this.getTagName = function (tagName) {
        var tags = document.getElementsByTagName(tagName);
        for (var i = 0; i < tags.length; i++) {
            this.elements.push(tags[i])
        }
        return this;
    } 
    //获取拥有相同className的集合
    this.getClass = function (className) {
        var all = document.getElementsByTagName('*');
        for (var i = 0; i < all.length; i++) {
            if(all[i].className == className){
                this.elements.push(all[i])
            }
        }
        return this;
    }
};
//获取某一个DOM节点
Base.prototype.getElement = function(num){
    var elements = this.elements[num];
    this.elements = [];
    this.elements[0] = elements;
    return this;
}
Base.prototype.css = function (attr, value) {  //将Base 的方法挂载到原型链上
    if (attr && value) {
        for (var i = 0; i < this.elements.length; i++) {  //对节点进行遍历
            this.elements[i].style[attr] = value;  // 用原生方法实现操作
        }
    } else {
        for (let i = 0; i < this.elements.length; i++) {  //对节点进行遍历
            return this.elements[i].style[attr];  // 如果没有传value 值进来直接 返回当前DOM节点的属性值
        }
    }

    return this;  //同样返回的是 Base 这个实例
}
Base.prototype.click = function (fn) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onclick = fn;
    }
    return this;
}
Base.prototype.hover = function (over,out) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onmouseover = over;
        this.elements[i].onmouseout = out;
    }
    return this;
}
//设置显示
Base.prototype.show = function (over,out) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
    }
    return this;
}
//设置隐藏
Base.prototype.hover = function (over,out) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
    }
    return this;
}