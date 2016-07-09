/*angular for 提现*/
var app=angular.module("app",["ngFilter"]);

/*main 控制器*/
app.controller("accountSchool",["$scope",function($s) {
	//当前显示状态  1：驾校账户页面   2：变更商户信息提交的提示  3：变更商户信息提交"通过"审核的提示  4：变更商户信息提交"未通过"审核的提示
    $s.type=getQueryString('type') || 0

    $s.schoolId=getQueryString('schoolId')
    /*------------账户信息-----------*/
    $.AJAX({
        type:"get",
        url:config.basePath+"school/queryAccount",
        data:{
            schoolId:$s.schoolId,
        },
        success:function(data){
            $s.schoolDetails=getListData(data);   //获取返回数据
            $s.isChange=$s.schoolDetails.isChange;  //是否有变更: 1无，2已提交申请，3已审核申请资料，4已驳回申请，5关闭
            $s.checkStatus=$s.schoolDetails.checkStatus;  //审核状态: 1初始化，2审核通过，3审核不通过
            console.log($s.isChange);
            /*------------判断审核状态-----------*/
            if($s.checkStatus==1){
                window.location.href="schools-account-application.html?type=audit";
            }else if($s.checkStatus==3){
                window.location.href="schools-account-application.html?type=noPass";
            }
            /*------------"变更商户信息"申请提交后链接不可用-----------*/
            if($s.isChange==2){
                $(".ischangetype").attr("href","javascript:void(0)").addClass("btn-default");
            }
            /*------------判断是否申请开通-----------*/
            if($s.schoolDetails==""){
                window.location.href="schools-account-application.html";
            }
            /*--------------申请提现按钮禁用--------------*/
            $s.withdrawals=function(){
                if($s.isChange!=2){
                    window.location.href="schools-account-withdrawals.html?type=0";
                }
            }
            $s.$apply();
        }
    });

    //关闭提示
    $s.passClose=function(){
        $.AJAX({
            url:config.basePath+"school/closeRemark",
            data:{
                schoolId:$s.schoolId,
            },
            success:function(data){
                console.log($s.isChange)
                $s.isChange=5
                $s.$apply();
            }
        })
    }

}]);