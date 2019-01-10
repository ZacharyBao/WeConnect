/**
 * Created by BaoDong on 2017/2/6.
 */
//安全退出
function signoutsafely(){
    $("#signout").click(function(){
        $.ajax({
            url:"/signOutSafely",
            type:"POST",
            dataType:"json",
            beforeSend: function(request) {
                request.setRequestHeader("myflag", "y");
            },
            success:function(data){
                if(data.msg=="success")
                    window.location.href="/";
                else
                    alert("安全退出失败！");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                /*错误信息处理*/
                alert("网络错误!");
            }
        });
    });
}
