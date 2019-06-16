//先查找事件触发元素
//查找用户名文本框
var txtName=document.getElementsByName("uname")[0];
//console.log(txtName);
var txtUpwd=document.getElementsByName("upwd")[0];
var txtPwd=document.getElementsByName("pwd")[0];
var txtPho=document.getElementsByName("phone")[0];
//console.log(txtPho);
//2.绑定事件处理函数
txtName.onfocus=txtUpwd.onfocus=txtPwd.onfocus=txtPho.onfocus=function(){
	var input=this;
	//3.查找要修改的元素
	var p=input.parentNode.nextElementSibling;
	//4.修改元素
	//console.log(p);
}
function vali(reg){
	var input=this;
	var p=input.parentNode.nextElementSibling;
	//console.log(reg.test(p.value));
	if(reg.test(input.value)==true){
		p.className="vali_info";
	}else{
		p.className="vali_fail";
	}
}
txtName.onblur=function(){
	var reg=/^[\u4e00-\u9fa5]{1,7}$|^\w{1,14}$/;
	vali.call(this,reg);
}
txtUpwd.onblur=txtPwd.onblur=function(){
	var reg=/^\w{1,16}$/;
	vali.call(this,reg);
}
txtPho.onblur=function(){
	var reg=/^\d{11}$/;
	vali.call(this,reg);
}