/**
 * Created by BaoDong on 2017/12/8.
 */
var isSelectedObjectionFromGroup=0;//标记当前聊天的对象是否是群组
var targetFriendIdList2=[];
var targetFriendNickNameList2=[];
var isGroupNameFormCorrect;
var selectedGroupMemberId;//目前选择的群成员Id
//点击确定群组聊天对象并创建群组
function click_showGroupItem(obj) {
    var selectedGroupId=obj.getAttribute("group_id");
    var flag=1;//标记用户对于这个好友的聊天窗口是否已经创建
    for(i=0;i<allGroupsInfoList.length;i++){
        if(selectedGroupId==allGroupsInfoList[i].groupId){
            selectedObjection=i;
            isSelectedObjectionFromGroup=1;
            $("#in_chatMateName").attr("data-target","");//当选中群组时，不需要跳出模态框
            break;
        }
    }
    //设置RightTop,初始化群成员信息
    initialGroupMemberInfo();
    //创建聊天窗口
    for(i=0;i<chatcontentList.length;i++){
        if(chatcontentList[i]=="chatcontent"+"group"+selectedGroupId){//ul在list里面如果是否存在,这里加了group作为显示这个窗口是群组窗口的标记
            flag=0;
            break;
        }
    }
    if(flag==1){//flag为1说明ul的id在list里面找不到，则新建聊天窗口
        chatcontentList.push("chatcontent"+"group"+selectedGroupId);//将ul的id加入List
        in_right_midList.push("in_right_mid"+"group"+selectedGroupId);//将div的id加入List
        //新建聊天窗口
        var chuangkou='<div class="in_right_mid" id="'+'in_right_mid'+'group'+selectedGroupId+'"><ul class="chatcontent" id="'+'chatcontent'+'group'+selectedGroupId+'"></ul></div>';
        $("#right_mid").append(chuangkou);
        flag=0;
    }
    if(flag==0){
        var ccid="in_right_mid"+"group"+selectedGroupId;
        for(i=0;i<in_right_midList.length;i++){//由于聊天窗口可能被创建了很多个，所以每次要把选中的聊天对象所对应的聊天窗口的z-index值赋为1其他的-1，这样便能显示特定的聊天窗口
            if(in_right_midList[i]==ccid){
                $("#"+ccid).css("z-index","1");
            }else{
                $("#"+in_right_midList[i]).css("z-index","-1");
            }
        }
    }
    $("#in_textArea").focus();//使得输入框获得焦点
}
//初始化群组成员信息
function initialGroupMemberInfo(){
    var str1='<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>';//符号
    var str2='<div id="groupMemberDiv" style="display: none"></div>';//groupMemberDiv刚刚添加进去是隐藏的，这个div就是用来存放初始化好的群成员Item
    $("#in_chatMateName").html(allGroupsInfoList[selectedObjection].groupName+str1+str2);//聊天是聊天顶框显示好友昵称
    for(i=0;i<allGroupsInfoList[selectedObjection].groupUserHeadPortraitList.length;i++){
        if(i==0){//在最开始将添加好友的item和退出群组的item添加进去
            var str3='<div class="groupMemberItem"><div class="groupMemberAvatar" data-toggle="modal" data-target="#myModal_9"id="inviteMyFriend">';
            var str4='<img src="WebContent/bgpic/add.png" class="groupMemberImgAvatar"></div>';
            var str5='<div class="groupMemberName"></div></div>';
            $("#groupMemberDiv").append(str3+str4+str5);
            var str3='<div class="groupMemberItem"><div class="groupMemberAvatar" data-toggle="modal" data-target="#myModal_10">';//这个div不需要id，因为它的作用就是弹出模态框
            var str4='<img src="WebContent/bgpic/out.png" class="groupMemberImgAvatar"></div>';
            var str5='<div class="groupMemberName"></div></div>';
            $("#groupMemberDiv").append(str3+str4+str5);
        }
        var str3='<div class="groupMemberItem"><div class="groupMemberAvatar" data-id="'+allGroupsInfoList[selectedObjection].groupUserIdList[i]+'" onclick="clickShowGroupMemberInfo(this)">';
        var str4='<img src="'+allGroupsInfoList[selectedObjection].groupUserHeadPortraitList[i]+'" class="groupMemberImgAvatar"></div>';
        var str5='<div class="groupMemberName">'+allGroupsInfoList[selectedObjection].groupUserRemarkList[i]+'</div></div>';
        $("#groupMemberDiv").append(str3+str4+str5);
    }
}



