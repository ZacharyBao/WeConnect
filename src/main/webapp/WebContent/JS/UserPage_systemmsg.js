/**
 * Created by BaoDong on 2017/3/3.
 */
//获取系统消息，系统消息包括好友请求，同意添加好友反馈，
function getSystemMsg(){
    $("#prepareSystemMsg").click(function(){
        $("#systemMsg").empty();
        var flag1=0;
        var flag2=0;
        $.ajax({
            url: "/findFriendRequest",
            type: "POST",
            dataType: "json",
            async:false,
            data:{
                id:userId
            },
            beforeSend: function(request) {
                request.setRequestHeader("myflag", "y");
            },
            success: function (data) {
                if(data.length==0)
                    flag1=1;
                for(var i=0;i<data.length;i++){
                    var content1='<tr id="'+data[i].userId+'"> <td style="width:150px">'+data[i].nickName+'</td> <td style="width:120px">&nbsp;请求添加你为好友</td>';
                    var content2='<td style="width:33px;"> <button type="button" id="'+'approve,'+data[i].userId+'"  class="btn btn-primary" onclick="editFriendRequestStatus(this,1)">同意</button></td>';
                    var content3='<td style="width:33px;"> <button type="button" id="'+'decline,'+data[i].userId+'"  class="btn btn-danger" onclick="editFriendRequestStatus(this,0)">拒绝</button></td> </tr>';
                    $("#systemMsg").append(content1+content2+content3);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                /*错误信息处理*/
                alert("网络错误!");
            }
        });

        $.ajax({
            url: "/findApprovedFriendRequest",
            type: "POST",
            dataType: "json",
            async:false,
            data:{
                id:userId
            },
            beforeSend: function(request) {
                request.setRequestHeader("myflag", "y");
            },
            success: function (data) {
                if(data.length==0)
                    flag2=1;
                for(var i=0;i<data.length;i++){
                    var content1='<tr id="'+data[i].userId+'"> <td style="width:150px">'+data[i].nickName+'</td> <td style="width:120px">&nbsp;通过了你的请求</td>';
                    var content3='<td style="width:33px;"> <button type="button" id="'+'sure,'+data[i].userId+'"  class="btn btn-primary" onclick="editFriendRequestStatus(this,2)">确定</button></td> </tr>';
                    $("#systemMsg").append(content1+content3);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                /*错误信息处理*/
                alert("网络错误!");
            }
        });
        if(flag1==1&&flag2==1){
            var content='<tr><td>没有新消息</td></tr>';
            $("#systemMsg").append(content);
        }


    });

}
//处理添加好友请求
function editFriendRequestStatus(obj,flag){
    var id=obj.id;
    var arr=id.split(',');
    var from;
    var to;
    if(flag==2){//确认添加
        from=userId;
        to=arr[1];
    }else{
        from=arr[1];
        to=userId;
    }
    $.ajax({
        url: "/editFriendRequestStatus",
        type: "POST",
        dataType: "json",
        data:{
            from:from,
            to:to,
            flag:flag
        },
        beforeSend: function(request) {
            request.setRequestHeader("myflag", "y");
        },
        success: function (data) {
            if(data.msg=="success"){
                $("#"+arr[1]).remove();//移除消息
                loadOneFriend(arr[1]);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("网络错误!");
        }
    });
}
