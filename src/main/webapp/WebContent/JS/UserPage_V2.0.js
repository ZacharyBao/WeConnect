/**
 * Created by BaoDong on 2017/11/11.
 */

//用户信息大全
var userId;
var userNickName;
var userName;
var userGender;
var userBirthday;
var userPhoneNum;
var userProvince;
var userCity;
var userSignature;
var userConstellation;
var userHeadPortrait;

var previousDate = null;
$().ready(function () {
    setVerticalCenter();
    setUserInfo();
    bindEnter();
    click_showChatMateInfo();//friendinfo文件里
    click_sendbutton();
    showPersonInfo();//personalinfo文件里
    approveEdit();//personalinfo文件里
    savechange();//personalinfo文件里
    editcheck();//personalinfo文件里
    changePasswordCheck();//personalinfo文件里
    changePassword();//personalinfo文件里
    setInterval(receive_msg, 1500);
    signoutsafely();//signout文件里
    findFriend();//addfriend文件里
    addFriend();//addfriend文件里
    deleteMyFriend();//deletefriend文件里
    getSystemMsg();//systemmsg文件里
    searchFriendForCreatingGroup();//creategroup文件里
    reAddFriend();//creategroup文件里
    createGroup();//creategroup文件里
    createGroupCheck();//creategroup文件里
    searchFriendForFriendList();//friendlist文件里
    searchFriendForAddFriends();//groupinfo文件里面
    click_showGroupInfo();//groupinfo文件里面
    editCheckForGroup();//groupinfo文件里面
    cancelUploadAvatar();//groupinfo文件里面
    reAddFriend2();//groupinfo文件里面
    saveChangeForGroup();//groupinfo文件里面
    quitThisGroup();//groupinfo文件里面
    changeHeadPortrait();
    removeGroupMemberInfo();//groupinfo文件里面
});
//监听浏览器大小变化
$(window).resize(function () {
    setVerticalCenter();//实时让聊天窗口居中
});

//将聊天界面垂直居中
function setVerticalCenter() {
    var height = $(window).height();
    var paddingTop = (height - $("#content").height()) / 2;
    $("#copyright").css("height", paddingTop);
    $("#copyright").css("padding-top", paddingTop / 2);
    //alert($("#copyright").height());
    //$("#copyright").css("line-height",paddingTop);
    //$("#copyright").css("vertical-align","middle");
    $(document.body).css("padding-top", paddingTop);
}

//获取上个页面传下来的用户id，并且初始化用户信息
function setUserInfo() {
    //login_id=localStorage.getItem("id");//接收上个页面传下来的值
    var url = "/userIsLoginCheck";
    //alert(login_id);
    //alert($("#userid").val());
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader("myflag", "y");
        },
        success: function (data) {
            //alert(data[0].userName);
            if (data[0] == "failed") {
                window.location.href = "/";//没有登录跳回登录页面
            } else {
                userId = data[0];
                userNickName = data[1];
                userName = data[2];
                userGender = data[3];
                userBirthday = data[4];
                userPhoneNum = data[5];
                userProvince = data[6];
                userCity = data[7];
                userSignature = data[8];
                userConstellation = data[9];
                userHeadPortrait = data[10];
                $("#usernickname").html(data[1]);
                $("#myTouxiang").attr('src', userHeadPortrait);
                loadFriends();//得到用户id之后通过id到后台拉好友列表，该方法在friendlist里面
                loadGroups();
            }
        }
    });
}

//绑定textarea中的回车键发送消息
function bindEnter() {
    $("#in_textArea").focus(function () {
        $(document).keydown(function (event) {
            if (event.keyCode == 13) {
                $("#toSend").click();
                event.preventDefault();//不执行回车键的换行功能，避免光标出现在第二个行

            }
        });
    });
}

