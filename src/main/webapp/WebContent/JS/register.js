var isRegisterFormatCorrect1 = 0;
var isRegisterFormatCorrect2 = 0;
var isRegisterFormatCorrect3 = 0;
var isRegisterFormatCorrect4 = 0;
var isRegisterFormatCorrect5 = 0;
var isRegisterFormatCorrect6 = 0;
var isRegisterFormatCorrect7 = 0;
var isOversize = 1;//判断上传的图片是否超过规定大小
var isExistRepeatedId = 0;
var isleapyear = 0;
$().ready(function () {
    $("#userid").keyup(function () {
        //var zz= /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}/;//验证8位以上的不准纯字母或者数字的正则表达式
        var zz = /^[0-9a-zA-Z]{8,17}$/;//验证大于8小于17的字母或者数字的组合
        formcheck($(this), zz);
    });
    $("#firstpass").keyup(function () {
        var zz = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/;
        if (zz.exec($(this).val()) && $(this).val().length <= 20) {
            $(this).css("color", "green");
        } else {
            $(this).css("color", "red");
        }
    });
    $("#repeat").keyup(function () {
        if ($("#firstpass").val() == $("#repeat").val()) {
            $(this).css("color", "green");
        } else {
            $(this).css("color", "red");
        }
    });
    $("#phonenum").keyup(function () {
        var zz = /^1[3578]\d{9}$/;
        formcheck($(this), zz);
    });
    $("#department").keyup(function () {
        if ($(this).val().length <= 70) {
            $(this).css("color", "green");
        } else {
            $(this).css("color", "red");
        }
    });
    setYearAndMonth();
    setDay();
    setCity();
    Check();
    btnSubmit_click();
});

function formcheck(input, zz) {
    if (zz.exec($(input).val())) {
        $(input).css("color", "green");
    } else {
        $(input).css("color", "red");
    }
}

/**
 * @return {boolean}
 */

function setYearAndMonth() {
    var onlydate = new Date();
    var systemyear = Number("20" + onlydate.getYear().toString().substring(1, 3));//获得系统的年
    var $jqDate = $("#year").html("");
    var $jqDate2 = $("#month").html("");
    for (j = 1; j <= 12; j++) {
        var str0 = j;
        $jqDate2.append("<option>" + str0 + "</option>");
    }

    for (i = systemyear; i >= 1910; i--) {
        var str = i
        $jqDate.append("<option>" + str + "</option>");
    }

}

function isLeapYear(year) {//判断闰年
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
        return true;
    else
        return false;
}

function setDay() {
    $("#year").change(function () {
        if (isLeapYear($("#year").val()))
            isleapyear = 1;
        else
            isleapyear = 0;
    });
    $("#month").change(function () {
        if ($("#month").val() == 1 || $("#month").val() == 3 || $("#month").val() == 5 || $("#month").val() == 7
            || $("#month").val() == 8 || $("#month").val() == 10 || $("#month").val() == 12) {
            var $day1 = $("#day").html("");
            for (j = 1; j <= 31; j++) {
                var str0 = j;
                $day1.append("<option>" + str0 + "</option>");
            }
        } else if ($("#month").val() == 4 || $("#month").val() == 6 || $("#month").val() == 9 || $("#month").val() == 11) {
            var $day2 = $("#day").html("");
            for (j = 1; j <= 30; j++) {
                var str0 = j;
                $day2.append("<option>" + str0 + "</option>");
            }
        } else if ($("#month").val() == 2) {
            if (isleapyear == 1) {
                var $day3 = $("#day").html("");
                for (j = 1; j <= 29; j++) {
                    var str0 = j;
                    $day3.append("<option>" + str0 + "</option>");
                }
            } else if (isleapyear == 0) {
                var $day4 = $("#day").html("");
                for (j = 1; j <= 28; j++) {
                    var str0 = j;
                    $day4.append("<option>" + str0 + "</option>");
                }
            }
        }
    });
}

