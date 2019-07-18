    let Piecharts = function (selector, options) {
        let canvas = "string" === typeof selector ? document.querySelector(selector) : null;
        if (canvas === null) return false;
        let defaultOptions = {
            radius: 200,
            legendParms: {
                font: "24px Arial",
                x: 30,
                y: 30,
                margin: 50,
                width: 40,
                height: 24
            }
        }
        this.ctx = canvas.getContext("2d");
        this.width = canvas.getAttribute("width") || 300;
        this.height = canvas.getAttribute("height") || 300;
        this.options = Object.assign(defaultOptions, options); //Object.assign(source,target)
        
    }
    

    Piecharts.prototype.load = function (data) {
        // console.log('this.ctx'+this.ctx);
        data.forEach(item => this.count ? this.count += item.value : this.count = item.value);
        this.data = data;
        return this;
    };

    Piecharts.prototype.render = function () {
        let _generateLegand = (item, index) => {
            this.ctx.fillRect( // fillRect(x,y,width,height)方法绘制“已填色”的矩形。默认的填充颜色是黑色。 x,y 是矩形左上角的坐标
                this.options.legendParms.x,
                this.options.legendParms.y + index * this.options.legendParms.margin,
                this.options.legendParms.width,
                this.options.legendParms.height
            );
            this.ctx.font = this.options.legendParms.font;
            this.ctx.fillText( //fillText(text,x,y,maxWidth)
                item.title,
                this.options.legendParms.y + this.options.legendParms.margin,
                (index + 1) * this.options.legendParms.margin
            );
        };
        let temparc = 0;
        this.data.forEach((item, index) => {
            item.color = `#${('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6)}`;
            this.ctx.beginPath(); //开始一条路径
            this.ctx.moveTo(this.width / 2, this.height / 2);
            let startarc = temparc,
                endarc = startarc + (item.value / this.count) * Math.PI * 2;
            this.ctx.arc( //创建弧/曲线（用于创建圆形或部分圆）context.arc(x,y,r,sAngle,eAngle,counterclockwise);counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
                this.width / 2,
                this.height / 2,
                this.options.radius,
                startarc,
                endarc,
                false
            );
            this.ctx.closePath();
            this.ctx.fillStyle = item.color;
            this.ctx.fill();
            temparc = endarc;
            if (this.options.legend) {
                _generateLegand(item, index)
            }
        });
        return this;
    }