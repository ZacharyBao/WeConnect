package cn.kingofworld.dto;

/**
 * Created by BaoDong on 2017/3/3.
 */
//用于发送好友请求时，显示的一些信息
public class UserTwo {
    private String userId;
    private String nickName;
    private String userHeadPortrait;
    private String userSignature;
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }


    public String getUserHeadPortrait() {
        return userHeadPortrait;
    }

    public void setUserHeadPortrait(String userHeadPortrait) {
        this.userHeadPortrait = userHeadPortrait;
    }

    public String getUserSignature() {
        return userSignature;
    }

    public void setUserSignature(String userSignature) {
        this.userSignature = userSignature;
    }
}