//在最开始还没有选中任何好友，此时收到好友信息，那就自动显示出聊天窗口，不需要点击
function click_showGroupItem_for_Receivemsg(groupid,divid){
    var str=divid;
    for(i=0;i<allGroupsInfoList.length;i++){
        if(groupid==allGroupsInfoList[i].groupId){
            selectedObjection=i;
            isSelectedObjectionFromGroup=1;
            $("#in_chatMateName").attr("data-target","");//当选中群组时，让模态框消失
            break;
        }
    }
    var str1='<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>';//符号
    $("#in_chatMateName").html(allGroupsInfoList[selectedObjection].groupName+str1);//聊天是聊天顶框显示好友昵称
    $("#" + str).css("z-index", "1");
    initialGroupMemberInfo();
}

//点击显示群组信息和邀请好友入群
function click_showGroupInfo(){
    $("#in_chatMateName").on("click","#inviteMyFriend",function(){//绑定还未存在的元素的点击事件，这里绑定inviteMyFriend点击事件是为了加载数据到模态框
        $("#editGroupId").val(allGroupsInfoList[selectedObjection].groupId);
        $("#editGroupName").val(allGroupsInfoList[selectedObjection].groupName);
        $("#editCreatorId").val(allGroupsInfoList[selectedObjection].groupCreatorld);
        $("#editCreateTime").val(allGroupsInfoList[selectedObjection].groupCreateTime);
        $("#editGroupId").attr("readonly","readonly");//这么多属性只有群组名称可以更改
        $("#editCreatorId").attr("readonly","readonly");
        $("#editCreateTime").attr("readonly","readonly");
        isGroupNameFormCorrect=1;
        isOversize=0;
        isSelectpic=0;
    });
}
//修改群组信息时，对被修改的字段进行规范性检测
function editCheckForGroup(){
    $("#editGroupName").focusout(function(){
        if($("#editGroupName").val().length==0){
            $("#editGroupName_div").html("名称不能为空");
            isGroupNameFormCorrect=0;
        }else if($("#editGroupName").val().length>10){
            $("#editGroupName_div").html("名称不能大于10个字符");
            isGroupNameFormCorrect=0;
        }else{
            $("#editGroupName_div").html("");
            isGroupNameFormCorrect=1;
        }
    });
    $("#editGroupHeadportrait").on("change",function(){//这里如果使用focusout对于谷歌浏览器奏效，safri和火狐不奏效
        isSelectpic=0;
        $("input[name='editGroupHeadportrait']").each(function(){
            if($(this).val()!="") {
                isSelectpic = 1;
            }
            if(isOversize==1){
                $("#editGroupHeadportrait_div").html("请选择小于2M的头像");
            }else if(isOversize==0){
                $("#editGroupHeadportrait_div").html("");
            }
        });
    });
}

