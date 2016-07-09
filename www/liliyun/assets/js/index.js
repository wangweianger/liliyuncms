//关闭加载层
//win.hideLoading();
/***************************************************后台首页*********************************************************************/

;(function(){

/*-----------------------------------------index menu权限列表展示----------------------------------------------*/
	var arr=[100100,101500,100200,100300,100400,100500,100600,100601,100602,100603,100700,100800,100900,101000,101600,101700,101300];	
	showMenu(arr);
	menuList();
	$.AJAX({
		type:"GET",
		url:config.basePath+'resource/menu-list',
		nohideloading:true,
		success:function(data){
			/*展示菜单*/
			showMenu(data.result.pageData.split(','));
			menuList();
		}
	});
	function showMenu(arr){
		var newMenu=getMenuData(arr);
		var html='';
		for(var i=0,len=newMenu.length;i<len;i++){
			if(newMenu[i].title){
				html+='<li><div><span class="'+newMenu[i].title.icon+'"></span>'+newMenu[i].title.name+'<i class="s-i ion-ios-arrow-right"></i></div><ul class="second-menu s-ac-menu">';
				for(var j=0,lenj=newMenu[i].list.length;j<lenj;j++){
					if(newMenu[i].list[j].title){
						html+='<li><div>'+newMenu[i].list[j].title.name+'<i class="t-i ion-ios-arrow-right"></i></div><ul class="second-menu t-ac-menu">';
							for(var k=0;k<newMenu[i].list[j].list.length;k++){
								html+='<li><div src="'+newMenu[i].list[j].list[k].src+'">'+newMenu[i].list[j].list[k].name+'</div></li>';
							}
						html+='</li></ul>';
					}else{
						html+='<li><a href="'+startConfig.bathUrl+newMenu[i].list[j].src+'"><div src="'+newMenu[i].list[j].src+'">'+newMenu[i].list[j].name+'</div></a></li>';
					}		
				};		
				html+='</ul></li>';
			}else{
				html+='<li><a href="'+startConfig.bathUrl+newMenu[i].src+'"><div src="'+newMenu[i].src+'"><span class="'+newMenu[i].icon+'"></span>'+newMenu[i].name+'</div></a></li>';
			}
		}
		$('#admin-nav').html(html);
	}
	/*menu 权限筛选后操作 返回新的数据*/
	function getMenuData(arr){
		var menuList=getMenu(arr);
		var menuPar=menuPer.par;
		var newArr=[];
		var parenName='';
		var parenName1='';
		var iNow=0;
		var iNow1=0;
		for(var i=0,len=menuList.length;i<len;i++){
			if(menuList[i].parenName){
				if(parenName==menuList[i].parenName){
					if(parenName1==menuList[i].parenName){
						newArr[iNow-1].list[iNow1].list.push(menuList[i])
					}else{
						newArr[iNow-1].list.push(menuList[i]);
						iNow1++;
					}
				}else{
					var titleMe=menuPar[menuList[i].parenName].parentName;
					if(titleMe){
						newArr[iNow-1].list.push({
							title:menuPar[menuList[i].parenName],
							list:[menuList[i]]
						})
						iNow1++;
						parenName1=menuList[i].parenName;
					}else{
						newArr.push({
							title:menuPar[menuList[i].parenName],
							list:[menuList[i]]
						});
						iNow++;
					}
				}
			}else{
				newArr.push(menuList[i]);
				iNow++;
			}
			parenName=menuList[i].parenName;
		}
		return newArr;
	}
	
/*--------------------------------------index menu权限列表结束-----------------------------------------------*/

	/*mobile 导航相关操作*/
	if($(window).width()<=768){
		$('#iphone-nav-but').click(function(ev){
			ev.stopPropagation();
			$('#admin-nav').stop().slideToggle("fast");
		})
		/*算出右侧所展示的高度*/
		setTimeout(function(){
			$('#content').css({width:$(window).width()+"px",height:($(window).height()-$("#top").height()-$("#index-left").height()-4)+"px"});
			$('#content').show();
		}, config.contentTimeShow);
	}else{
		/*算出右侧所展示的高度*/
		setTimeout(function(){
			$('#content').css({width:$(window).width()-220+"px",height:($(window).height()-$("#top").height()-2)+"px"});
			$('#content').show();
		}, config.contentTimeShow);
		/*PC端屏幕改变时 自适应*/
		window.onresize = function(){
			$('#content').css({width:$(window).width()-220+"px"});
		}
	}		

	/*展示用户名*/
	$('#home-username').text(localStorage.getItem("lili-username"));

	/*首页menu 操作函数*/
	function menuList(){
		/*页面 加载|刷新 左侧导航active*/
		/*打开相应的右侧菜单*/
		openSrc();
		
		/*后台首页左侧导航active*/
		$('#admin-nav div').click(function(ev){
			ev.stopPropagation();
			var href=$(this).attr("src");
			if(href){
				if($(window).width()<=768){
					$('#admin-nav').slideUp("fast");
				}
				/*无子集*/
				/*左侧导航栏active*/
				openSrc();
			}else{
				/*有子集*/
				if($(this).parents("li").parents("li")[0]){
					$('#admin-nav ul.t-ac-menu').slideUp("fast");
					$('#admin-nav i.t-i').attr("class","ion-ios-arrow-right");
					if($(this).parent("li").find('ul').css("display")=="none"){
						$(this).parent("li").find("i").attr("class","t-i ion-ios-arrow-down");
						$(this).parent("li").find('ul').slideDown("fast");
					}else{
						$(this).parent("li").find("i").attr("class","t-i ion-ios-arrow-right");
						$(this).parent("li").find('ul').slideUp("fast");
					}
				}else{
					$('#admin-nav ul').slideUp("fast");
					$('#admin-nav i.s-i').attr("class","s-i ion-ios-arrow-right");
					if($(this).parent("li").find('ul.s-ac-menu').css("display")=="none"){
						$(this).parent("li").find("i.s-i").attr("class","s-i ion-ios-arrow-down");
						$(this).parent("li").find('ul.s-ac-menu').slideDown("fast");
					}else{
						$(this).parent("li").find("i.s-i").attr("class","s-i ion-ios-arrow-right");
						$(this).parent("li").find("i.t-i").attr("class","t-i ion-ios-arrow-right");
						$(this).parent("li").find('ul.s-ac-menu').slideUp("fast");
					}

				}
			}
		});	
	}

/*--------------------------------------index ajax-----------------------------------------------*/
	/*用户验证*/
	$.AJAX({
		url:config.basePath+"user/verify",
		nohideloading:true,
		success:function(data){
			localStorage.setItem("lili-username",data.result.userName);
		}
	});

	/*退出登陆*/
	window.logOut=function(){
		Layer.confirm({width:300,height:160,title:"确认退出登陆吗？",header:"退出登陆"},function(){
			loginOut(); //退出登录
		});
	};


	/*获取but 权限列表*/
	$.AJAX({
		type:"GET",
		url:config.basePath+'resource/btn-list',
		nohideloading:true,
		success:function(data){
			/*展示菜单*/
			localStorage.setItem("lili-btnList",data.result.pageData);
		}
	});

})();