//发送消息点击事件
function click_sendbutton() {
    $("#toSend").click(function () {
        var str = $("#in_textArea").val();
        str = htmlEncodeJQ(str);
        if (selectedObjection != null) {//聊天对象已选择
            if (/[^\s]+/.test(str)) {//判断输入框是否全是空白字符
                if (isSelectedObjectionFromGroup == 1) {//聊天对象是群组的话....
                    var data = '<li><img src="' + userHeadPortrait + '" class="touxiang_sender"/>'
                        + '<span class="send_msg">' + str + '</span> </li>';
                    var ccid = "chatcontent" + "group" + allGroupsInfoList[selectedObjection].groupId;
                    var divid = "in_right_mid" + "group" + allGroupsInfoList[selectedObjection].groupId;
                    $("#" + ccid).append(getChatTime(ccid) + data);
                    $("#in_textArea").val('');
                    setTop("group" + allGroupsInfoList[selectedObjection].groupId);
                    $("#" + divid).scrollTop($("#" + ccid).height());//每次发送新消息，就将滚动条设置在最底部
                    str = "group," + allGroupsInfoList[selectedObjection].groupId + "," + userId + "," + str;

                } else {//聊天对象是好友的时候
                    var data = '<li><img src="' + userHeadPortrait + '" class="touxiang_sender"/>'
                        + '<span class="send_msg">' + str + '</span> </li>';
                    var ccid = "chatcontent" + allFriendsInfoList[selectedObjection].userId;
                    var divid = "in_right_mid" + allFriendsInfoList[selectedObjection].userId;
                    $("#" + ccid).append(getChatTime(ccid) + data);
                    $("#in_textArea").val('');
                    setTop(allFriendsInfoList[selectedObjection].userId);
                    $("#" + divid).scrollTop($("#" + ccid).height());//每次发送新消息，就将滚动条设置在最底部
                    str = "say," + allFriendsInfoList[selectedObjection].userId + "," + userId + "," + str;
                }

                $.ajax({
                    url: "/setSendMsg",
                    type: "POST",
                    dataType: "json",
                    beforeSend: function (request) {
                        request.setRequestHeader("myflag", "y");
                    },
                    data: {
                        msg: str
                    }
                });
            } else {
                //alert("不能发送空消息！");
            }
        } else {//聊天对象未选择
            alert("请选择聊天对象");
        }


    });
}

//防止html注入，进行转义
function htmlEncodeJQ(str) {
    return $('<span/>').text(str).html();
}

//解析转义过的html代码，这个方法留着备用
function htmlDecodeJQ(str) {
    return $('<span/>').html(str).text();
}

//返回接收或者发送消息的时间
function getChatTime(ulId) {
    var min;
    var hour;
    var preTime;
    var myDate = new Date();
    min = myDate.getMinutes();
    hour = myDate.getHours();
    var htmlStr;
    //alert($("#"+ulId+" .time").last().html())//这里要注意“.time”之前一定要有空格，不然语法错误
    if ($("#" + ulId + " .time").last().length == 0) {//当前聊天窗口中尚没有time类标签
        if (min < 10) {
            min = '0' + min;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }
        htmlStr = '<li><span class="time">' + hour + ':' + min + '</span></li>';
    } else {
        preTime = $("#" + ulId + " .time").last().html();//这里要注意“.time”之前一定要有空格，不然语法错误
        if (min < 10) {
            min = '0' + min;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }
        var currentTime = hour + ':' + min;
        if (currentTime != preTime) {
            htmlStr = '<li><span class="time">' + hour + ':' + min + '</span></li>';
        } else {
            htmlStr = '';
        }
    }
    return htmlStr;
}

function getOfflineMsgChatTime(msgTime, fromid) {
    var preTime;
    var htmlStr;
    //alert($("#"+ulId+" .time").last().html())//这里要注意“.time”之前一定要有空格，不然语法错误
    if ($("#" + fromid + " .time").last().length == 0) {//当前聊天窗口中尚没有time类标签
        htmlStr = '<li><span class="time">' + msgTime + '</span></li>';
    } else {
        preTime = $("#" + fromid + " .time").last().html();//这里要注意“.time”之前一定要有空格，不然语法错误
        if (msgTime != preTime) {
            htmlStr = '<li><span class="time">' + msgTime + '</span></li>';
        } else {
            htmlStr = '';
        }
    }
    return htmlStr;
}

