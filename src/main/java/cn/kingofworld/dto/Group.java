package cn.kingofworld.dto;

import java.util.List;

/**
 * Created by BaoDong on 2017/11/30.
 */
public class Group {
    private String groupId;
    private String groupName;
    private String groupCreatorld;
    private String groupCreateTime;
    private String groupHeadPortrait;
    private List<String> groupUserIdList;
    private List<String> groupUserRemarkList;
    private List<String> groupUserJoinTimeList;
    private List<String> groupUserHeadPortraitList;
    private List<String> groupUserHometownList;
    private List<String> groupUserGenderList;

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupCreatorld() {
        return groupCreatorld;
    }

    public void setGroupCreatorld(String groupCreatorld) {
        this.groupCreatorld = groupCreatorld;
    }

    public String getGroupCreateTime() {
        return groupCreateTime;
    }

    public void setGroupCreateTime(String groupCreateTime) {
        this.groupCreateTime = groupCreateTime;
    }

    public String getGroupHeadPortrait() {
        return groupHeadPortrait;
    }

    public void setGroupHeadPortrait(String groupHeadPortrait) {
        this.groupHeadPortrait = groupHeadPortrait;
    }

    public List<String> getGroupUserIdList() {
        return groupUserIdList;
    }

    public void setGroupUserIdList(List<String> groupUserIdList) {
        this.groupUserIdList = groupUserIdList;
    }

    public List<String> getGroupUserRemarkList() {
        return groupUserRemarkList;
    }

    public void setGroupUserRemarkList(List<String> groupUserRemarkList) {
        this.groupUserRemarkList = groupUserRemarkList;
    }

    public List<String> getGroupUserJoinTimeList() {
        return groupUserJoinTimeList;
    }

    public void setGroupUserJoinTimeList(List<String> groupUserJoinTimeList) {
        this.groupUserJoinTimeList = groupUserJoinTimeList;
    }

    public List<String> getGroupUserHeadPortraitList() {
        return groupUserHeadPortraitList;
    }

    public void setGroupUserHeadPortraitList(List<String> groupUserHeadPortraitList) {
        this.groupUserHeadPortraitList = groupUserHeadPortraitList;
    }

    public List<String> getGroupUserHometownList() {
        return groupUserHometownList;
    }

    public void setGroupUserHometownList(List<String> groupUserHometownList) {
        this.groupUserHometownList = groupUserHometownList;
    }

    public List<String> getGroupUserGenderList() {
        return groupUserGenderList;
    }

    public void setGroupUserGenderList(List<String> groupUserGenderList) {
        this.groupUserGenderList = groupUserGenderList;
    }
}
