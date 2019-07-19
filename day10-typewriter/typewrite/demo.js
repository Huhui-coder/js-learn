window.onload = function () {
    var typewriterArr = [],  //打印队列
        typewritering = false, //打印的状态 true ==>
        typewriterID = -1,  //线程ID
        typewriterTime = 1000,  
        typewriterEffect = function (e,str,color,fontSize) {
            typewriterArr.push({
                "context":e,
                "str":str,  
                "lening":0,   //截取的进度
                "maxLength":str.length
            });
            e.style.color = color || "#000";
            e.style.fontSize = fontSize + 'px' || 25 + 'px';
        },
        closeTypewrite = function () {
            clearTimeout(typewriterID);
            typewritering = false;
        },
        typewriterUi = function () {
            var i = 0,
                l = typewriterArr.length,
                eing =null;
                for(;i<l;i++){
                    eing = typewriterArr[i] 
                    eing.lening++;
                    if(eing.length > eing.maxLength) eing.lening = 0; 
                    eing.context.innerHTML = eing.str.substring(0,eing.lening)+ '_';   
                    /*stringObject.substring(start,stop)
                    start	必需。一个非负的整数，规定要提取的子串的第一个字符在 stringObject 中的位置。
                    stop	
                    可选。一个非负的整数，比要提取的子串的最后一个字符在 stringObject 中的位置多 1。
                    如果省略该参数，那么返回的子串会一直到字符串的结尾。
                    */
                }
                typewriterID = setTimeout(typewriterUi,typewriterTime);
        },
        startTypewriter = function (typewriterTime) {
                if(!typewritering){
                    typewriterTime = typewriterTime || typewriterTime;
                    typewriterUi();  //开始画
                }            
        };
        typewriterEffect(
            document.getElementById('typewriterEffect'),  //传入的dom 上下文
            'LoremLorem',  //需要打印出来的字符串
            'red',//颜色
            '25'  //传入的字体大小
        );
        typewriterEffect(
            document.getElementById('typewriterEffect1'),  //传入的dom 上下文
            'LoremLorem',  //需要打印出来的字符串
            'red',//颜色
            '25'  //传入的字体大小
        );
        startTypewriter(10)  //传入的时间间隔
}