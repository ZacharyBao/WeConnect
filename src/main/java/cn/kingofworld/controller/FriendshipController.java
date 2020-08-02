package cn.kingofworld.controller;

import cn.kingofworld.dto.UserThree;
import cn.kingofworld.dto.UserTwo;
import cn.kingofworld.entity.FriendshipEntity;
import cn.kingofworld.entity.UserEntity;
import cn.kingofworld.service.FriendshipService;
import cn.kingofworld.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by BaoDong on 2017/3/1.
 */
@Controller
public class FriendshipController {
    @Resource
    private FriendshipService friendshipService;

    @Resource
    private UserService userService;

    @ResponseBody
    @RequestMapping("/sendFriendRequest")
    public List sendFriendRequest(String from, String to) {
        int flag = friendshipService.HasAddedTheAccount(from, to);
        List list = new ArrayList();
        if (flag == 0) {//判断好友请求是否已经发送过，没有，则发送，即插入到数据表中
            FriendshipEntity friendshipEntity = new FriendshipEntity();
            friendshipEntity.setfFromId(from);
            friendshipEntity.setfToId(to);
            friendshipEntity.setfIsFriend(0);
            SimpleDateFormat sdf = new SimpleDateFormat(" yyyy-MM-dd HH:mm:ss ");
            String str = sdf.format(new Date());
            friendshipEntity.setfAddOrDeleteTime(str);
            friendshipService.save(friendshipEntity);
            list.add("success");
        } else {
            if (flag == 1)
                list.add("added");
            else if (flag == 2) {
                list.add("friend");
            }
        }
        return list;
    }

    @ResponseBody
    @RequestMapping("/loadFriends")
    public List<UserThree> loadFriends(String id) {
        List list = friendshipService.getFriendsId(id);
        UserEntity userEntity;
        List<UserThree> userTwoList = new ArrayList<UserThree>();
        for (int i = 0; i < list.size(); i++) {
            userEntity = userService.get("userId", list.get(i));//得到用户对象
            UserThree userThree = new UserThree();
            userThree.setUserId(userEntity.getUserId());
            userThree.setUserNickName(userEntity.getUserNickName());
            userThree.setUserName(userEntity.getUserName());
            userThree.setUserGender(userEntity.getUserGender());
            userThree.setUserPhoneNum(userEntity.getUserPhoneNum());
            userThree.setUserSignature(userEntity.getUserSignature());
            userThree.setUserConstellation(userEntity.getUserConstellation());
            userThree.setUserHeadPortrait(userEntity.getUserHeadPortrait());
            userThree.setUserIsOnline(userEntity.getUserIsOnline());
            userThree.setUserHometown(userEntity.getUserProvince() + "" + userEntity.getUserCity());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            String str = sdf.format(userEntity.getUserBirthDay());
            userThree.setUserBirthDay(str);
            userTwoList.add(userThree);
        }
        return userTwoList;
    }

    @ResponseBody
    @RequestMapping("/loadOneFriend")
    public List<UserThree> loadOneFriend(String id) {
        UserEntity userEntity;
        List<UserThree> userTwoList = new ArrayList<UserThree>();
        userEntity = userService.get("userId", id);//得到用户对象
        UserThree userThree = new UserThree();
        userThree.setUserId(userEntity.getUserId());
        userThree.setUserNickName(userEntity.getUserNickName());
        userThree.setUserName(userEntity.getUserName());
        userThree.setUserGender(userEntity.getUserGender());
        userThree.setUserPhoneNum(userEntity.getUserPhoneNum());
        userThree.setUserSignature(userEntity.getUserSignature());
        userThree.setUserConstellation(userEntity.getUserConstellation());
        userThree.setUserHeadPortrait(userEntity.getUserHeadPortrait());
        userThree.setUserIsOnline(userEntity.getUserIsOnline());
        userThree.setUserHometown(userEntity.getUserProvince() + "" + userEntity.getUserCity());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String str = sdf.format(userEntity.getUserBirthDay());
        userThree.setUserBirthDay(str);
        userTwoList.add(userThree);
        return userTwoList;
    }

    @ResponseBody
    @RequestMapping("/deleteFriends")
    public String deleteFriends(String from, String to) {
        List<Integer> list;
        list = friendshipService.getFriendshipItemNum(from, to);
        FriendshipEntity friendshipEntity;
        int num;
        for (int i = 0; i < list.size(); i++) {
            num = list.get(i);
            friendshipEntity = friendshipService.get(num);//将好友关系表中的是否为好友标记字段改成0
            friendshipService.delete(friendshipEntity);
        }
        return "{\"msg\":\"success\"}";
    }

    @ResponseBody
    @RequestMapping("/findFriendRequest")//获取未受理的好友请求
    public List<UserTwo> findFriendRequest(String id) {
        List<String> list;
        List<UserTwo> listtwo = new ArrayList<UserTwo>();
        list = friendshipService.getFriendRequest(id);
        for (int i = 0; i < list.size(); i++) {
            UserTwo userTwo = new UserTwo();
            userTwo.setUserId(list.get(i));
            userTwo.setNickName(userService.get("userId", list.get(i)).getUserNickName());
            listtwo.add(userTwo);
        }
        return listtwo;
    }

    @ResponseBody
    @RequestMapping("/findApprovedFriendRequest")//获取受理的好友请求
    public List<UserTwo> findApprovedFriendRequest(String id) {
        List<UserTwo> listtwo = new ArrayList<UserTwo>();
        List<String> list;
        list = friendshipService.getApprovedFriendRequest(id);
        for (int i = 0; i < list.size(); i++) {
            UserTwo userTwo = new UserTwo();
            userTwo.setNickName(userService.get("userId", list.get(i)).getUserNickName());
            userTwo.setUserId(list.get(i));
            listtwo.add(userTwo);
        }
        return listtwo;
    }

    @ResponseBody
    @RequestMapping("/editFriendRequestStatus")//通过好友或者拒绝好友
    public String editFriendRequestStatus(String from, String to, int flag) {
        int itemNum = friendshipService.getFriendshipItemNumTwo(from, to).get(0);
        if (flag == 0) {//0就是拒绝
            friendshipService.delete(friendshipService.get(itemNum));
        } else if (flag == 1) {
            FriendshipEntity friendshipEntity;
            friendshipEntity = friendshipService.get(itemNum);
            friendshipEntity.setfIsFriend(2);//标记为1或者2都表示通过好友，只不过2这个标记可以用来反馈信息，比如某某已经通过你的好友请求
            friendshipService.update(friendshipEntity);
        } else if (flag == 2) {
            FriendshipEntity friendshipEntity;
            friendshipEntity = friendshipService.get(itemNum);
            friendshipEntity.setfIsFriend(1);
            friendshipService.update(friendshipEntity);
        }
        return "{\"msg\":\"success\"}";
    }
}