//接收消息
function receive_msg() {
    $.ajax({
        url: "/setReceiveMsg",
        type: "POST",
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader("myflag", "y");
        },
        success: function (data) {
            if (data[0].msgFrom != "0") {
                for (j = 0; j < data.length; j++) {
                    //alert(data[j].msgFrom.split(",").length);
                    if (data[j].msgFrom.split(",").length == 1) {
                        receiveMsgFromFriends(data[j]);
                    } else if (data[j].msgFrom.split(",").length == 2) {
                        receiveMsgFromGroups(data[j]);
                    } else if (data[j].msgFrom.split(",").length == 3) {
                        loadOneGroup(data[j].msgContent);
                    }
                }
            }
        }
    });
}

function receiveMsgFromFriends(data) {
    var fromid = "chatcontent" + data.msgFrom;
    var divid = "in_right_mid" + data.msgFrom;
    var msg = data.msgContent;
    var friendid = data.msgFrom;
    var msgTime = data.msgTime;
    var friendposition;
    var flag = 1;
    for (i = 0; i < allFriendsInfoList.length; i++) {
        if (friendid == allFriendsInfoList[i].userId) {
            friendposition = i;
            break;
        }
    }
    if (selectedObjection != null) {
        if (friendposition == selectedObjection && isSelectedObjectionFromGroup == 0) {//多了这个条件是为了确保当前选择的窗口是好友窗口
            //如果收到的消息来自当前聊天对象，就不用请求对方的头像.不用判断这个聊天窗口是否被创建，提升性能
            //在最起初没有选择聊天对象时收到消息，selectedObjection是null，所以不满足if，跳转到else
            //alert(data[j].msgFrom.split(",").length);
            var item = '<li><img src="' + allFriendsInfoList[selectedObjection].userHeadPortrait + '" class="touxiang_receiver"/>'
                + '<span class="receive_msg">' + msg + '</span> </li>';
            if (msgTime == "0") {
                $("#" + fromid).append(getChatTime(fromid) + item);
            } else {
                $("#" + fromid).append(getOfflineMsgChatTime(msgTime, fromid) + item);
            }

            $("#" + divid).scrollTop($("#" + fromid).height());
            setTop(friendid);
        } else {
            for (i = 0; i < chatcontentList.length; i++) {
                if (chatcontentList[i] == fromid) {//ul list里面如果有，就不需要创建
                    flag = 0;
                    break;
                }
            }
            if (flag == 1) {//接收消息时新建聊天窗口
                chatcontentList.push(fromid);
                in_right_midList.push(divid);
                var ul = '<div class="in_right_mid" id="' + divid + '"><ul class="chatcontent" id="' + fromid + '"></ul></div>';
                $("#right_mid").append(ul);
                $("#" + divid).css("z-index", "-1");
            }
            var item = '<li><img src="' + allFriendsInfoList[friendposition].userHeadPortrait + '" class="touxiang_receiver"/>'
                + '<span class="receive_msg">' + msg + '</span> </li>';
            if (msgTime == "0") {
                $("#" + fromid).append(getChatTime(fromid) + item);
            } else {
                $("#" + fromid).append(getOfflineMsgChatTime(msgTime, fromid) + item);
            }
            $("#" + divid).scrollTop($("#" + fromid).height());
            setTop(friendid);
        }
    } else {
        console.log("好友null");
        chatcontentList.push(fromid);
        in_right_midList.push(divid);
        var ul = '<div class="in_right_mid" id="' + divid + '"><ul class="chatcontent" id="' + fromid + '"></ul></div>';
        $("#right_mid").append(ul);
        click_showFriendItem_for_Receivemsg(friendid, divid);
        var item = '<li><img src="' + allFriendsInfoList[friendposition].userHeadPortrait + '" class="touxiang_receiver"/>'
            + '<span class="receive_msg">' + msg + '</span> </li>';
        if (msgTime == "0") {
            $("#" + fromid).append(getChatTime(fromid) + item);
        } else {
            $("#" + fromid).append(getOfflineMsgChatTime(msgTime, fromid) + item);
        }
        $("#" + divid).scrollTop($("#" + fromid).height());
        setTop(friendid);
    }
}

