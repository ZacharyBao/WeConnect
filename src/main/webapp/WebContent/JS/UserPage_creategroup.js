/**
 * Created by BaoDong on 2017/11/18.
 */
var targetFriendIdList = [];
var targetFriendNickNameList = [];
var isGroupFormCorrect1 = 0;
var isGroupFormCorrect2 = 0;
var isGroupIdRepeated = 1;

//创建群组时，添加好友到群组成员列表中，并且控制好友头像在页面显示
function addFriendHeadPortrait(id) {
    var avatar;
    var flag = 1;
    var content;
    if (targetFriendIdList.length == 0) {
        targetFriendIdList.push(userId);//首先将创建者信息加入
        targetFriendNickNameList.push(userNickName);
    }
    for (var j = 0; j < targetFriendIdList.length; j++) {
        if (id == targetFriendIdList[j]) {
            flag = 0;
            break;
        }
    }
    if (flag == 0) {
        alert("该好友已经添加！");
    } else if (flag == 1) {
        for (var k = 0; k < allFriendsInfoList.length; k++) {
            if (id == allFriendsInfoList[k].userId) {
                targetFriendIdList.push(id);
                targetFriendNickNameList.push(allFriendsInfoList[k].userNickName);
                avatar = allFriendsInfoList[k].userHeadPortrait;
                break;
            }
        }
        if (avatar != null) {//防止当搜索不到好友时，按下回车，则添加
            content = '<div class="addedTouxiang"><img src="' + avatar + '" class="addedImgTouxiang"/></div>';
            $("#addedFriend").append(content);
        }
    }
}

//用于创建群组时搜索好友所用的智能提示框
function searchFriendForCreatingGroup() {
    var searchInput = "inviteFriend";
    var searchPage = "searchResult";
    var item = "searchItem";
    var searchTouxiang = "searchTouxiang";
    var searchImgTouxiang = "searchImgTouxiang";
    var searchItemUsername = "searchItemUsername";
    searchFriend(searchInput, searchPage, item, searchTouxiang, searchImgTouxiang, searchItemUsername, 1);
}

//重新添加群组好友
function reAddFriend() {
    $("#clearAddedFriend").click(function () {
        targetFriendIdList = [];
        targetFriendNickNameList = [];
        targetFriendIdList.push(userId);//首先将创建者信息加入
        targetFriendNickNameList.push(userNickName);
        $("#addedFriend").empty();
    });
}

//创建群组时核对群组各个信息是否符合规范
function createGroupCheck() {
    $("#groupId").focusout(function () {
        if ($("#groupId").val().length < 8) {
            $("#groupId_div").html("id不能小于8个字符");
            isGroupFormCorrect1 = 0;
        } else if ($("#groupId").val().length > 17) {
            $("#groupId_div").html("id不能大于17个字符");
            isGroupFormCorrect1 = 0;
        } else {
            $("#groupId_div").html("");
            isGroupFormCorrect1 = 1;
        }
        $.ajax({
            url: "/checkRepeatedId_group",
            type: "POST",
            dataType: "json",
            data: {
                groupId: $("#groupId").val()
            },
            beforeSend: function (request) {
                request.setRequestHeader("myflag", "y");
            },
            success: function (data) {
                if (data.msg == "success") {
                    $("#groupId_div").html("该用户名已存在");
                    isGroupIdRepeated = 1;
                } else if (data.msg == "failed") {
                    var str = $("#groupId_div").html();//为什么要这样，因为ajax是异步的，当其发现这个账号数据库不存在相同的，就会将
                    $("#groupId_div").html(str + "");//groupId_div里面不符合字符个数规范的提醒给清空
                    isGroupIdRepeated = 0;
                }

            }
        });
    });
    $("#groupName").focusout(function () {
        if ($("#groupName").val().length == 0) {
            $("#groupName_div").html("名称不能为空");
            isGroupFormCorrect2 = 0;
        } else if ($("#groupName").val().length > 10) {
            $("#groupName_div").html("名称不能大于10个字符");
            isGroupFormCorrect2 = 0;
        } else {
            $("#groupName_div").html("");
            isGroupFormCorrect2 = 1;
        }


    });
    $("#groupHeadportrait").on("change", function () {//这里如果使用focusout对于谷歌浏览器奏效，safri和火狐不奏效
        isSelectpic = 0;
        $("input[name='groupHeadportrait']").each(function () {
            if ($(this).val() != "") {
                isSelectpic = 1;
            }
            if (isSelectpic == 0) {
                $("#groupHeadportrait_div").html("请选择头像");
            } else if (isSelectpic == 1) {
                if (isOversize == 1) {
                    $("#groupHeadportrait_div").html("请选择小于2M的头像");
                    isSelectpic = 0;
                } else if (isOversize == 0) {
                    $("#groupHeadportrait_div").html("");
                }
            }

        });
    });

}

//创建群组
function createGroup() {
    $("#createGroup").click(function () {
        alert("isGroupFormCorrect1：" + isGroupFormCorrect1 + "isGroupFormCorrect2：" + isGroupFormCorrect2 + "isSelectpic：" + isSelectpic + "isOversize：" + isOversize + "isGroupIdRepeated：" + isGroupIdRepeated);
        if (isGroupFormCorrect1 == 1 && isGroupFormCorrect2 == 1 && isSelectpic == 1 && isOversize == 0 && isGroupIdRepeated == 0) {
            alert("okko");
            var option = {
                url: "/saveGroupInfo",
                type: "post",
                dataType: 'json',
                traditional: true,//传统方式序列化数据
                data: {
                    groupCreator: userId,
                    groupMemberIdList: targetFriendIdList,
                    groupMemberNickNameList: targetFriendNickNameList
                },
                beforeSend: function (request) {
                    request.setRequestHeader("myflag", "y");
                },
                success: function (data) {
                    if (data.msg == "success") {
                        isSelectpic = 0;
                        isOversize = 1;
                        isGroupIdRepeated = 1;
                        isGroupFormCorrect1 = 0;
                        isGroupFormCorrect2 = 0;
                        $("#myModal_7").css("display", "none");
                        $("#groupId").html("");
                        $("#groupName").html("");
                        $("#groupHeadportrait").val("");
                        targetFriendIdList = [];
                        targetFriendNickNameList = [];
                        $("#addedFriend").empty();
                        alert("创建成功llll");
                        //$("#zhuce").attr("action","/UserPage");//这里可以直接跳转，session已经创建好了在后台
                        //$("#zhuce").submit();
                    } else {
                        alert("创建失败");
                    }
                },
                waitMsg: '正在处理数据....'
            };
            $("#registerGroup").ajaxSubmit(option);
        } else {
            alert("else")
        }
    });
}
