(()=>{
	//获得触发事件元素
	//查找姓名文本框
	var txtName=document.getElementsByName("uname")[0];
	//查找密码文本框
	var txtPwd=document.getElementsByName("upwd")[0];
	//2.绑定事件处理函数
	txtName.onfocus=txtPwd.onfocus=function(){
		//3.查找要修改的元素
		var input=this;
		//查找当前元素的父元素的子元素
		var div=input.nextElementSibling;
		//4.修改元素
		div.className="";
	}

	//需求2：当文本失去焦点时，验证文本框输入内容是否符合要求
	//1.查找触发事件元素，以找过
	//绑定事件处理函数
	//姓名文本框事件焦点处理函数
	function vali(reg){
		//获得当前文本框
		var input=this;
		//查找要做修改的元素
		var div=input.nextElementSibling;
		//4.修改元素
		if(reg.test(input.value)==true){
			div.className="vali_info";
		}else{
			div.className="vali_fail";
		}
	}
	txtName.onblur=function(){
		//定义文本框格式
		var reg=/^[\u4e00-\u9fa5]{1,7}$|^\w{1,14}$/;
		//调用公共的vali函数，验证当前文本框
		vali.call(this,reg);
	}
	txtPwd.onblur=function(){
		//this->txPwd
		//先定义密码框的格式规则
		var reg=/^\w{1,16}$/;
		vali.call(this,reg);
	}
})()