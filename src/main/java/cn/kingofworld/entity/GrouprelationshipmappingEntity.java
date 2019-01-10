package cn.kingofworld.entity;

import javax.persistence.*;

/**
 * Created by BaoDong on 2017/11/18.
 */
@Entity
@Table(name = "grouprelationshipmapping", schema = "weconnect", catalog = "")
public class GrouprelationshipmappingEntity {
    private int groupRelationshipItemNum;
    private String groupId;
    private String userId;
    private String userRemark;
    private String userJoinTime;

    @Id
    @Column(name = "GroupRelationshipItemNum")
    public int getGroupRelationshipItemNum() {
        return groupRelationshipItemNum;
    }

    public void setGroupRelationshipItemNum(int groupRelationshipItemNum) {
        this.groupRelationshipItemNum = groupRelationshipItemNum;
    }

    @Basic
    @Column(name = "GroupId")
    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    @Basic
    @Column(name = "UserId")
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "UserRemark")
    public String getUserRemark() {
        return userRemark;
    }

    public void setUserRemark(String userRemark) {
        this.userRemark = userRemark;
    }

    @Basic
    @Column(name = "UserJoinTime")
    public String getUserJoinTime() {
        return userJoinTime;
    }

    public void setUserJoinTime(String userJoinTime) {
        this.userJoinTime = userJoinTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GrouprelationshipmappingEntity that = (GrouprelationshipmappingEntity) o;

        if (groupRelationshipItemNum != that.groupRelationshipItemNum) return false;
        if (groupId != null ? !groupId.equals(that.groupId) : that.groupId != null) return false;
        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;
        if (userRemark != null ? !userRemark.equals(that.userRemark) : that.userRemark != null) return false;
        if (userJoinTime != null ? !userJoinTime.equals(that.userJoinTime) : that.userJoinTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = groupRelationshipItemNum;
        result = 31 * result + (groupId != null ? groupId.hashCode() : 0);
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (userRemark != null ? userRemark.hashCode() : 0);
        result = 31 * result + (userJoinTime != null ? userJoinTime.hashCode() : 0);
        return result;
    }
}
