/**
 * Created by BaoDong on 2017/11/11.
 */
//删除好友
function deleteMyFriend() {
    $("#deleteFriend").click(function () {
        $.ajax({
            url: "/deleteFriends",
            type: "POST",
            dataType: "json",
            data: {
                from: userId,
                to: allFriendsInfoList[selectedObjection].userId
            },
            beforeSend: function (request) {
                request.setRequestHeader("myflag", "y");
            },
            success: function (data) {
                //alert(data[0].userName);
                if (data.msg == "success") {
                    alert("删除成功！")
                    $("#myModal_1").css("display", "none");
                    $("#in_chatMateName").empty();//删除好友之后将聊天框顶的好友昵称给置空
                    selectedObjection = null;//将选择的好友id置空，这样就不能发送消息在对应的聊天框
                    loadFriends();//重新更新好友列表
                    loadGroups();
                }
            }
        });
    });

}