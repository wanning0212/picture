var scrollImg = function(parent,img){
    //添加绑定事件
                     //给谁绑定事件，绑定的事件类型，执行函数
    function addEvent(obj,type,func){
    	//兼容
        if(obj.addEventListener){
            obj.addEventListener(type,func,false);
        }else if(obj.attachEvent){
            obj.attachEvent('on'+type,func);
        }
    }

    //建立某些参数
    this.v={
        eleGroup:null,//图片
        screenHeight:null,//浏览器可视窗口的高度
        scrolloverHeight:null,//网页被卷去的高度
        limitHeight:null
    };
    var that = this.v;
    //对数据进行初始化
    //初始化数据异步加载图片需要显示的图片
    this.init = function(element){
    	//获取html里面的img
        that.eleGroup=document.getElementsByTagName(element);
        //获取浏览器可视窗口的高度(不包括地址栏和标题栏)
        that.screenHeight=document.documentElement.clientHeight;
        //获取网页被卷去的高度
        that.scrolloverHeight=document.body.scrollTop;
        //循环所有图片
        for(var i=0,j=that.eleGroup.length;i<j;i++){
        	//getAttribute() 方法返回指定属性名的属性值。
        	//判断每张图片距离浏览器的高度 <= 浏览器可视窗口的高度   && 获取每张图片中传过来的asrc这个属性的值
            if(that.eleGroup[i].offsetTop<=that.screenHeight && that.eleGroup[i].getAttribute(img)){
            	//setAttribute() 方法添加指定的属性，并为其赋指定的值。
            	//给每张图片添加src属性，并且把获取的asrc的属性值赋给他
                that.eleGroup[i].setAttribute('src',that.eleGroup[i].getAttribute(img));
                //removeAttribute() 方法删除指定的属性
                that.eleGroup[i].removeAttribute(img);
            }
        }

    };
    
    console.log(document.documentElement.scrollTop,document.documentElement.clientHeight);
    console.log(document.body.scrollTop,document.documentElement.clientHeight);
    //判断滚动高度
    function lazyLoad(){
        if(document.body.scrollTop == 0){
        					//网页被滚上去的高度+浏览器可视窗口的高度
            that.limitHeight=document.documentElement.scrollTop+document.documentElement.clientHeight;
        }else{
        	//兼容谷歌 document.body.scrollTop
            that.limitHeight=document.body.scrollTop+document.documentElement.clientHeight;
        }
        for(var i=0,j=that.eleGroup.length;i<j;i++){
            if(that.eleGroup[i].offsetTop<=that.limitHeight && that.eleGroup[i].getAttribute(img)){
                that.eleGroup[i].src=that.eleGroup[i].getAttribute(img);
             that.eleGroup[i].removeAttribute(img);
            }
        }
    }
    //
    addEvent(parent,'scroll',lazyLoad);
};