/**
 * Created by Administrator on 2016/4/7.
 */
var app=angular.module("app",["ngFilter"]);
app.controller("lessons",["$scope","$filter",function($s,$filter){
    $s.defaultPage=location.hash.substring(2) || 1;  //默认请求页
    $s.pageSize=10;    //每页显示-显示条数

    /*------------------------------------数据列表查询-------------------------------------------------------*/
    /*模拟数据*/
    $s.data={
        pages:10,
        total:100,
        pageSize:10,
        pageNo:1,
        dataList:[
            {studentId:0,classTime:"2015-12-12 12:13",lessTime:"09:00-10:00",className:"学前理论",classSite:"深港驾校",contacts:"张教练",nub:15012800000,papers:0,peopleNub:70,absence:"3人",state:0},
            {studentId:0,classTime:"2015-12-12 12:13",lessTime:"09:00-10:00",className:"学前理论",classSite:"深港驾校",contacts:"张教练",nub:15012800000,papers:0,peopleNub:70,absence:"3人",state:1},
            {studentId:0,classTime:"2015-12-12 12:13",lessTime:"09:00-10:00",className:"学前理论",classSite:"深港驾校",contacts:"张教练",nub:15012800000,papers:1,peopleNub:70,absence:"3人",state:2},
            {studentId:0,classTime:"2015-12-12 12:13",lessTime:"09:00-10:00",className:"学前理论",classSite:"深港驾校",contacts:"张教练",nub:15012800000,papers:1,peopleNub:70,absence:"3人",state:1},
        ]
    };
    //或得的数据列表
    $s.datas=$s.data.dataList;

    ///*获取数据列表并展示*/
    //$s.getDataList=function(){
    //    var json=getJson($s.defaultPage);
    //    $.AJAX({
    //        type:"get",
    //        url:json.url,
    //        data:json.data,
    //        success:function(data){
    //            var DATA=getListData(data);
    //            $s.total=DATA.total;
    //            /*数据渲染页面*/
    //            $s.datas=DATA.dataList;
    //            /*全选与取消全选*/
    //            Selects.selects({datas:$s.datas,whichId:'orderId',num:''});
    //            $s.$apply();
    //            //分页请求
    //            new Page({
    //                parent:$("#copot-page"),
    //                nowPage:$s.defaultPage,
    //                pageSize:$s.pageSize,
    //                totalCount:DATA.total,
    //            }); //分页请求完毕
    //        }
    //    });
    //};
    //$s.getDataList();


    /*参数配置函数*/
    function getJson(nowPage){
        var json={
            url:config.basePath+"student/lili-batch",
            data: {
                "pageNo": nowPage,
                "pageSize": parseInt($s.pageSize),
                "applyCarType": $s.carType,
                "applyexam":$s.applystateTotal.split(',')[0],
                "applystate":$s.applystateTotal.split(',')[1],
                "schoolNo":$s.schoolNo,
                "schoolType":$s.schoolType,
                "type":0,
            }
        };
    };

    /*hash值改变的时候加载数据列表*/
    window.onhashchange=function(){
        win.showLoading();
        $s.defaultPage=location.hash.substring(2) || 1;
        $s.getDataList();
    }

    /*按分页条数筛选列表数据*/
    $s.getDataForPage=function(){
        win.showLoading();
        $s.defaultPage=1; //默认第一页
        $s.getDataList();
    }


/*---------------新建课程----------------*/
    /*include 加载完成后执行*/
    $s.EditLesson=function(){
        /*点击按钮关闭弹出层*/
        $(".closeAlert").click(function(){
            $(this).parents("div.edit-coach").fadeOut("fast");
        })

    }

    /*新建课程*/
    $s.addEditLesson=function(){
        $(".edit-lesson").fadeIn();
        /*弹出层垂直居中*/
        $("#edit-coach").css("marginTop",parseInt(($(win).height()- $("#edit-coach").height()-100)/2)+"px");

    }



















}]);