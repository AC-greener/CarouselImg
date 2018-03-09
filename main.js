window.onload = function (){
    var container = document.getElementById("container");
    var list = document.getElementById("list");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var index = 1;  /* 用于表示亮起小圆点的索引*/
    var animated = false;  /*表示是否正在进行动画*/

    //每次点击图片时，使对应的小圆圈亮起来
    function showBottons () {
        for(var i = 0; i < buttons.length; i++) {
            if(buttons[i].className == "on") {
                buttons[i].className = "";
                break;
            }
        }
        buttons[index - 1].className = "on";
    }

    //给图片切换加上过渡动画
    function animate (offset) {

        var newleft = parseInt(list.style.left) + offset;  //当前元素的left值加上要偏移的量
        var time = 300; //在300毫秒之内完成动画
        var interval = 10; //每次动画移动的间隔时间
        var speed = offset/(time/interval)   //总位移量除以次数计算出每次应该移动的距离
        animated = true;
        function go () {
            if((speed < 0 && parseInt(list.style.left)  > newleft) || (speed > 0 && parseInt(list.style.left) < newleft)) {
                list.style.left = parseInt(list.style.left) + speed + "px";
                setTimeout(go, interval);   //计时器
            }

            else {
                animated = false;
                list.style.left = newleft + "px";
                if(newleft > -600) {
                    list.style.left = -3000 + "px";
                }
                if(newleft < -3000) {
                    list.style.left = -600 + "px";
                }
            }
            //debugger;
        }
        go();
    }

    //每3s滚动图片
    function play () {
        timer = setInterval(function () {
            next.onclick();
        }, 3000)
    }

    //当鼠标在轮播图内，停止滚动图片
    function stop () {
        clearInterval(timer)
    }

    container.onmouseover = stop;
    container.onmouseout = play;
    play();

    next.onclick = function() {
        if (animated == false) {   //保持小圆点和动画同时进行 ， 不然会出现动画和小圆点不匹配
            if (index == 5) {
                index = 1;
            }
            else {
                index += 1;;
            }
            showBottons();
            animate(-600);        /*把图片向左移动，隐藏掉*/
        }
    }

    prev.onclick = function() {
        if (animated == false) {
            if (index == 1) {
                index = 5;
            }
            else {
                index -= 1;;
            }
            showBottons();
            animate(600);
        }
    }

    for(var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {   //给每个小圆点绑定事件
            if (this.className == "on") {
                return ;
            }
            var myindex = parseInt(this.getAttribute("index")); /*这个方法可以得到之定义的属性*/
            var offset = -600 * (myindex - index);

            if(!animated){
                animate(offset);
            }

            index = myindex;
            showBottons();
        }
    }
};