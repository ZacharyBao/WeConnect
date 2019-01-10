var isLoginFormatCorrect1=1;//标记登录表单里面各项数据格式是否正确
var isLoginFormatCorrect2=1;
$().ready(function(){
    checkLogin();
    btnlogin_click();
});


function checkLogin(){
    $("#userid_login").focusout(function(){
        if($("#userid_login").val().length==0){
            //alert("用户id不能为空！");
            isLoginFormatCorrect1=0;
        }else{
            isLoginFormatCorrect1=1;
        }
    });
    $("#password_login").focusout(function(){
        if($("#password_login").val().length==0){
            //alert("密码不能为空");
            isLoginFormatCorrect2=0;
        }else{
            isLoginFormatCorrect2=1;
        }
    });
}

function btnlogin_click(){
    $("#btnlogin").click(function(){

        if(isLoginFormatCorrect1==1&&isLoginFormatCorrect2==1){
            $("#userid_login").css("border-color","#fff");//进入if说明输入格式正确，将没有改变样式的input恢复正常
            $("#password_login").css("border-color","#fff");
            var url="/userLoginCheck";
            var myhref="/UserPage";
            myAjax(url,myhref);

        }else{
            if(isLoginFormatCorrect1==0) {
                $("#userid_login").css("border-color","red");
            }else{
                $("#userid_login").css("border-color","#fff");
            }
            if(isLoginFormatCorrect2==0) {
                $("#password_login").css("border-color","red");
            }else{
                $("#password_login").css("border-color","#fff");
            }
        }
    });
}

function myAjax(url,myhref){//通过Ajax进行跳转到对应的控制器，并通过判断之后跳转到特定的页面
    $.ajax({
        url:url,
        type:"POST",
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("myflag", "y");
        },
        data:{
            id : $("#userid_login").val(),
            psw:$("#password_login").val()
        },
        success:function(data){
            if(data.msg=="idW"){
                $("#userid_login").css("border-color","red");
            }else if(data.msg=="pswW"){
                $("#password_login").css("border-color","red");
            }else{
                //localStorage.setItem("id",$("#userid_login").val());//将这个用户id传到下个页面
                window.location.href =myhref;
                //$("#denglu").attr("action",myhref);
                //$("#denglu").submit();
            }
        }
    });
}