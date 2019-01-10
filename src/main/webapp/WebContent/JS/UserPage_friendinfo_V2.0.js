/**
 * Created by BaoDong on 2017/11/11.
 */
var selectedObjection=null;//选中的聊天对象的id
var chatcontentList=[];//存放聊天窗口中的ul的id
var in_right_midList=[];//存放聊天窗口中的div的id
//点击即可确定好友聊天对象,并且创建聊天窗口
function click_showFriendItem(obj){
    //alert(obj.id);
    var selectedUserId;
    //这里之所以要判断obj类型，是由于这个方法不仅仅在点击好友条目时会调用（此时传进去一个对象），而且在给群组成员页面，点击消息图标时也会调用，这是就传进去一个number或者string
    if(typeof obj=="string"){
        selectedUserId=obj;
    }else if(typeof obj=="number") {
        selectedUserId=obj;
    }else{
        selectedUserId=obj.id;//通过div的id获取好友的id
    }
    var flag=1;//标记用户对于这个好友的聊天窗口是否已经创建
    for(i=0;i<allFriendsInfoList.length;i++){
        if(selectedUserId==allFriendsInfoList[i].userId){
            selectedObjection=i;
            isSelectedObjectionFromGroup=0;
            $("#in_chatMateName").attr("data-target","#myModal_1");//当选中好友时，重新跳出模态框
            break;
        }
    }
    var str1='<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>';//符号
    $("#in_chatMateName").html(allFriendsInfoList[selectedObjection].userNickName+str1);//聊天是聊天顶框显示好友昵称
    for(i=0;i<chatcontentList.length;i++){
        if(chatcontentList[i]=="chatcontent"+selectedUserId){//ul在list里面如果是否存在
            flag=0;
            break;
        }
    }
    if(flag==1){//flag为1说明ul的id在list里面找不到，则新建聊天窗口
        chatcontentList.push("chatcontent"+selectedUserId);//将ul的id加入List
        in_right_midList.push("in_right_mid"+selectedUserId);//将div的id加入List
        //新建聊天窗口
        var chuangkou='<div class="in_right_mid" id="'+'in_right_mid'+selectedUserId+'"><ul class="chatcontent" id="'+'chatcontent'+selectedUserId+'"></ul></div>';
        $("#right_mid").append(chuangkou);
        flag=0;
    }
    if(flag==0){
        var ccid="in_right_mid"+selectedUserId;
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
//在最开始还没有选中任何好友，此时收到好友信息，那就自动显示出聊天窗口，不需要点击
function click_showFriendItem_for_Receivemsg(friendid,divid){
    var str=divid;
    for(i=0;i<allFriendsInfoList.length;i++){
        if(friendid==allFriendsInfoList[i].userId){
            selectedObjection=i;
            isSelectedObjectionFromGroup=0;
            $("#in_chatMateName").attr("data-target","#myModal_1");//当选中好友时，重新跳出模态框
            break;
        }
    }
    var str1='<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>';//符号
    $("#in_chatMateName").html(allFriendsInfoList[selectedObjection].userNickName+str1);//聊天是聊天顶框显示好友昵称
    $("#" + str).css("z-index", "1");
}
//显示好友详细信息或者群组成员信息
function click_showChatMateInfo(){
    $("#in_chatMateName").click(function(){
        if(isSelectedObjectionFromGroup==0) {
            $("#friend_userid").text(allFriendsInfoList[selectedObjection].userId);
            $("#friend_username").val(allFriendsInfoList[selectedObjection].userName);
            $("#friend_nickname").val(allFriendsInfoList[selectedObjection].userNickName);
            $("#friend_usergender").text(allFriendsInfoList[selectedObjection].userGender);
            $("#friend_birthday").text(allFriendsInfoList[selectedObjection].userBirthDay);
            $("#friend_constellation").text(allFriendsInfoList[selectedObjection].userConstellation);
            $("#friend_phonenum").text(allFriendsInfoList[selectedObjection].userPhoneNum);
            $("#friend_hometown").text(allFriendsInfoList[selectedObjection].userHometown);
            if (allFriendsInfoList[selectedObjection].userSignature == null) {
                $("#friend_signature").val("");
            }else{
                $("#friend_signature").val(allFriendsInfoList[selectedObjection].userSignature);
            }
        }else if(isSelectedObjectionFromGroup==1){
            $("#groupMemberDiv").slideToggle();
        }

    });
}
