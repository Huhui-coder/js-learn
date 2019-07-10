var $ = function () {
    return new Base()
}
function Base() {
    this.elements = [];   //创建一个数组 用来保dom节点
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
};
Base.prototype.css = function (attr, value) {  //将Base 的方法挂载到原型链上
    if (attr && value) {
        for (var i = 0; i < this.elements.length; i++) {  //对节点进行遍历
            this.elements[i].style[attr] = value;  // 用原生方法实现操作
        }
    } else {
        for (let i = 0; i < this.elements.length; i++) {  //对节点进行遍历
            return this.elements[i].style[attr];  // 用原生方法实现操作
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