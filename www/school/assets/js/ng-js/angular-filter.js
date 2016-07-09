/*自定义 $filter 公共过虐器*/
(function (window, angular, undefined) {

    var app = angular.module('ngFilter', []);

    /*-------------------------------公共过滤器---------------------------------------*/

    /*字符串太长时剪切 并加上...号*/
    app.filter('limitToSec', [function () {
        return function (type, num) {
            var typeTex = type;
            if (type.length > num) {
                typeTex = type.substring(0, num) + '···';
            }
            return typeTex;
        };
    }]);

    /*验证button 权限滤器*/
    app.filter('isButtonShow', ["$filter",function ($filter) {
        return function (id) {
            var butShow = false;
            var butList = localStorage.getItem("school-btnList");
            if (butList) {
                var butListData = butList.split(',')
                for (var i = 0, len = butListData.length; i < len; i++) {
                    if (id == butListData[i]) {
                        butShow = true;
                    }
                    ;
                }
            }
            return butShow;
        };
    }]);

    /*金钱过滤器| 保留两位小数点*/
    app.filter('priceTex', ["$filter",function ($filter) {
        return function (price) {
            return $filter('currency')(price / 100, '', 2);
        }
    }])

    /*时间过滤器*/
    app.filter('timeTex', ["$filter",function ($filter) {
        return function (time) {
            if (time) {
                return $filter('date')(new Date(time), "yyyy-MM-dd HH:mm:ss");
            }
        };
    }]);

    /*时间过滤器*/
    app.filter('timeTexYMD', ["$filter",function ($filter) {
        return function (time) {
            if (time) {
                return $filter('date')(new Date(time), "yyyy-MM-dd");
            }
        };
    }]);

    /*性别过滤器 (0女1男)*/
    app.filter('sexText', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "女"
                    break;
                case 1:
                    typeTex = "男"
                    break;
            }
            return typeTex;
        };
    }]);

    /*多为数 变*号*/
    app.filter('secretNumber', [function () {
        return function (type) {
            var strxh="";
            if(type){
                for(var i=0;i<type.length;i++){
                    strxh+='*';
                }   
                return type.replace(type.substr(0,type.length-4),strxh);
            }
        };
    }]);

    /*-------------------------------Order 订单---------------------------------------*/

    /*付款类型过滤器 0未付款 1已付款 2付款失败 9老学员自动付款*/
    app.filter('payStateTex', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "未付款"
                    break;
                case 1:
                    typeTex = "已付款"
                    break;
                case 2:
                    typeTex = "付款失败"
                    break;
                case 9:
                    typeTex = "老学员自动付款"
                    break;
            }
            return typeTex;
        };
    }]);

    /*订单状态类型过滤器*/
    app.filter('orderStateTex', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "已取消"
                    break;
                case 1:
                    typeTex = "已下单"
                    break;
                case 2:
                    typeTex = "已接单"
                    break;
                case 3:
                    typeTex = "上课中"
                    break;
                case 4:
                    typeTex = "已下课"
                    break;
                case 5:
                    typeTex = "教练已评"
                    break;
                case 6:
                    typeTex = "学员已评"
                    break;
                case 7:
                    typeTex = "双方已评"
                    break;
                case 9:
                    typeTex = "已拒单"
                    break;
                case 10:
                    typeTex = "缺课"
                    break;
            }
            return typeTex;
        };
    }]);


    /*-------------------------------student 学员---------------------------------------*/
    /* 认证状态(0---未审核 1---审核中 2---审核未通过 3---已认证 4---已过期 5---已吊销) */
    app.filter('studentState', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "未审核"
                    break;
                case 1:
                    typeTex = "审核中"
                    break;
                case 2:
                    typeTex = "审核未通过"
                    break;
                case 3:
                    typeTex = "已认证"
                    break;
                case 4:
                    typeTex = "已过期"
                    break;
                case 5:
                    typeTex = "已吊销"
                    break;
            }
            return typeTex;
        }
    }])

    /*账号状态过滤器*/
    app.filter('accountStatusTex', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "正常"
                    break;
                case 1:
                    typeTex = "已封号"
                    break;
            }
            return typeTex;
        };
    }]);

    /*车型过滤器 (1代表C1,2代表C2,3代表其它)  */
    app.filter('applyCarTypeTex', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 1:
                    typeTex = "C1"
                    break;
                case 2:
                    typeTex = "C2"
                    break;
                case 3:
                    typeTex = "其他"
                    break;
            }
            return typeTex;
        };
    }]);

    /*身份证保留后4位过滤器*/
    app.filter('idNumberLast4', [function () {
        return function (idNumber) {
            return idNumber.slice(-4, 25);
        }
    }])

    /*报名状态过滤器*/
    app.filter('applystateText', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "未开始"
                    break;
                case 1:
                    typeTex = "已提交"
                    break;
                case 100:
                    typeTex = "已成功"
                    break;
                case 101:
                    typeTex = "已失败"
                    break;
            }
            return typeTex;
        };
    }])

    /*学员状态过滤器*/
    app.filter('studentStateText', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case '1,0':
                case '1,100':
                case '2,0':
                case '2,100':
                case '3,0':
                case '3,100':
                case '4,0':
                case '4,1':
                case '4,100':
                case '5,1':
                    typeTex = "未收资料"
                    break;
                case '5,101':
                    typeTex = "资料不全"
                    break;
                case '5,100':
                    typeTex = "资料齐全"
                    break;
                case '6,1':
                    typeTex = "表已寄出"
                    break;
                case '6,100':
                    typeTex = "已交表"
                    break;
                case '7,1':
                    typeTex = "受理中"
                    break;
                case '7,101':
                    typeTex = "报名失败"
                    break;
                case '7,100':
                    typeTex = "报名成功"
                    break;
                case '101,100':
                    typeTex = "已约理论课"
                    break;
                case '101,101':
                    typeTex = "缺理论课"
                    break;
                case '201,0':
                    typeTex = "未模拟考试"
                    break;
                case '201,100':
                    typeTex = "模拟考试达标"
                    break;
                case '301,0':
                    typeTex = "科一约考排队中"
                    break;
                case '301,101':
                    typeTex = "科一约考取消中"
                    break;
                case '302,0':
                    typeTex = "已约考科一"
                    break;
                case '302,101':
                    typeTex = "科一不合格"
                    break;
                case '302,100':
                    typeTex = "科一合格"
                    break;
                case '401,0':
                    typeTex = "科二约考排队中"
                    break;
                case '401,101':
                    typeTex = "科二约考取消中"
                    break;
                case '402,0':
                    typeTex = "已约考科二"
                    break;
                case '402,101':
                    typeTex = "科二不合格"
                    break;
                case '402,100':
                    typeTex = "科二合格"
                    break;
                case '501,0':
                    typeTex = "长训约考排队中"
                    break;
                case '501,101':
                    typeTex = "长训约考取消中"
                    break;
                case '502,0':
                    typeTex = "已约考长训"
                    break;
                case '502,101':
                    typeTex = "长训不合格"
                    break;
                case '502,100':
                    typeTex = "长训合格"
                    break;
                case '601,0':
                    typeTex = "科三约考排队中"
                    break;
                case '601,101':
                    typeTex = "科三约考取消中"
                    break;
                case '602,0':
                    typeTex = "已约考科三"
                    break;
                case '602,101':
                    typeTex = "科三不合格"
                    break;
                case '701,0':
                    typeTex = "已约考科四"
                    break;
                case '701,101':
                    typeTex = "科四不合格"
                    break;
                case '701,100':
                    typeTex = "已拿证"
                    break;
                default:
                    typeTex = "未报名"
                    break;
            }
            return typeTex;
        };
    }])

    /*-------------------------------car 汽车---------------------------------------*/

    /*汽车等级过滤器 (1代表普通,2代表舒适,3代表豪华)  */
    app.filter('carLevelText', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 1:
                    typeTex = "普通"
                    break;
                case 2:
                    typeTex = "舒适"
                    break;
                case 3:
                    typeTex = "豪华"
                    break;
            }
            return typeTex;
        };
    }]);

    /*汽车认证状态过滤器*/
    app.filter('checkIdStateText', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "未认证"
                    break;
                case 1:
                    typeTex = "认证中"
                    break;
                case 2:
                    typeTex = "已认证"
                    break;
                case 3:
                    typeTex = "认证失败"
                    break;
            }
            return typeTex;
        }
    }])


    /*-------------------------------提现---------------------------------------*/
    /*提现类型过滤器*/
    app.filter('typeTex', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case "bank":
                    typeTex = "银行卡"
                    break;
                case "wexin":
                    typeTex = "微信"
                    break;
                case "zhifubao":
                    typeTex = "支付宝"
                    break;
                case "qqwallet":
                    typeTex = "QQ钱包"
                    break;
            }
            return typeTex;
        };
    }]);

    /*财务反馈类型过滤器*/
    app.filter('checkStatusTex', [function () {
        return function (status) {
            var typeTex = "";
            switch (status) {
                case 0:
                    typeTex = "审核中";
                    break;
                case 1:
                    typeTex = "提现成功";
                    break;
                case 2:
                    typeTex = "提现失败";
                    break;
                case 3:
                    typeTex = "财务确认";
                    break;
                case 4:
                    typeTex = "银行处理中";
                    break;
                case 5:
                    typeTex = "银行处理失败";
                    break;
            }
            return typeTex;
        };
    }]);

    /*-------------------------------银行卡---------------------------------------*/
    /*财务反馈类型过滤器*/
    app.filter('statusTex', [function () {
        return function (status) {
            var typeTex = "";
            switch (status) {
                case 0:
                    typeTex = "待反馈";
                    break;
                case 1:
                    typeTex = "有效卡号";
                    break;
                case 2:
                    typeTex = "无效卡号";
                    break;
            }
            return typeTex;
        };
    }]);

    /*-------------------------------报名订单---------------------------------------*/
    /*资料邮寄状态过滤器*/
    app.filter('postStateTex', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "资料未邮寄";
                    break;
                case 1:
                    typeTex = "资料已邮寄";
                    break;
                case 2:
                    typeTex = "资料已收到";
                    break;
            }
            return typeTex;
        };
    }]);

    /*报名订单支付状态过滤器*/
    app.filter('signUpPayStateTex', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "未开始";
                    break;
                case 1:
                    typeTex = "已提交";
                    break;
                case 100:
                    typeTex = "成功";
                    break;
                case 101:
                    typeTex = "失败";
                    break;
            }
            return typeTex;
        };
    }]);

    /*-------------------------------奖金---------------------------------------*/
    /*奖金列表发放状态*/
    app.filter('bonusStatusText', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 1:
                    typeTex = "未确认";
                    break;
                case 2:
                    typeTex = "待发奖";
                    break;
                case 3:
                    typeTex = "发放成功";
                    break;
                case 4:
                    typeTex = "发放失败";
                    break;
                case 5:
                    typeTex = "财务拒绝";
                    break;
            }
            return typeTex;
        };
    }]);

    /*奖金明细 奖金发放状态*/
    app.filter('bonusStatusDetailsText', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "待发放";
                    break;
                case 1:
                    typeTex = "发放成功";
                    break;
                case 2:
                    typeTex = "发放失败";
                    break;
            }
            return typeTex;
        };
    }]);

    /*携带的证件*/
    app.filter('papersText', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "身份证";
                    break;
                case 1:
                    typeTex = "居住证";
                    break;
            }
            return typeTex;
        }
    }])

    /*课程状态*/
    app.filter('lessonStateText', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "未上课";
                    break;
                case 1:
                    typeTex = "已上课";
                    break;
                case 2:
                    typeTex = "已取消";
                    break;
            }
            return typeTex;
        }
    }])


    /*-------------------------------财务收支统计---------------------------------------*/
    app.filter('accBalaStateText', [function () {
        return function (type) {
            var typeTex = 1;        //表示平
            if (type.match(/\+/)) {
                typeTex = 2;     //表示+
            } else if (type.match(/\-/)) {
                typeTex = 3;     //表示-
            }
            return typeTex;
        };
    }]);


    /*驾校提现状态过滤器 状态,0-审核中，1-提现成功，2-提现失败，3-财务确认,4银行处理中，5银行处理失败*/
    app.filter('recoreStatusText', [function () {
        return function (type) {
            var typeTex = "";
            switch (type) {
                case 0:
                    typeTex = "审核中";
                    break;
                case 1:
                    typeTex = "提现成功";
                    break;
                case 2:
                    typeTex = "提现失败";
                    break;
                case 3:
                    typeTex = "财务确认";
                    break;
                case 4:
                    typeTex = "银行处理中";
                    break;
                case 5:
                    typeTex = "银行处理失败";
                    break;            
            }
            return typeTex;
        }
    }])
    

})(window, window.angular);
