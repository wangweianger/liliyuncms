/*JQUERY 的相关（比较散乱）代码放在里面*/
$(function(){

/*首页top栏目消息展开与缩放*/
$('#top').find('.nav-slide').click(function(event){
	event.stopPropagation();
	$('div.nav-slide').find('ul').slideUp();
	var slideObj=$(this).find("ul");
	if(slideObj.css("display")=="none"){
		slideObj.slideDown('fast');
	}else{
		slideObj.slideUp('fast');
	} 
});

/*--后台irfame操作父窗口响应相关--*/
$(window).click(function(){
	if($(win).width()<=768){
		$(win.document).find("#admin-nav").slideUp('fast');
	}
	$(win.document).find(".nav-slide ul").slideUp('fast');
});









});












