package cn.kingofworld.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by BaoDong on 2017/1/28.
 */
@Entity
@Table(name = "user", schema = "weconnect", catalog = "")
public class UserEntity {
    private int userNum;
    private String userId;
    private String userPassword;
    private String userNickName;
    private String userName;
    private String userGender;
    private Date userBirthDay;
    private String userPhoneNum;
    private String userProvince;
    private String userCity;
    private String userSignature;
    private String userConstellation;
    private String userHeadPortrait;
    private Integer userIsOnline;

    public void setUserBirthDay(java.sql.Date userBirthDay) {
        this.userBirthDay = userBirthDay;
    }

    @Id
    @Column(name = "UserNum", nullable = false)
    public int getUserNum() {
        return userNum;
    }

    public void setUserNum(int userNum) {
        this.userNum = userNum;
    }

    @Basic
    @Column(name = "UserId", nullable = true, length = 30)
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "UserPassword", nullable = true, length = 20)
    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    @Basic
    @Column(name = "UserNickName", nullable = true, length = 20)
    public String getUserNickName() {
        return userNickName;
    }

    public void setUserNickName(String userNickName) {
        this.userNickName = userNickName;
    }

    @Basic
    @Column(name = "UserName", nullable = true, length = 20)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "UserGender", nullable = true, length = 5)
    public String getUserGender() {
        return userGender;
    }

    public void setUserGender(String userGender) {
        this.userGender = userGender;
    }

    @Basic
    @Column(name = "UserBirthDay", nullable = true)
    public Date getUserBirthDay() {
        return userBirthDay;
    }

    public void setUserBirthDay(Date userBirthDay) {
        this.userBirthDay = userBirthDay;
    }

    @Basic
    @Column(name = "UserPhoneNum", nullable = true, length = 13)
    public String getUserPhoneNum() {
        return userPhoneNum;
    }

    public void setUserPhoneNum(String userPhoneNum) {
        this.userPhoneNum = userPhoneNum;
    }

    @Basic
    @Column(name = "UserProvince", nullable = true, length = 20)
    public String getUserProvince() {
        return userProvince;
    }

    public void setUserProvince(String userProvince) {
        this.userProvince = userProvince;
    }

    @Basic
    @Column(name = "UserCity", nullable = true, length = 20)
    public String getUserCity() {
        return userCity;
    }

    public void setUserCity(String userCity) {
        this.userCity = userCity;
    }

    @Basic
    @Column(name = "UserSignature", nullable = true, length = 150)
    public String getUserSignature() {
        return userSignature;
    }

    public void setUserSignature(String userSignature) {
        this.userSignature = userSignature;
    }

    @Basic
    @Column(name = "UserConstellation", nullable = true, length = 10)
    public String getUserConstellation() {
        return userConstellation;
    }

    public void setUserConstellation(String userConstellation) {
        this.userConstellation = userConstellation;
    }

    @Basic
    @Column(name = "UserHeadPortrait", nullable = true, length = 60)
    public String getUserHeadPortrait() {
        return userHeadPortrait;
    }

    public void setUserHeadPortrait(String userHeadPortrait) {
        this.userHeadPortrait = userHeadPortrait;
    }

    @Basic
    @Column(name = "UserIsOnline", nullable = true)
    public Integer getUserIsOnline() {
        return userIsOnline;
    }

    public void setUserIsOnline(Integer userIsOnline) {
        this.userIsOnline = userIsOnline;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserEntity that = (UserEntity) o;

        if (userNum != that.userNum) return false;
        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;
        if (userPassword != null ? !userPassword.equals(that.userPassword) : that.userPassword != null) return false;
        if (userNickName != null ? !userNickName.equals(that.userNickName) : that.userNickName != null) return false;
        if (userName != null ? !userName.equals(that.userName) : that.userName != null) return false;
        if (userGender != null ? !userGender.equals(that.userGender) : that.userGender != null) return false;
        if (userBirthDay != null ? !userBirthDay.equals(that.userBirthDay) : that.userBirthDay != null) return false;
        if (userPhoneNum != null ? !userPhoneNum.equals(that.userPhoneNum) : that.userPhoneNum != null) return false;
        if (userProvince != null ? !userProvince.equals(that.userProvince) : that.userProvince != null) return false;
        if (userCity != null ? !userCity.equals(that.userCity) : that.userCity != null) return false;
        if (userSignature != null ? !userSignature.equals(that.userSignature) : that.userSignature != null)
            return false;
        if (userConstellation != null ? !userConstellation.equals(that.userConstellation) : that.userConstellation != null)
            return false;
        if (userHeadPortrait != null ? !userHeadPortrait.equals(that.userHeadPortrait) : that.userHeadPortrait != null)
            return false;
        if (userIsOnline != null ? !userIsOnline.equals(that.userIsOnline) : that.userIsOnline != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userNum;
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (userPassword != null ? userPassword.hashCode() : 0);
        result = 31 * result + (userNickName != null ? userNickName.hashCode() : 0);
        result = 31 * result + (userName != null ? userName.hashCode() : 0);
        result = 31 * result + (userGender != null ? userGender.hashCode() : 0);
        result = 31 * result + (userBirthDay != null ? userBirthDay.hashCode() : 0);
        result = 31 * result + (userPhoneNum != null ? userPhoneNum.hashCode() : 0);
        result = 31 * result + (userProvince != null ? userProvince.hashCode() : 0);
        result = 31 * result + (userCity != null ? userCity.hashCode() : 0);
        result = 31 * result + (userSignature != null ? userSignature.hashCode() : 0);
        result = 31 * result + (userConstellation != null ? userConstellation.hashCode() : 0);
        result = 31 * result + (userHeadPortrait != null ? userHeadPortrait.hashCode() : 0);
        result = 31 * result + (userIsOnline != null ? userIsOnline.hashCode() : 0);
        return result;
    }
}
