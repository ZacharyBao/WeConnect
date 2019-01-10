package cn.kingofworld.entity;

import javax.persistence.*;

/**
 * Created by BaoDong on 2017/1/28.
 */
@Entity
@Table(name = "friendship", schema = "weconnect", catalog = "")
public class FriendshipEntity {
    private int fNum;
    private String fFromId;
    private String fToId;
    private String fAddOrDeleteTime;
    private Integer fIsFriend;

    @Id
    @Column(name = "FNum", nullable = false)
    public int getfNum() {
        return fNum;
    }

    public void setfNum(int fNum) {
        this.fNum = fNum;
    }

    @Basic
    @Column(name = "FFromId", nullable = true, length = 30)
    public String getfFromId() {
        return fFromId;
    }

    public void setfFromId(String fFromId) {
        this.fFromId = fFromId;
    }

    @Basic
    @Column(name = "FToId", nullable = true, length = 30)
    public String getfToId() {
        return fToId;
    }

    public void setfToId(String fToId) {
        this.fToId = fToId;
    }

    @Basic
    @Column(name = "FAddOrDeleteTime", nullable = true, length = 20)
    public String getfAddOrDeleteTime() {
        return fAddOrDeleteTime;
    }

    public void setfAddOrDeleteTime(String fAddOrDeleteTime) {
        this.fAddOrDeleteTime = fAddOrDeleteTime;
    }

    @Basic
    @Column(name = "FIsFriend", nullable = true)
    public Integer getfIsFriend() {
        return fIsFriend;
    }

    public void setfIsFriend(Integer fIsFriend) {
        this.fIsFriend = fIsFriend;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FriendshipEntity that = (FriendshipEntity) o;

        if (fNum != that.fNum) return false;
        if (fFromId != null ? !fFromId.equals(that.fFromId) : that.fFromId != null) return false;
        if (fToId != null ? !fToId.equals(that.fToId) : that.fToId != null) return false;
        if (fAddOrDeleteTime != null ? !fAddOrDeleteTime.equals(that.fAddOrDeleteTime) : that.fAddOrDeleteTime != null)
            return false;
        if (fIsFriend != null ? !fIsFriend.equals(that.fIsFriend) : that.fIsFriend != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = fNum;
        result = 31 * result + (fFromId != null ? fFromId.hashCode() : 0);
        result = 31 * result + (fToId != null ? fToId.hashCode() : 0);
        result = 31 * result + (fAddOrDeleteTime != null ? fAddOrDeleteTime.hashCode() : 0);
        result = 31 * result + (fIsFriend != null ? fIsFriend.hashCode() : 0);
        return result;
    }
}
