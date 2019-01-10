/**
 * Created by BaoDong on 2017/2/5.
 */
//保存修改信息时标记是否点击了编辑按钮
var isClickEditBtn=0;
//标记个人信息修改的每一项是否输入格式正确,这里直接设置为1是由于用户不做修改，也可以通过提交
var isEditFormCorrect1=1;
var isEditFormCorrect2=1;
var isEditFormCorrect3=1;
var isEditFormCorrect4=1;
//标记闰年
var isleapyear=0;
var isOversize=0;//上传的图片大小是否符合要求标记
var isSelectpic=0;//是否选择图片标记
//标记原密码和新密码格式是否正确的标记
var isPasswordFormCorrect1=0;
var isPasswordFormCorrect2=0;
var isPasswordFormCorrect3=0;
//显示个人信息
function showPersonInfo(){
    $("#showPersonInfoBtn").click(function(){
        setYearAndMonth();
        setDay();
        setCity();
        $("#userid").val(userId);
        $("#username").val(userName);
        $("#nickname").val(userNickName);
        if(userGender=="male")
            userGender="男";
        else if(userGender=="female")
            userGender="女";
        else if(userGender=="other")
            userGender="其他";
        $("#usergender").val(userGender);
        var date=new Date(userBirthday);
        $("#year").val(date.getFullYear());
        $("#month").val(date.getMonth()+1);
        $("#day").append($("<option></option>").text(date.getDate()));
        $("#phonenum").val(userPhoneNum);
        $("#province").val(userProvince);
        $("#city").empty();
        $("#city").append($("<option></option>").text(userCity));
        $("#signature").val(userSignature);
        $("#userid").attr("readonly","readonly");//无论怎样都不能修改
        $("#username").attr("readonly","readonly");
        $("#nickname").attr("readonly","readonly");
        $("#usergender").attr("readonly","readonly");
        $("#phonenum").attr("readonly","readonly");
        $("#signature").attr("readonly","readonly");
        //清空提示div里面的内容，上一次编辑格式不正确时，提示div里就会出现提醒，
        $("#username_div").val("");
        $("#nickname_div").val("");
        $("#phonenum_div").val("");
        $("#signature_div").val("");

    });
}
//允许编辑个人信息
function approveEdit(){
    $("#edit_person_info").click(function () {
        isClickEditBtn = 1;
        $("#edit_person_info").css("background", "#ccc");
        $("#username").removeAttr("readonly");
        $("#nickname").removeAttr("readonly");
        $("#usergender").removeAttr("readonly");
        $("#phonenum").removeAttr("readonly");
        $("#signature").removeAttr("readonly");
    });
}
//保存个人信息修改
function savechange(){
    $("#save_change").click(function(){
        if(isClickEditBtn==1) {
            if(isEditFormCorrect1==1&&isEditFormCorrect2==1&&isEditFormCorrect3==1&&isEditFormCorrect4==1) {
                var str1, str2, str3;
                str1 = $("#year").val();
                str2 = $("#month").val();
                str3 = $("#day").val();
                var birthday = str1 + "-" + str2 + "-" + str3;
                $.ajax({
                    url: "/updateUserInfo",
                    type: "POST",
                    dataType: "json",
                    data: {
                        userid: userId,
                        username: $("#username").val(),
                        nickname: $("#nickname").val(),
                        usergender: $("#usergender").val(),
                        userbirthday: birthday,
                        usertel: $("#phonenum").val(),
                        userprovince: $("#province").val(),
                        usercity: $("#city").val(),
                        usersignature: $("#signature").val()
                    },
                    beforeSend: function(request) {
                        request.setRequestHeader("myflag", "y");
                    },
                    success: function (data) {
                        if (data.msg == "success") {
                            //修改之后更新前端的用户信息
                            userName=$("#username").val();
                            userNickName=$("#nickname").val();
                            userGender=$("#usergender").val();
                            userPhoneNum=$("#phonenum").val();
                            userProvince=$("#province").val();
                            userCity=$("#city").val();
                            userSignature=$("#signature").val();
                            userBirthday=birthday;
                            $("#myModal_2").css("display","none");
                            isClickEditBtn=0;//下一次弹出模态框，还是需要点击编辑按钮
                            $("#edit_person_info").css("background", "#fff");//编辑按钮变回原先的样式
                            alert("修改已保存!");
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        /*错误信息处理*/
                        alert("网络错误!");
                    }
                });
            }else{
                alert("格式不正确!");
            }
        }else{
            alert("请先点击编辑按钮!");
        }
    });
}
//修改个人信息其中就有生日的修改，这里是设置系统的年和月
function setYearAndMonth(){
    var onlydate = new Date();
    var systemyear=Number("20"+onlydate.getYear().toString().substring(1,3));//获得系统的年
    var $jqDate=    $("#year").html("");
    var $jqDate2=$("#month").html("");
    for(j=1;j<=12;j++){
        var str0=j;
        $jqDate2.append("<option>"+str0+"</option>");
    }

    for(i=systemyear;i>=1910;i--){
        var str=i
        $jqDate.append("<option>"+str+"</option>");
    }

}
//判断是否是闰年
function isLeapYear(year){//判断闰年
    if((year%4==0&&year%100!=0)||year%400==0)
        return true;
    else
        return false;
}
//设置系统的日
function setDay(){
    $("#year").change(function(){
        if(isLeapYear($("#year").val()))
            isleapyear=1;
        else
            isleapyear=0;
    });
    $("#month").change(function(){
        if($("#month").val()==1||$("#month").val()==3||$("#month").val()==5||$("#month").val()==7
            ||$("#month").val()==8||$("#month").val()==10||$("#month").val()==12){
            var $day1=$("#day").html("");
            for(j=1;j<=31;j++){
                var str0=j;
                $day1.append("<option>"+str0+"</option>");
            }
        }else if($("#month").val()==4||$("#month").val()==6||$("#month").val()==9||$("#month").val()==11){
            var $day2=$("#day").html("");
            for(j=1;j<=30;j++){
                var str0=j;
                $day2.append("<option>"+str0+"</option>");
            }
        }else if($("#month").val()==2){
            if(isleapyear==1){
                var $day3=$("#day").html("");
                for(j=1;j<=29;j++){
                    var str0=j;
                    $day3.append("<option>"+str0+"</option>");
                }
            }else if(isleapyear==0){
                var $day4=$("#day").html("");
                for(j=1;j<=28;j++){
                    var str0=j;
                    $day4.append("<option>"+str0+"</option>");
                }
            }
        }
    });
}
//修改个人信息时也会有城市的修改，这里是设置系统城市
function setCity(){
    var cityMap={
        "江苏":["南京","镇江","苏州","无锡","常州","扬州","泰州","南通","盐城","淮安","宿迁","徐州","连云港"],
        "浙江":["杭州","宁波","温州","绍兴","嘉兴","湖州","金华","衢州","丽水","台州","舟山"],
        "上海":["黄埔","徐汇","长宁","静安","普陀","虹口","杨浦","浦东","闵行","宝山","嘉定","金山","松江","青浦","奉贤","崇明"]
    };
    $("#province").change(function(){
        $("#city").empty();
        var proName=$(this).val();
        var list=cityMap[proName];
        var $city=$("#city") ;
        for(var i = 0;i <list.length;i++){
            $city.append($("<option></option>").text(list[i]));
        }
    });
}
//编辑个人信息规范性检测
function editcheck(){
    $("#username").focusout(function(){
        if($("#username").val().length==0){
            //alert("姓名不能为空！");
            $("#username_div").html("姓名不能为空!");
            isEditFormCorrect1=0;
        }else if($("#username").val().length>20){
            $("#username_div").html("姓名字符不能大于20!");
            isEditFormCorrect1=0;
        }else{
            $("#username_div").html("");
            isEditFormCorrect1=1;
        }
    });

    $("#nickname").focusout(function(){
        if($("#nickname").val().length==0){
            //alert("姓名不能为空！");
            $("#nickname_div").html("昵称不能为空!");
            isEditFormCorrect2=0;
        }else if($("#nickname").val().length>20){
            $("#nickname_div").html("姓名字符不能大于20!");
            isEditFormCorrect2=0;
        }else{
            $("#nickname_div").html("");
            isEditFormCorrect2=1;
        }
    });
    $("#phonenum").focusout(function(){
        var zz=/^1[3578]\d{9}$/;
        if (!zz.exec($("#phonenum").val())) {
            //alert("手机号格式不正确！");
            $("#phonenum_div").html("手机号格式不正确!");
            isEditFormCorrect3=0;
        }else{
            $("#phonenum_div").html("");
            isEditFormCorrect3=1;
        }
    });
    $("#signature").focusout(function(){
        if($("#signature").val().length==0){
            //alert("姓名不能为空！");
            $("#signature_div").html("不能为空!");
            isEditFormCorrect2=0;
        }else if($("#signature").val().length>50){
            $("#signature_div").html("个性签名不能大于20!");
            isEditFormCorrect2=0;
        }else{
            $("#signature_div").html("");
            isEditFormCorrect2=1;
        }
    });
}
//修改个人头像
function changeHeadPortrait(){
    $("#mychange").click(function(){
        isSelectpic=0;//防止别的地方有选择好的图片，在此清零
        $("input[name='changefile']").each(function(){
            if($(this).val()!="") {
                isSelectpic = 1;
            }
        });
        if(isSelectpic==0){
            alert("请选择图片后再修改！");
        }else if(isSelectpic==1) {
            if (isOversize == 1) {
                isSelectpic=0;
                alert("请上传小于2M的图片后再修改！");
            } else if (isOversize == 0) {
                var option = {
                    url: "/updateUserHeadPortrait",
                    type: "post",
                    dataType: 'json',
                    beforeSend: function(request) {
                        request.setRequestHeader("myflag", "y");
                    },
                    success: function (data) {
                        if (data.msg == "success") {
                            setUserInfo();
                            isSelectpic=0;
                            isOversize=0;
                            alert("修改成功！");
                        } else {
                            alert("修改失败！");

                        }
                    }
                }
                $("#change_portrait").ajaxSubmit(option);
            }
        }
    });
}
//上传头像时文件大小检测
function filesize(ele){
    if(((ele.files[0].size).toFixed(2))>=(2*1024*1024)){
        isOversize=1;
        alert("请上传小于2M的图片");
    }else{
        isOversize=0;
    }
}
//修改密码时的密码规范性检测
function changePasswordCheck(){
    $("#origionalPassword").focusout(function(){
        $.ajax({
            url: "/getUserPassword",
            type: "POST",
            dataType: 'json',
            data: {
                userId:userId,
                userPassword:$("#origionalPassword").val()
            },
            beforeSend: function(request) {
                request.setRequestHeader("myflag", "y");
            },
            success: function (data) {
                if(data.msg=="success"){
                    $("#origionalPassword_div").html("");
                    isPasswordFormCorrect1=1;
                }else{
                    $("#origionalPassword_div").html("您输入的原密码错误!");
                    isPasswordFormCorrect1=0;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                /*错误信息处理*/
                alert("获取原密码失败！网络错误!");
            }
        });
    });
    $("#newPassword").focusout(function(){
        if($("#newPassword").val().length<6){
            //alert("您输入的密码少于6位！");
            $("#newPassword_div").html("您输入的密码少于6位!");
            isPasswordFormCorrect2=0;
        }else if($("#newPassword").val().length>20) {
            $("#newPassword_div").html("您输入的密码大于20位!");
            isPasswordFormCorrect2=0;
        }else{
            $("#newPassword_div").html("");
            isPasswordFormCorrect2=1;
        }
    });
    $("#repeatNewPassword").focusout(function(){
        if($("#repeatNewPassword").val()!=$("#newPassword").val()){
            //alert("您输入的密码少于6位！");
            $("#repeatNewPassword_div").html("重复输入密码错误!");
            isPasswordFormCorrect3=0;
        }else{
            $("#repeatNewPassword_div").html("");
            isPasswordFormCorrect3=1;
        }
    });
}
//修改密码
function changePassword(){
    $("#changePassword").click(function(){
        if(isPasswordFormCorrect1==1&&isPasswordFormCorrect2==1&&isPasswordFormCorrect3==1){
            $.ajax({
                url:"updateUserPassword",
                type:"POST",
                dataType:"json",
                data:{
                    userId:userId,
                    userPassword:$("#newPassword").val()
                },
                beforeSend: function(request) {
                    request.setRequestHeader("myflag", "y");
                },
                success:function(data){
                    if(data.msg=="success"){
                        alert("密码修改成功");
                        $("#origionalPassword").val("");
                        $("#newPassword").val("");
                        $("#repeatNewPassword").val("");
                        isPasswordFormCorrect1=0;
                        isPasswordFormCorrect2=0;
                        isPasswordFormCorrect3=0;
                    }else{
                        alert("密码修改失败！");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    /*错误信息处理*/
                    alert("密码修改失败！网络错误!");
                }
            });
        }else{
            alert("输入有误！请检查后提交修改");
        }
    });
}