function setCity() {
    var cityMap = {
        "江苏": ["南京", "镇江", "苏州", "无锡", "常州", "扬州", "泰州", "南通", "盐城", "淮安", "宿迁", "徐州", "连云港"],
        "浙江": ["杭州", "宁波", "温州", "绍兴", "嘉兴", "湖州", "金华", "衢州", "丽水", "台州", "舟山"],
        "上海": ["黄浦", "徐汇", "长宁", "静安", "普陀", "虹口", "杨浦", "浦东", "闵行", "宝山", "嘉定", "金山", "松江", "青浦", "奉贤", "崇明"]
    };
    $("#province").change(function () {
        $("#city").empty();
        var proName = $(this).val();
        var list = cityMap[proName];
        var $city = $("#city");
        for (var i = 0; i < list.length; i++) {
            $city.append($("<option></option>").text(list[i]));
        }
    });
}

function Check() {
    $("#userid").focusout(function () {
        if ($("#userid").val().length < 8) {
            //alert("用户名不能为空！");
            $("#userid_div").html("用户名不能小于8位！");
            isRegisterFormatCorrect1 = 0;
        } else if ($("#userid").val().length > 17) {
            $("#userid_div").html("用户名位数不能大于17！");
            isRegisterFormatCorrect1 = 0;
        } else {
            $("#userid_div").html("");
            isRegisterFormatCorrect1 = 1;
        }

        var url = "/checkRepeatedId_user";
        //alert($("#userid").val());
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            beforeSend: function (request) {
                request.setRequestHeader("myflag", "y");
            },
            data: {
                myid: $("#userid").val()
            },
            success: function (data) {
                if (data.msg == "success") {
                    $("#userid_div").html("该用户名已存在");
                    isExistRepeatedId = 1;
                } else if (data.msg == "failed") {
                    var str = $("#userid_div").html();
                    $("#userid_div").html(str + "");
                    isExistRepeatedId = 0;
                }

            }
        });
    });

    $("#firstpass").focusout(function () {
        if ($("#firstpass").val().length < 6) {
            //alert("您输入的密码少于6位！");
            $("#firstpass_div").html("您输入的密码少于6位!");
            isRegisterFormatCorrect2 = 0;
        } else if ($("#firstpass").val().length > 20) {
            $("#firstpass_div").html("您输入的密码大于20位!");
            isRegisterFormatCorrect2 = 0;
        } else {
            $("#firstpass_div").html("");
            isRegisterFormatCorrect2 = 1;
        }
    });

    $("#repeat").focusout(function () {
        if ($("#firstpass").val() != $("#repeat").val()) {
            //alert("确认密码不正确！");
            $("#repeat_div").html("确认密码不正确!");
            isRegisterFormatCorrect3 = 0;
        } else {
            $("#repeat_div").html("");
            isRegisterFormatCorrect3 = 1;
        }
    });

    $("#username").focusout(function () {
        if ($("#username").val().length == 0) {
            //alert("姓名不能为空！");
            $("#username_div").html("姓名不能为空!");
            isRegisterFormatCorrect4 = 0;
        } else if ($("#username").val().length > 20) {
            $("#username_div").html("姓名字符不能大于20!");
            isRegisterFormatCorrect4 = 0;
        } else {
            $("#username_div").html("");
            isRegisterFormatCorrect4 = 1;
        }
    });

    $("#nickname").focusout(function () {
        if ($("#nickname").val().length == 0) {
            //alert("姓名不能为空！");
            $("#nickname_div").html("昵称不能为空!");
            isRegisterFormatCorrect5 = 0;
        } else if ($("#nickname").val().length > 20) {
            $("#nickname_div").html("姓名字符不能大于20!");
            isRegisterFormatCorrect5 = 0;
        } else {
            $("#nickname_div").html("");
            isRegisterFormatCorrect5 = 1;
        }
    });
    $("#phonenum").focusout(function () {
        var zz = /^1[3578]\d{9}$/;
        if (!zz.exec($("#phonenum").val())) {
            //alert("手机号格式不正确！");
            $("#phonenum_div").html("手机号格式不正确!");
            isRegisterFormatCorrect6 = 0;
        } else {
            $("#phonenum_div").html("");
            isRegisterFormatCorrect6 = 1;
        }
    });
    $("#portrait").focusout(function () {
        $("input[name='file']").each(function () {
            if ($(this).val() != "") {
                isRegisterFormatCorrect7 = 1;
            }
        });
        if (isRegisterFormatCorrect7 == 0) {
            $("#portrait_div").html("请选择头像！");
        } else if (isRegisterFormatCorrect7 == 1 && isOversize == 0) {
            $("#portrait_div").html("");
        } else if (isRegisterFormatCorrect7 == 1 && isOversize == 1) {
            $("#portrait_div").html("请选择不超过2M的图片");
        }
    });

}

