//关闭加载层
win.hideLoading();
/***************************************************用户登陆*********************************************************************/
/*展示用户名*/
$('#username').val(localStorage.getItem("lili-username"));

/*登录*/
$('#admin-submit').click(function(){ login(); });
$(document).keydown(function (event) { if(event.keyCode==13){login();} });

/*登录函数*/
function  login(){
	var username = $('#username').val().trim();
	console.log(username.length)
	var password = $('#password').val().trim();
	if(!regCombination('*',[2,20]).test(username)){
		Layer.alert({width:300,height:150,type:"error",title:"请填写用户名！"});
		return false;
	}
	if(!regCombination('*',[2,20]).test(password)){
		Layer.alert({width:300,height:150,type:"error",title:"请填密码！"});
		return false;
	}
	win.showLoading();
	$.AJAX({
		type:"post",
		url:config.basePath+"login/check",
		data:{account:username,password:password},
		success:function(data){
			//设置浏览器cookie
			localStorage.setItem("lili-username",username);
			//设置登录后的跳转首页 iframeSrc
			window.location.href=sessionStorage.getItem("lili-url") || config.homeUrl;
		}
	});
}



