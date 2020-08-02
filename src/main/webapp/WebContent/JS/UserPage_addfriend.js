/**
 * Created by BaoDong on 2017/3/1.
 */
var searchInfoId;
var searchInfoNickName;
var searchInfoRegion;
var isFind = 0;//标记是否通过账号查找到好友
//查找好友
function findFriend() {
    $("#searchBtn").click(function () {
        var searchuserid = $("#searchInput").val();
        $.ajax({
            url: "/getUserById",
            type: "POST",
            dataType: "json",
            data: {
                id: searchuserid
            },
            beforeSend: function (request) {
                request.setRequestHeader("myflag", "y");
            },
            success: function (data) {
                searchInfoId = searchuserid;
                if (data[0].userConstellation != "null") {
                    searchInfoNickName = data[0].userNickName;
                    searchInfoRegion = data[0].userProvince + " " + data[0].userCity;
                    isFind = 1;
                    var content1 = '<tr> <td>账号：</td><td>' + searchInfoId + '</td></tr>';
                    var content2 = '<tr> <td>昵称：</td><td>' + searchInfoNickName + '</td></tr>';
                    var content3 = '<tr><td>地区：</td><td>' + searchInfoRegion + '</td></tr>';
                    $("#searchInfo").empty();
                    $("#searchInfo").append(content1 + content2 + content3);
                    $("#addBtn").css("background", "#3071A9");
                } else {
                    isFind = 0;
                    $("#searchInfo").empty();
                    $("#addBtn").css("background", "#e6e6e6");
                    $("#searchInfo").append("该账号不存在！");

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                /*错误信息处理*/
                alert("网络错误!");
            }
        });
    });
}

//添加好友
function addFriend() {
    $("#addBtn").click(function () {
            if (isFind == 1) {
                submitFriendRequest(searchInfoId)
            }
        }
    );
}

function submitFriendRequest(goalId) {
    $.ajax({
        url: "/sendFriendRequest",
        type: "POST",
        dataType: "json",
        data: {
            from: userId,
            to: goalId
        },
        beforeSend: function (request) {
            request.setRequestHeader("myflag", "y");
        },
        success: function (data) {
            if (data[0] == "success") {
                alert("好友请求发送成功！");
            } else if (data[0] == "added") {
                alert("已向该账号发送过请求！");
            } else if (data[0] == "friend") {
                alert("已经添加其为好友！");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("网络错误，发送失败！");
        }
    });
}