function filesize(ele) {
    if (((ele.files[0].size).toFixed(2)) >= (2 * 1024 * 1024)) {
        isOversize = 1;
        alert("请上传小于2M的图片");
    } else {
        isOversize = 0;
    }
}

function btnSubmit_click() {//注册按钮点击事件
    $("#btnSubmit").click(function () {
        //拼接生日
        var str1, str2, str3;
        str1 = $("#year").val();
        str2 = $("#month").val();
        str3 = $("#day").val();
        var birthday = str1 + "-" + str2 + "-" + str3;
        if (isRegisterFormatCorrect1 == 1 && isRegisterFormatCorrect2 == 1 && isRegisterFormatCorrect3 == 1
            && isRegisterFormatCorrect4 == 1 && isRegisterFormatCorrect5 == 1 && isRegisterFormatCorrect6 == 1
            && isRegisterFormatCorrect7 == 1 && isOversize == 0 && $("#check").is(':checked')) {
            if (isExistRepeatedId == 0) {
                url = "/saveUserInfo";
                var option = {
                    url: "/saveUserInfo",
                    type: "post",
                    dataType: 'json',
                    beforeSend: function (request) {
                        request.setRequestHeader("myflag", "y");
                    },
                    success: function (data) {
                        if (data.msg == "success") {
                            localStorage.setItem("id", $("#userid").val());//将这个用户id传到下个页面
                            isRegisterFormatCorrect1 = 0;
                            isRegisterFormatCorrect2 = 0;
                            isRegisterFormatCorrect3 = 0;
                            isRegisterFormatCorrect4 = 0;
                            isRegisterFormatCorrect5 = 0;
                            isRegisterFormatCorrect6 = 0;
                            isRegisterFormatCorrect7 = 0;
                            isOversize = 1;
                            window.location.href = "/";
                            //$("#zhuce").attr("action","/UserPage");//这里可以直接跳转，session已经创建好了在后台
                            //$("#zhuce").submit();
                        } else {
                            alert("注册失败");
                        }
                    }
                };
                $("#zhuce").ajaxSubmit(option);
                // $.ajax({
                //     url: url,
                //     type: "POST",
                //     dataType: "json",
                //     data: {
                //         userid: $("#userid").val(),
                //         password:$("#firstpass").val(),
                //         username:$("#username").val(),
                //         nickname:$("#nickname").val(),
                //         usergender:$("#usergender").val(),
                //         userbirthday:birthday,
                //         usertel:$("#phonenum").val(),
                //         userprovince:$("#province").val(),
                //         usercity:$("#city").val(),
                //     },
                //     success: function (data) {
                //         if(data.msg=="success"){
                //             localStorage.setItem("id",$("#userid").val());//将这个用户id传到下个页面
                //             isRegisterFormatCorrect1=0;
                //             isRegisterFormatCorrect2=0;
                //             isRegisterFormatCorrect3=0;
                //             isRegisterFormatCorrect4=0;
                //             isRegisterFormatCorrect5=0;
                //             isRegisterFormatCorrect6=0;
                //             window.location.href ="/";
                //             //$("#zhuce").attr("action","/UserPage");//这里可以直接跳转，session已经创建好了在后台
                //             //$("#zhuce").submit();
                //         }else{
                //             alert("注册失败");
                //         }
                //
                //     }
                // });
            } else {
                alert("该用户名已存在于数据库，不予注册");
            }
        } else {

            if (!$("#check").is(':checked')) {
                //alert("请同意服务协议！");
                $("#check_div").html("请同意服务协议!");
            } else {
                $("#check_div").html("");
            }
        }
    });
}
