//引入express
const express=require("express");
//创建路由器对象
const router=express.Router();
//引入连接池模块
const pool=require("../pool");
// 添加路由
//1.用户注册
router.post("/reg",(req,res)=>{
  var $uname=req.body.uname;
  var $upwd=req.body.upwd;
  var $email=req.body.email;
  var $phone=req.body.phone;
  if(!$uname){
    res.send({code:401,msg:'uname required'});
    return;
  }
  if(!$upwd){
    res.send({code:402,msg:'upwd required'})
	return;
  };
  if(!$email){
    res.send({code:403,msg:'email required'})
    return;
  }
  if(!$phone){
    res.send({code:404,msg:'phone required'})
    return;
  }
  var sql="INSERT INTO L_user SET ?";
  pool.query(sql,[req.body],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:"注册成功"});
    }
  })
});

//2.用户登录接口
router.post("/login",(req,res)=>{
  var $uname=req.body.uname;
  var $upwd=req.body.upwd;
  if(!$uname){
    res.send("用户名不能为空");
    return;
  };
  if(!$upwd){
    res.send("密码不能为空");
  };
  var sql="SELECT*FROM L_user WHERE uname=? AND upwd=?"
  pool.query(sql,[$uname,$upwd],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send("登录成功");
    }else{
      res.send("用户名或密码错误");
    };
  });
})
//3.删除用户
router.get('/delete',function(req,res){
  var $uid=req.query.uid;
  if(!$uid){
	res.send({code:402,msg:'uid require'});
  return;
};
  pool.query('DELETE FROM L_user WHERE uid=?',[$uid],function(err,result){
    if(err)throw err;
	if(result.affectedRows>0){
	  res.send({code:200,msg:'删除成功'});
	}else{
	   res.send({code:301,msg:'删除失败'})
	}
  });
});
//4.检索用户
router.get("/detail",(req,res)=>{
  var $uid=req.query.uid;
  if(!$uid){
    res.send({code:401,msg:"uid require"})
    return;
  };
  var sql="SELECT*FROM L_user WHERE uid=?";
  pool.query(sql,[$uid],(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
});
//5.用户修改
router.post("/update",(req,res)=>{
  var obj=req.body;
  var num=402;
  for(var key in obj){
    if(!obj[key]){
      res.send({code:num,msg:key+"required"})
      return;
    }
  }
  var sql="UPDATE L_user SET uname=?,upwd=?,email=?,phone=?,avator=?,gender=? WHERE uid=?"; 
  pool.query(sql,[obj.uname,obj.upwd,obj.email,obj.phone,obj.gender,obj.uid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:203,msg:"修改成功"});
    }else {
      res.send({code:303,msg:"update err"});
    }
  });
  res.send("修改成功")
});
//6.用户列表
router.get("/list",(req,res)=>{
  var pno=req.query.pno; //页码
  var count=req.query.count; //数量
  //如果页码为空，设默认值为1
  if(!pno) pno=1;
  //如果数量为空，设默认值为5
  if(!count) count=5;
  //将数据转为整型
  pno=parseInt(pno);
  count=parseInt(count);
  //根据页码和数量计算开始查询的值
  //(页码-1)*数量
  var start=(pno-1)*count;
  var sql="SELECT*FROM L_user LIMIT ?,?";
  pool.query(sql,[start,count],(err,result)=>{
    if(err) throw err;
    res.send(result);
  });
});
//导出路由器
module.exports=router;