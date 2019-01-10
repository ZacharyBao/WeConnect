package cn.kingofworld.entity;

import javax.persistence.*;

/**
 * Created by BaoDong on 2017/12/16.
 */
@Entity
@Table(name = "mygroup", schema = "weconnect", catalog = "")
public class MygroupEntity {
    private int groupNum;
    private String groupId;
    private String groupName;
    private String groupCreatorId;
    private String groupCreateTime;
    private String groupHeadPortrait;

    @Id
    @Column(name = "GroupNum")
    public int getGroupNum() {
        return groupNum;
    }

    public void setGroupNum(int groupNum) {
        this.groupNum = groupNum;
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
    @Column(name = "GroupName")
    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    @Basic
    @Column(name = "GroupCreatorId")
    public String getGroupCreatorId() {
        return groupCreatorId;
    }

    public void setGroupCreatorId(String groupCreatorId) {
        this.groupCreatorId = groupCreatorId;
    }

    @Basic
    @Column(name = "GroupCreateTime")
    public String getGroupCreateTime() {
        return groupCreateTime;
    }

    public void setGroupCreateTime(String groupCreateTime) {
        this.groupCreateTime = groupCreateTime;
    }

    @Basic
    @Column(name = "GroupHeadPortrait")
    public String getGroupHeadPortrait() {
        return groupHeadPortrait;
    }

    public void setGroupHeadPortrait(String groupHeadPortrait) {
        this.groupHeadPortrait = groupHeadPortrait;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MygroupEntity that = (MygroupEntity) o;

        if (groupNum != that.groupNum) return false;
        if (groupId != null ? !groupId.equals(that.groupId) : that.groupId != null) return false;
        if (groupName != null ? !groupName.equals(that.groupName) : that.groupName != null) return false;
        if (groupCreatorId != null ? !groupCreatorId.equals(that.groupCreatorId) : that.groupCreatorId != null)
            return false;
        if (groupCreateTime != null ? !groupCreateTime.equals(that.groupCreateTime) : that.groupCreateTime != null)
            return false;
        if (groupHeadPortrait != null ? !groupHeadPortrait.equals(that.groupHeadPortrait) : that.groupHeadPortrait != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = groupNum;
        result = 31 * result + (groupId != null ? groupId.hashCode() : 0);
        result = 31 * result + (groupName != null ? groupName.hashCode() : 0);
        result = 31 * result + (groupCreatorId != null ? groupCreatorId.hashCode() : 0);
        result = 31 * result + (groupCreateTime != null ? groupCreateTime.hashCode() : 0);
        result = 31 * result + (groupHeadPortrait != null ? groupHeadPortrait.hashCode() : 0);
        return result;
    }
}
