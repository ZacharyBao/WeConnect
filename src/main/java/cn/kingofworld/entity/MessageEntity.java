package cn.kingofworld.entity;

import javax.persistence.*;

@Entity
@Table(name = "message", schema = "weconnect", catalog = "")
public class MessageEntity {
    private int mNum;
    private String mSenderId;
    private String mReceiverId;
    private String mSendTime;
    private String mMsgText;

    @Id
    @Column(name = "MNum")
    public int getmNum() {
        return mNum;
    }

    public void setmNum(int mNum) {
        this.mNum = mNum;
    }

    @Basic
    @Column(name = "MSenderId")
    public String getmSenderId() {
        return mSenderId;
    }

    public void setmSenderId(String mSenderId) {
        this.mSenderId = mSenderId;
    }

    @Basic
    @Column(name = "MReceiverId")
    public String getmReceiverId() {
        return mReceiverId;
    }

    public void setmReceiverId(String mReceiverId) {
        this.mReceiverId = mReceiverId;
    }

    @Basic
    @Column(name = "MSendTime")
    public String getmSendTime() {
        return mSendTime;
    }

    public void setmSendTime(String mSendTime) {
        this.mSendTime = mSendTime;
    }

    @Basic
    @Column(name = "MMsgText")
    public String getmMsgText() {
        return mMsgText;
    }

    public void setmMsgText(String mMsgText) {
        this.mMsgText = mMsgText;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MessageEntity that = (MessageEntity) o;

        if (mNum != that.mNum) return false;
        if (mSenderId != null ? !mSenderId.equals(that.mSenderId) : that.mSenderId != null) return false;
        if (mReceiverId != null ? !mReceiverId.equals(that.mReceiverId) : that.mReceiverId != null) return false;
        if (mSendTime != null ? !mSendTime.equals(that.mSendTime) : that.mSendTime != null) return false;
        if (mMsgText != null ? !mMsgText.equals(that.mMsgText) : that.mMsgText != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = mNum;
        result = 31 * result + (mSenderId != null ? mSenderId.hashCode() : 0);
        result = 31 * result + (mReceiverId != null ? mReceiverId.hashCode() : 0);
        result = 31 * result + (mSendTime != null ? mSendTime.hashCode() : 0);
        result = 31 * result + (mMsgText != null ? mMsgText.hashCode() : 0);
        return result;
    }
}
