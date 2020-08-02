/**
 * Created by BaoDong on 2017/11/11.
 */
var allFriendsInfoList;
var allGroupsInfoList;

//加载好友列表
function loadFriends() {
    $.ajax({
        url: "/loadFriends",
        type: "POST",
        dataType: "json",
        async: false,//这里需要同步，需要按顺序执行
        data: {
            id: userId
        },
        beforeSend: function (request) {
            request.setRequestHeader("myflag", "y");
        },
        success: function (data) {
            $("#friendlist").empty();
            allFriendsInfoList = data;
            for (var i = 0; i < data.length; i++) {
                var fid = data[i].userId;
                var fname = data[i].userNickName;
                var fsig = data[i].userSignature;
                var fhp = data[i].userHeadPortrait;
                var content1 = '<li><div  class="showFriendItem" id="' + fid + '" onclick="click_showFriendItem(this)">';
                var content2 = '<div class="in_showFriendItem"> <div class="friend_touxiang"> <img src="' + fhp + '" class="touxiang"/> </div>';
                if (fsig == null)//个性签名为空则赋值空格，否则页面上就会显示null
                    fsig = "";
                var content3 = '<div class="friend_brief"> <div class="friend_name">' + fname + '</div> <div class="friend_signature">' + fsig + '</div> </div> </div> </div> </li>';
                $("#friendlist").append(content1 + content2 + content3);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("网络错误，载入好友失败！");
        }
    });
}

//在好友列表当中加载一个好友item
function loadOneFriend(newFriendId) {
    $.ajax({
        url: "/loadOneFriend",
        type: "POST",
        dataType: "json",
        async: false,//这里需要同步，需要按顺序执行
        data: {
            id: newFriendId
        },
        beforeSend: function (request) {
            request.setRequestHeader("myflag", "y");
        },
        success: function (data) {
            allFriendsInfoList.push(data[0]);
            var fid = data[0].userId;
            var fname = data[0].userNickName;
            var fsig = data[0].userSignature;
            var fhp = data[0].userHeadPortrait;
            var content1 = '<li><div  class="showFriendItem" id="' + fid + '" onclick="click_showFriendItem(this)">';
            var content2 = '<div class="in_showFriendItem"> <div class="friend_touxiang"> <img src="' + fhp + '" class="touxiang"/> </div>';
            if (fsig == null)//个性签名为空则赋值空格，否则页面上就会显示null
                fsig = "";
            var content3 = '<div class="friend_brief"> <div class="friend_name">' + fname + '</div> <div class="friend_signature">' + fsig + '</div> </div> </div> </div> </li>';
            $("#friendlist").append(content1 + content2 + content3);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("网络错误，载入好友失败！");
        }
    });
}

//加载群组列表
function loadGroups() {
    $.ajax({
        url: "/loadGroups",
        type: "POST",
        dataType: "json",
        async: false,//这里需要设置同步，需要按顺序执行下来
        data: {
            id: userId
        },
        beforeSend: function (request) {
            request.setRequestHeader("myflag", "y");
        },
        success: function (data) {
            allGroupsInfoList = data;
            for (var i = 0; i < data.length; i++) {
                var gid = data[i].groupId;
                var gname = data[i].groupName;
                var ghp = data[i].groupHeadPortrait;
                //为了避免群组id和好友id重复，群组id值设置在group_id里面，群组Item的id以“group+群id的形式”
                //这样设置群组item的id原因是便于之后使用“setTop”方法将群组置顶
                var content1 = '<li><div  class="showFriendItem" id="' + "group" + gid + '" group_id="' + gid + '" onclick="click_showGroupItem(this)">';
                var content2 = '<div class="in_showFriendItem"> <div class="friend_touxiang"> <img src="' + ghp + '" class="touxiang"/> </div>';
                var content3 = '<div class="friend_brief"> <div class="friend_name">' + gname + '</div> <div class="friend_signature"></div> </div> </div> </div> </li>';
                $("#friendlist").append(content1 + content2 + content3);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("网络错误，载入群组失败！");
        }
    });
}

//加载一个群组到好友列表当中
function loadOneGroup(newGroupId) {
    $.ajax({
        url: "/loadOneGroup",
        type: "POST",
        dataType: "json",
        async: false,//这里需要设置同步，需要按顺序执行下来
        data: {
            id: newGroupId
        },
        beforeSend: function (request) {
            request.setRequestHeader("myflag", "y");
        },
        success: function (data) {
            allGroupsInfoList.push(data[0]);
            var gid = data[0].groupId;
            var gname = data[0].groupName;
            var ghp = data[0].groupHeadPortrait;
            //为了避免群组id和好友id重复，群组id值设置在group_id里面，群组Item的id以“group+群id的形式”
            //这样设置群组item的id原因是便于之后使用“setTop”方法将群组置顶
            var content1 = '<li><div  class="showFriendItem" id="' + "group" + gid + '" group_id="' + gid + '" onclick="click_showGroupItem(this)">';
            var content2 = '<div class="in_showFriendItem"> <div class="friend_touxiang"> <img src="' + ghp + '" class="touxiang"/> </div>';
            var content3 = '<div class="friend_brief"> <div class="friend_name">' + gname + '</div> <div class="friend_signature"></div> </div> </div> </div> </li>';
            $("#friendlist").append(content1 + content2 + content3);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("网络错误，载入群组失败！");
        }
    });
}


//智能提示框，用于好友列表中搜索好友，创建群组时搜索需要添加的好友
function searchFriend(searchInput, searchPage, item, searchTouxiang, searchImgTouxiang, searchItemUsername, typeFlag) {
    var groupList;//存放满足条件的小组id
    var list;//存放满足条件的好友id
    var scrollPosition = 0;
    $("#" + searchInput).keyup(function (evt) {
        var k = window.event ? evt.keyCode : evt.which;
        var keyword = $("#" + searchInput).val();
        if (keyword != "" && k != 38 && k != 40 && k != 13) {
            $("#" + searchPage).empty();
            $("#" + searchPage).css("display", "");
            list = [];//清空列表ps：只有在输入字符的时候才需要清空，进行上下键操作不能清空
            groupList = []//清空
            //所有用户昵称包含关键字的用户信息加入requiredFriendInfoList
            for (var i = 0; i < allFriendsInfoList.length; i++) {
                if (allFriendsInfoList[i].userNickName.indexOf(keyword) >= 0) {
                    list.push(allFriendsInfoList[i]);
                }
            }
            if (typeFlag == 2) {//标记为2说明是搜索好友，而并非创建小组时的搜索
                for (var t = 0; t < allGroupsInfoList.length; t++) {
                    if (allGroupsInfoList[t].groupName.indexOf(keyword) >= 0) {
                        groupList.push(allGroupsInfoList[t]);
                    }
                }
            }
            //将所有满足条件的用户展现出来
            if (list.length > 0) {
                var content = '<div id="friendTipBar" class="' + item + '" style="height:248px;height:30px;line-height: 30px;vertical-align: middle;text-align: left;background: #393c43;font-size:1.2em;color:white;">好友</div>';
                $("#" + searchPage).append(content);
            }
            for (var j = 0; j < list.length; j++) {
                var content1 = '<div class="' + item + '" name="friend" id="' + list[j].userId + '" ><div class="' + searchTouxiang + '">';
                var content2 = '<img src="' + list[j].userHeadPortrait + '" class="' + searchImgTouxiang + '"/></div>';
                var content3 = '<div class="' + searchItemUsername + '">' + list[j].userNickName + '</div></div>'
                $("#" + searchPage).append(content1 + content2 + content3);
            }
            if (typeFlag == 2) {
                if (groupList.length > 0) {
                    var content7 = '<div id="groupTipBar" class="' + item + '" style="height:248px;height:30px;line-height: 30px;vertical-align: middle;text-align: left;background: #393c43;font-size:1.2em;color:white;">群组</div>';
                    $("#" + searchPage).append(content7);
                }
                for (var s = 0; s < groupList.length; s++) {//添加name属性，用来区别小组和好友,同时小组的id信息存储在group_id这个属性值里面
                    var content4 = '<div class="' + item + '" name="group" group_id="' + groupList[s].groupId + '" ><div class="' + searchTouxiang + '">';
                    var content5 = '<img src="' + groupList[s].groupHeadPortrait + '" class="' + searchImgTouxiang + '"/></div>';
                    var content6 = '<div class="' + searchItemUsername + '">' + groupList[s].groupName + '</div></div>'
                    $("#" + searchPage).append(content4 + content5 + content6);
                }
            }
            //第二个条目默认hover
            $("." + item + ":first").next().addClass("hover");
            //找不到匹配
            if (list.length == 0 && groupList.length == 0) {
                var content = '<div style="height:248px;height:30px;line-height: 30px;vertical-align: middle;text-align: center;background: #393c43;font-size:1.2em;color:white;">找不到匹配结果</div>';
                $("#" + searchPage).append(content);
            }
            //鼠标移动事件
            //mouseMoving(item);
            //鼠标点击事件
            mouseClick(item, searchInput, searchPage, typeFlag);

        } else if (k == 38) {//上箭头
            if ($('.' + item + '.hover').prev().attr("id") == "friendTipBar") {

                //什么都不做
            } else if ($('.' + item + '.hover').prev().attr("id") == "groupTipBar") {
                if (list.length != 0) {
                    $('.' + item + '.hover').prev().prev().addClass("hover");
                    $('.' + item + '.hover').next().next().removeClass("hover");
                    //$('#' + searchInput).val($('.' + item + '.hover').text());
                    $('#' + searchInput).val($('.' + item + '.hover').text());
                    controlScrollPosition(item, 1, scrollPosition, searchPage);
                    scrollPosition = $("#" + searchPage).scrollTop();
                } else {//当满足条件的好友没有时，只有满足条件的群组，此时的groupTipBar就会出现在第一个item
                    //什么都不做
                }
            } else {
                $('.' + item + '.hover').prev().addClass("hover");
                $('.' + item + '.hover').next().removeClass("hover");
                //$('#' + searchInput).val($('.' + item + '.hover').text());
                $('#' + searchInput).val($('.' + item + '.hover').text());
                controlScrollPosition(item, 1, scrollPosition, searchPage);
                scrollPosition = $("#" + searchPage).scrollTop();
            }
        } else if (k == 40) {//下箭头
            if ($('.' + item + '.hover').next().attr("id") == "groupTipBar") {
                $('.' + item + '.hover').next().next().addClass("hover");
                $('.' + item + '.hover').prev().prev().removeClass("hover");
                //$('#' + searchInput).val($('.' + item + '.hover').text());
                $('#' + searchInput).val($('.' + item + '.hover').text());
                controlScrollPosition(item, 2, scrollPosition, searchPage);
                scrollPosition = $("#" + searchPage).scrollTop();
            } else if ($('.' + item + '.hover').next().length > 0) {//如果接下来的元素存在
                $('.' + item + '.hover').next().addClass("hover");
                $('.' + item + '.hover').prev().removeClass("hover");
                //$('#' + searchInput).val($('.' + item + '.hover').text());
                $('#' + searchInput).val($('.' + item + '.hover').text());
                controlScrollPosition(item, 2, scrollPosition, searchPage);
                scrollPosition = $("#" + searchPage).scrollTop();
            } else {//不存在则什么都不做

            }
            //alert($('.searchItem.hover').attr('id'));
        } else if (k == 13) {//回车
            //alert($('.'+item+'.hover').attr("id"));
            if (typeFlag == 1) {//创建群组
                $("#" + searchInput).val("");
                addFriendHeadPortrait($('.' + item + '.hover').attr("id"));
                //alert(targetFriendIdList);
            } else if (typeFlag == 2) {//搜索好有列表，包括群组
                //alert($('.'+item+'.hover'));
                if ($('.' + item + '.hover').attr('name') == "friend") {
                    $("#" + searchInput).val("");
                    click_showFriendItem($('.' + item + '.hover').get(0));//传进去的对象是js对象，要将jquery对象传进去
                } else if ($('.' + item + '.hover').attr('name') == "group") {
                    $("#" + searchInput).val("");
                    click_showGroupItem($('.' + item + '.hover').get(0));
                }
            } else if (typeFlag == 3) {//在群组信息中邀请好友
                $("#" + searchInput).val("");
                addFriendHeadPortraitTwo($('.' + item + '.hover').attr("id"));
            }
            $("#" + searchPage).empty();//清空并关闭智能提示框
            $("#" + searchPage).css("display", "none");
            scrollPosition = 0;
        } else {
            $("#" + searchPage).empty();
            $("#" + searchPage).css("display", "none");
            scrollPosition = 0;
        }
    });
}

//鼠标移动事件，用于智能提示框,现在并没有使用
function mouseMoving(item) {
    //鼠标移动事件，这里的双方法时鼠标移进移出分别执行的方法
    $("." + item).hover(function () {
        if ($(this).attr("id") != "groupTipBar" && $(this).attr("id") != "friendTipBar") {//这两个item不需要有hover
            $("." + item).removeClass("hover");
            $(this).addClass("hover");
        } else {
            //什么都不做
        }

    }, function () {
        //鼠标移出时，鼠标最后所在的标签hover状态不消失，因为消失了就没有选中的条目，就无法进行上下箭头的操作
        //$(this).removeClass("hover");
        //$("#searchresult").css("display", "none");
    });
}

//鼠标点击事件，用于智能提示框
function mouseClick(item, searchInput, searchPage, typeFlag) {
    $('.' + item).click(function () {
        //alert($('.'+item+'.hover').attr("id"));
        if ($(this).attr("id") != "groupTipBar" && $(this).attr("id") != "friendTipBar") {//这两个item禁止点击
            if (typeFlag == 1) {
                $("#" + searchInput).val("");
                addFriendHeadPortrait($(this).attr("id"));
                //alert(targetFriendIdList);
            } else if (typeFlag == 2) {
                if ($(this).attr('name') == "friend") {
                    $("#" + searchInput).val("");
                    click_showFriendItem($(this).get(0));//传进去的对象是js对象，要将jquery对象传进去
                } else if ($(this).attr('name') == "group") {
                    $("#" + searchInput).val("");
                    click_showGroupItem($(this).get(0));
                }
            } else if (typeFlag == 3) {
                $("#" + searchInput).val("");
                addFriendHeadPortraitTwo($(this).attr("id"));
            }
            //$('#'+searchInput).val($('.'+item+'.hover').text());
            $("#" + searchPage).css("display", "none");
            //alert($('.searchItem.hover').attr('id'));
        } else {
            //什么都不做
        }
    });
}

//实时控制智能提示框的滚动位置，当使用上下方向键的时候
function controlScrollPosition(item, type, scrollPosition, searchPage) {
    var currentPosition;
    if (type == 1) {//up键
        if ($('.' + item + '.hover').position().top < 0) {
            $("#" + searchPage).scrollTop(scrollPosition);
        } else if ($('.' + item + '.hover').position().top <= 44) {
            currentPosition = $("#searchPage").scrollTop();
            $("#" + searchPage).scrollTop(currentPosition - 44);
        } else if ($('.' + item + '.hover').position().top > 256) {
            $("#" + searchPage).scrollTop(scrollPosition);
        }
    } else {//down键
        if ($('.' + item + '.hover').position().top > 280) {
            $("#" + searchPage).scrollTop(scrollPosition);
        } else if ($('.' + item + '.hover').position().top >= 212) {
            currentPosition = $("#searchPage").scrollTop();
            $("#" + searchPage).scrollTop(currentPosition + 44);
        } else if ($('.' + item + '.hover').position().top < 0) {
            $("#" + searchPage).scrollTop(scrollPosition);
        }
    }
}

//好友列表中搜索好友所用的智能提示框
function searchFriendForFriendList() {
    var searchInput = "search";
    var searchPage = "searchPage";
    var item = "searchItem_2";
    var searchTouxiang = "searchTouxiang_2";
    var searchImgTouxiang = "searchImgTouxiang_2";
    var searchItemUsername = "searchItemUsername_2";
    searchFriend(searchInput, searchPage, item, searchTouxiang, searchImgTouxiang, searchItemUsername, 2);
}