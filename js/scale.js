var $h2=$("#sm");
   var $mlmg=$("#md>img");
   var $lglmg=$("#lg");
   var $mmask=$("#mmask");
   var $mask=$("#mask");
   $h2.on("mouseover","img",function(){
     //console.log(this.dataset.md)//返回一个集合 保存自定义属性的值
     $mlmg.attr("src",this.dataset.md);
     $lglmg.css("background-image",`url(${this.dataset.lg})`)
   })
   $mmask.mouseover(function(){
     $lglmg.css("display","block");
     $mask.css("display","block");
   })
   $mmask.mouseout(function(){
     $lglmg.css("display","none");
     $mask.css("display","none");
   })
   $mmask.mousemove(function(e){
     //console.log(e.offsetX,e.offsetY);
    /* if(e.pageX<50){
       e.pageX=50;
     }else if(e.pageX>242){
       e.pageX=242;
     }*/
   /*  if(e.pageY<50){
       e.pageY=50;
     }else if(e.pageY>350){
       e.pageY=350;
       }*/
     //console.log(e.offsetX,e.offsetY)
       e.offsetX<75?e.offsetX=75:e.offsetX>365? e.offsetX=365 :e.offsetX=e.offsetX
       e.offsetY<75?e.offsetY=75:e.offsetY>365? e.offsetY=365:e.offsetY=e.offsetY
     $mask.css("top",e.offsetY-75);
     $mask.css("left",e.offsetX-75);
     $lglmg.css("background-position",`${-(3/2)*(e.offsetX-75)}px ${-(3/2)*(e.offsetY-75)}px`)
   })