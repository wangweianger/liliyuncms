/*angular for 提现*/
var app=angular.module("app",["ngFilter"]);

/*main 控制器*/
app.controller("OrderDetails",["$scope","$filter",function($s,$filter){
	$s.defaultPage=location.hash.substring(2) || 1;  //默认请求页
	$s.orderId=getQueryString("orderId");
	$s.pageSize=10;    //每页显示-显示条数
	$s.index=0;
	$s.tableSwitch=function($event){
		$s.index=tabPageDetails($event);
		win.showLoading();
		/*tab 其切换按需加载*/
		location.hash="##1";
		tabDate($s.index)
	}

	/*hash值改变的时候加载数据列表*/
	window.onhashchange=function(){
		win.showLoading();
		$s.defaultPage=location.hash.substring(2) || 1;
		tabDate($s.index);
	}

	/*tab 切换加载列表*/
	function tabDate(index){
		switch (index) {
			case 0: 
				/*教练历史订单列表*/
				$s.getOrderDetailsData();
				break;
			case 1:
				/*请求绑定学员单数据列表*/
				$s.getOrderLogs();
				break;
		}
	}
/*--------------------------------------订单详情-----------------------------------------------------*/	
	/*获取数据列表并展示*/
	$s.getOrderDetailsData=function(){
		$.AJAX({
			type:"get",
			url:config.basePath+"order/view",
			data:{
				orderId : $s.orderId
			},
			success:function(data){
				$s.data=JSON.parse(data.result.order);
				$s.$apply();
			}
		});
	};	
	$s.getOrderDetailsData();
	/*参数配置函数*/

/*--------------------------------------关闭订单-----------------------------------------------------*/
    /*关闭订单*/
    $s.closeOrder=function(){
		Layer.confirm({width:300,height:160,title:"确认关闭选中的订单吗？",header:"关闭订单"},function(){
			$.AJAX({
				url:config.basePath+"order/update-batch",
				data:{
					orderIds:$s.orderId,
					studentIds:$s.data.studentId,
					coachIds:$s.data.coachId,
				},
				success:function(data){
					Layer.miss({width:250,height:90,title:"操作成功",closeMask:true});
					$s.getOrderDetailsData();
				}
			});
		});/*layer end*/
    }

/*-----------------------------------订单操作日志---------------------------------------------------*/
	
	/*获取数据列表并展示*/
	$s.getOrderLogs=function(){
		var json=orderLogsJson($s.defaultPage);
		$.AJAX({
			type:"get",
			url:json.url,
			data:json.data,
			success:function(data){
				var DATA=getListData(data);
				/*数据渲染页面*/
				$s.orderLogs=DATA.dataList;
				$s.$apply();
				//分页请求
				new Page({
					parent:$("#log-page"),
					nowPage:$s.defaultPage,
					pageSize:$s.pageSize,
					totalCount:DATA.total, 
				}); //分页请求完毕
			}
		});
	};	
	/*参数配置函数*/
	function orderLogsJson(nowPage){
		var json={
			url:config.basePath+"logCommon/batch",
			data: {
				"pageNo": nowPage,
				"pageSize":10,
				"menuId":3,
				"relateId":$s.orderId
			}
		};
		return json;
	};



}]);