function receiveMsgFromGroups(data) {
    //在此记录一下遇到的一个bug，bug原因在于，同一个小组里面的成员不一定互为好友，所以在allFriendsInfoList这个表中不存在非好友的群组成员信息
    //所以应该每次获取头像从allGroupsInfoList当中获得，这样就能获得所有群组成员的信息
    var msg = data.msgContent;
    var msgTime = data.msgTime;
    var friendid = data.msgFrom.split(",")[1];
    var groupid = data.msgFrom.split(",")[0];
    var fromid = "chatcontent" + "group" + groupid;//聊天窗口Id
    var divid = "in_right_mid" + "group" + groupid;//聊天窗口Id
    var friendposition;
    var groupposition;
    var flag = 1;
    if (friendid != userId) {//在接收群组消息时，本人在群组里发送的消息，不需要接收
        for (i = 0; i < allGroupsInfoList.length; i++) {
            if (groupid == allGroupsInfoList[i].groupId) {
                groupposition = i;
                break;
            }
        }
        for (i = 0; i < allGroupsInfoList[groupposition].groupUserIdList.length; i++) {
            if (friendid == allGroupsInfoList[groupposition].groupUserIdList[i]) {
                friendposition = i;
                break;
            }
        }
        if (selectedObjection != null) {
            if (groupposition == selectedObjection && isSelectedObjectionFromGroup == 1) {//后面的条件是为了确保当前所选择的窗口是群组窗口
                var item = '<li><img src="' + allGroupsInfoList[groupposition].groupUserHeadPortraitList[friendposition] + '" class="touxiang_receiver"/>'
                    + '<span class="receive_msg">' + msg + '</span> </li>';
                if (msgTime == "0") {
                    $("#" + fromid).append(getChatTime(fromid) + item);
                } else {
                    $("#" + fromid).append(getOfflineMsgChatTime(msgTime, fromid) + item);
                }
                $("#" + divid).scrollTop($("#" + fromid).height());
                setTop("group" + groupid);
            } else {
                for (i = 0; i < chatcontentList.length; i++) {
                    if (chatcontentList[i] == fromid) {//ul list里面如果有，就不需要创建
                        flag = 0;
                        break;
                    }
                }
                if (flag == 1) {//接收消息时新建聊天窗口
                    chatcontentList.push(fromid);
                    in_right_midList.push(divid);
                    var ul = '<div class="in_right_mid" id="' + divid + '"><ul class="chatcontent" id="' + fromid + '"></ul></div>';
                    $("#right_mid").append(ul);
                    $("#" + divid).css("z-index", "-1");
                }
                var item = '<li><img src="' + allGroupsInfoList[groupposition].groupUserHeadPortraitList[friendposition] + '" class="touxiang_receiver"/>'
                    + '<span class="receive_msg">' + msg + '</span> </li>';
                if (msgTime == "0") {//说明是在线消息
                    $("#" + fromid).append(getChatTime(fromid) + item);
                } else {
                    $("#" + fromid).append(getOfflineMsgChatTime(msgTime, fromid) + item);
                }
                $("#" + divid).scrollTop($("#" + fromid).height());
                setTop("group" + groupid);
            }
        } else {
            chatcontentList.push(fromid);
            in_right_midList.push(divid);
            var ul = '<div class="in_right_mid" id="' + divid + '"><ul class="chatcontent" id="' + fromid + '"></ul></div>';
            $("#right_mid").append(ul);
            click_showGroupItem_for_Receivemsg(groupid, divid);
            var item = '<li><img src="' + allGroupsInfoList[groupposition].groupUserHeadPortraitList[friendposition] + '" class="touxiang_receiver"/>'
                + '<span class="receive_msg">' + msg + '</span> </li>';
            if (msgTime == "0") {
                $("#" + fromid).append(getChatTime(fromid) + item);
            } else {
                $("#" + fromid).append(getOfflineMsgChatTime(msgTime, fromid) + item);
            }
            $("#" + divid).scrollTop($("#" + fromid).height());
            setTop("group" + groupid);
        }
    }
}

//好友来新消息，就将这个好友从好友列表置顶
function setTop(id) {//将好友置顶
    var $oP = $("#" + id).parents("li");
    if ($oP.index() != 0) {
        $oP.fadeOut().fadeIn();
        $("#friendlist").prepend($oP);
    }
}