//用于邀请时搜索好友所用的智能提示框
function searchFriendForAddFriends(){
    var searchInput="editInviteFriend";
    var searchPage="editSearchResult";
    var item="searchItem";
    var searchTouxiang="searchTouxiang";
    var searchImgTouxiang="searchImgTouxiang";
    var searchItemUsername="searchItemUsername";
    searchFriend(searchInput,searchPage,item,searchTouxiang,searchImgTouxiang,searchItemUsername,3);
}
//邀请新的好友时，添加好友到群组成员列表中，并且控制好友头像在页面显示
function addFriendHeadPortraitTwo(id){
    var avatar;
    var flag=1;
    var content;
    for(var i=0;i<allGroupsInfoList[selectedObjection].groupUserIdList.length;i++){
        if(id==allGroupsInfoList[selectedObjection].groupUserIdList[i]){
            flag=2;
        }
    }
    for(var j=0;j<targetFriendIdList2.length;j++){
        if(id==targetFriendIdList2[j]){
            flag=0;
            break;
        }
    }
    if(flag==0){
        alert("该好友已经添加！");
    }else if(flag==2){
        alert("该好友已经在群组里！");
    }else if(flag==1) {
        for(var k=0;k<allFriendsInfoList.length;k++){
            if(id==allFriendsInfoList[k].userId){
                targetFriendIdList2.push(id);
                targetFriendNickNameList2.push(allFriendsInfoList[k].userNickName);
                avatar=allFriendsInfoList[k].userHeadPortrait;
                break;
            }
        }
        if(avatar!=null) {
            content = '<div class="addedTouxiang"><img src="' + avatar + '" class="addedImgTouxiang"/></div>';
            $("#addedFriend2").append(content);
        }
    }
}
//取消更改群组头像操作
function cancelUploadAvatar(){
    $("#clearFile").click(function(){
        $("#editGroupHeadportrait").val("");//清空选择的图片
        isOversize=0;
        $("#editGroupHeadportrait_div").html("");
    });
}

