/*angular for 提现*/
var app=angular.module("app",["ngFilter"]);

/*main 控制器*/
app.controller("School",["$scope","$filter",function($s,$filter){

/*-----------------------------------------查询训练场数据列表----------------------------------------------------*/	
	$s.defaultPage=location.hash.substring(2) || 1;  //默认请求页
	$s.pageSize=10;    //每页显示-显示条数
	$s.name="";    //高级查询

	// /*模拟数据*/
	// $s.data={
	// 	pages:10,
	// 	total:100,
	// 	pageSize:10,
	// 	pageNo:1,
	// 	dataList:[
	// 		{schoolId:201,name:"深港",region:"广东-深圳",reverseLim:"1000",phoneNum:"13476225415",coachCount:25121,posDesc:"这里面是深圳港的介绍" },
			
	// 	]
	// }; 
	// //或得的数据列表
	// $s.datas=$s.data.dataList;

	/*获取数据列表并展示*/
	$s.getDataList=function(){
		var json=getJson($s.defaultPage);
		$.AJAX({
			type:"get",
			url:json.url,
			data:json.data,
			success:function(data){
				var DATA=getListData(data);
				/*数据渲染页面*/
				$s.datas=DATA.dataList;
				$s.$apply();
				//分页请求
				new Page({
					parent:$("#copot-page"),
					nowPage:$s.defaultPage,
					pageSize:$s.pageSize,
					totalCount:DATA.total, 
				}); //分页请求完毕
			}
		});
	};	
	$s.getDataList();
	/*参数配置函数*/
	function getJson(nowPage){
		var json={
			url:config.basePath+"school/querySchool",
			data: {
				"pageNo": nowPage,
			    "pageSize": parseInt($s.pageSize),
			    "cityId":$s.cityId,
			    "name": $s.name
			}
		};
		return json;
	};

	/*hash值改变的时候加载数据列表*/
	window.onhashchange=function(){
		win.showLoading();
		$s.defaultPage=location.hash.substring(2) || 1;
		$s.getDataList();
	}

	/*加载城市数据列表*/
	$.AJAX({
		type:'get',
		url:config.basePath+"school/queryCity",
		data:{
			"rlevel":2,
			"pid":"",
		},
		success:function(data){
			/*数据渲染页面*/
			$s.citys=JSON.parse(data.result.pageData);
		}
	});

	/*按所在城市筛选列表数据*/
	$s.getDataForCity=function(){
		win.showLoading();
		$s.defaultPage=1; //默认第一页
		$s.cityId=$s.cityId;
		$s.getDataList();
	}

	/*按分页条数筛选列表数据*/
	$s.getDataForPage=function(){
		win.showLoading();
		$s.defaultPage=1; //默认第一页
		$s.getDataList();
	}

	/*高级查询*/
	$s.getDataForSearch=function(){
		win.showLoading();
		$s.defaultPage=1; //默认第一页
		$s.getDataList();
	}

/*------------------------------------------编辑 | 新增 训练场---------------------------------------------*/

	/*include 加载完成后执行*/
	$s.siteEditLoad=function(){
		/*点击按钮关闭弹出层*/
		$(".closeAlert").click(function(){
			$(this).parents("div.add-new-school").fadeOut("fast");
		})
	}
	
	/*点击 编辑|新增 训练场信息*/
	$s.editData={};
	$s.editType="add";
	$s.siteEdit=function(type,data){
		$(".add-new-school").fadeIn("fast");
		/*弹出层垂直居中*/
		$("#edit-content").css("marginTop",parseInt(($(win).height()- $("#edit-content").height()-100)/2)+"px");
		if(type=="edit"){
		/*修改*/
			$s.editData = data;
			$s.editType="edit";
		}else{
		/*新增*/
			$s.editData={};
			$s.editType="add";
		}
	}

	/*参数配置函数*/
	function editCarJson(url){
		var json={
				name:$s.editData.name,
				reverseLim:parseInt($s.editData.reverseLim),
				phoneNum:$s.editData.phoneNum,
				posDesc:$s.editData.posDesc

			};
		if($s.editType=="edit"){
			angular.extend(json,{fieldId:$s.editData.fieldId});
		}	
		return {
			url:config.basePath+url,
			data:json
		}
	}

	/*修改 | 新增 训练场信息*/
	$s.submitEditMsg=function($event){
		var json=$s.editType=="add"?editCarJson("field/add"):editCarJson("field/update");

		if(!$s.editData.name || !regCombination('*').test($s.editData.name)){
			Layer.alert({width:300,height:150,type:"msg",title:"请填写场地名"});
			return false;	
		}
		if(!$s.editData.reverseLim || !regCombination('number').test($s.editData.reverseLim)){
			Layer.alert({width:300,height:150,type:"msg",title:"请填写正确的面积范围"});
			return false;	
		}
		if(!$s.editData.phoneNum || !regCombination('phone').test($s.editData.phoneNum)){
			Layer.alert({width:300,height:150,type:"msg",title:"请填写正确的联系电话"});
			return false;	
		}
		if(!$s.editData.posDesc || !regCombination('*').test($s.editData.posDesc)){
			Layer.alert({width:300,height:150,type:"msg",title:"请填写地理位置"});
			return false;	
		}

		$.AJAX({
			url:json.url,
			data:json.data,
			success:function(data){
				/*关闭弹出层*/
				$($event.target).parents("div.add-new-school").fadeOut("fast");
				/*更新列表*/
				$s.getDataList();
			}
		});/*AJAX end*/
	}



}]);