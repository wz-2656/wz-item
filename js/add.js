//1.查找事件触发元素
var div=document.getElementById("scale");
var btns=div.getElementsByTagName("button");
console.log(btns)
//2.绑定事件处理函数
for(var btn of btns)
    btn.onclick=function(){
        var btn=this;
        var span=
            btn.parentNode.children[1]
            console.log(1)
		//获得span的内容n
	//坑: 凡是从页面上获得的，都是字符串
		//将n转为整数
		var n=parseInt(span.innerHTML);
		//如果btn的内容是+
		if(btn.innerHTML=="+"){
			n++;//n+1
		}else if(n>1){//否则,如果n>1(btn的内容是-)
			n--;//n-1
		}
		//将结果保存回span的内容中
		span.innerHTML=n;
    }