//重新添加群组好友
function reAddFriend2(){
    $("#clearAddedFriend2").click(function(){
        targetFriendIdList2=[];
        targetFriendNickNameList2=[];
        $("#addedFriend2").empty();
    });
}
//保存修改过的群组信息
function saveChangeForGroup(){
    $("#saveEditedGroup").click(function(){
        if(isOversize==0&&isGroupNameFormCorrect==1){
            var option = {
                url: "/saveEditGroupInfo",
                type: "post",
                dataType: 'json',
                traditional: true,//传统方式序列化数据
                data: {
                    groupMemberIdList: targetFriendIdList2,
                    groupMemberNickNameList: targetFriendNickNameList2
                },
                beforeSend: function(request) {
                    request.setRequestHeader("myflag", "y");
                },
                success: function (data) {
                    if (data.msg == "success") {
                        isOversize = 1;
                        isSelectpic = 0;
                        $("#myModal_9").css("display", "none");
                        $("#editGroupHeadportrait").val("");//清空选择的图片
                        targetFriendIdList2 = [];
                        targetFriendNickNameList2 = [];
                        $("#addedFriend2").empty();//清空好友头像
                        alert("修改成功");
                        //$("#zhuce").attr("action","/UserPage");//这里可以直接跳转，session已经创建好了在后台
                        //$("#zhuce").submit();
                    } else {
                        alert("修改失败");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    /*错误信息处理*/
                    alert("网络错误，修改失败！");
                },
                waitMsg: '正在处理数据....'
            };
            $("#editGroupInfo").ajaxSubmit(option);
        }
    });
}
//退出这个群组
function quitThisGroup(){
    $("#quitGroup").click(function(){
        $.ajax({
            url:"/quitGroup",
            type:"POST",
            dataType:"json",
            data:{
              userId:userId,
              groupId:allGroupsInfoList[selectedObjection].groupId
            },
            beforeSend: function(request) {
                request.setRequestHeader("myflag", "y");
            },
            success:function (data) {
                if(data.msg=="success"){
                    selectedObjection=null;
                    isSelectedObjectionFromGroup=0;
                    $("#myModal_10").css("display", "none");
                    loadFriends();
                    loadGroups();
                    alert("退出成功！");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                /*错误信息处理*/
                alert("网络错误，退出失败！");
            },
        });
    });
}
//点击群成员头像即可显示群成员信息
function clickShowGroupMemberInfo(obj){
    var getEvent = function(){//获取event事件
        return window.event || arguments.callee.caller.arguments[0];
    };
    var e=getEvent();
    e.stopPropagation();//js阻止事件冒泡，由于这个元素是在一个执行了toggle方法的父div里面，
    // 点击完这个元素就会触发父元素的点击事件，这样的话父元素由于触发了点击事件就会消失了
    selectedGroupMemberId=$(obj).attr("data-id");
    //alert(selectedGroupMemberId);
    var $groupMemberInfo = $('#groupMemberInfo');
    var pageX = e.pageX,
        pageY = e.pageY;
    var groupMemberPosition;//标记目前点击的群成员的id在groupMemberIdList中的位置
    //alert($tips.length)
    if (!$groupMemberInfo.length) {//这个是用来判断$groupMemberInfo对象当前的个数
        $groupMemberInfo = $('<div id="groupMemberInfo">' +
            '<img id="groupMemberInfoAvatar"/>' +
            '<div id="groupMemberInfoOne">' +
            '<div style="height:35px;width:200px;margin-bottom:5px;background: white">' +
            '<div id="groupMemberInfoName"></div>' +
            '<div id="groupMemberInfoGenderIcon"><img id="groupMemberInfoGenderIconImg"/></div>' +
            '<img id="groupMemberStatusIcon" onclick=""/>' +
            '</div>' +
            '<div id="groupMemberInfoTwo"></div>' +
            '</div></div>');
        $("body").append($groupMemberInfo);
    }
    $groupMemberInfo.css({
        top: pageY,
        left: pageX
    });
    //通过获取的群成员id锁定其在groupUserIdList中的位置
    for(i=0;i<allGroupsInfoList[selectedObjection].groupUserIdList.length;i++){
        if(allGroupsInfoList[selectedObjection].groupUserIdList[i]==selectedGroupMemberId){
            groupMemberPosition=i;
            break;
        }

    }
    $("#groupMemberInfoAvatar").attr("src",allGroupsInfoList[selectedObjection].groupUserHeadPortraitList[groupMemberPosition]);
    var memberName=allGroupsInfoList[selectedObjection].groupUserRemarkList[groupMemberPosition];
    var memberGender=allGroupsInfoList[selectedObjection].groupUserGenderList[groupMemberPosition];
    var memberHome=allGroupsInfoList[selectedObjection].groupUserHometownList[groupMemberPosition];
    var memberId=selectedGroupMemberId;
    $("#groupMemberInfoName").html(memberName);
    $("#groupMemberInfoTwo").html("地区:"+memberHome);
    //确定男女图标
    if(memberGender=="男"){
        $("#groupMemberInfoGenderIconImg").attr("src","WebContent/bgpic/m.png");
    }else{
        $("#groupMemberInfoGenderIconImg").attr("src","WebContent/bgpic/fm.png");
    }
    //确定可否发消息状态的图标
    if(judgeIsFriend(memberId)){
        $("#groupMemberStatusIcon").attr("src","WebContent/bgpic/msgIcon.png");
        $("#groupMemberStatusIcon").attr("onclick","click_showFriendItem("+memberId+");");
    }else{
        $("#groupMemberStatusIcon").attr("src","WebContent/bgpic/plus.png");
        $("#groupMemberStatusIcon").attr("onclick","submitFriendRequest("+memberId+");");
    }

}

//判断群里的某个成员是否和自己是好友
function judgeIsFriend(id) {
    for(var i=0;i<allFriendsInfoList.length;i++){
        if(allFriendsInfoList[i].userId==id){
            return true;
        }
    }
    return false;
}
//移除群成员信息展示框
function removeGroupMemberInfo(){
    $(document).on(
        "click",function(e){
            var src=e.target;
            if(src.className&&src.className=="groupMemberAvatar"){
                return false;
            }else{
                $("#groupMemberInfo").remove();
            }
        }
    );

}