package cn.kingofworld.dao;

import cn.kingofworld.dto.Group;
import cn.kingofworld.entity.GrouprelationshipmappingEntity;
import cn.kingofworld.entity.MygroupEntity;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by BaoDong on 2017/11/18.
 */
@Repository
public class GrouprelationshipmappingDao extends BaseDao<GrouprelationshipmappingEntity,Integer>{
    @SuppressWarnings("unchecked")
    public List<Group> getGroups(String id){
        List<Group> groupList=new ArrayList<>();
        String sql = "select groupId from GrouprelationshipmappingEntity as Item where Item.userId=?";//先选出用户所在的群组的id
        Query query = getSession().createQuery(sql);//创建原生sql方法
        query.setParameter(0,id);

        List groupIdlist=query.list();
        //String sql2 = "select groupName from group where groupId like:id";
        for(int i=0;i<groupIdlist.size();i++){
            //选出小组成员id
            String sql1 = "select userId from GrouprelationshipmappingEntity as Item where Item.groupId=?";
            Query query1=getSession().createQuery(sql1);//hibernate创建sql语句方法
            query1.setParameter(0,  groupIdlist.get(i));
            List<String> userIdList=new ArrayList<>();
            userIdList=query1.list();
            //选出小组成员备注
            String sql2 = "select userRemark from GrouprelationshipmappingEntity as Item where Item.groupId=?";
            Query query2=getSession().createQuery(sql2);//hibernate创建sql语句方法
            query2.setParameter(0,  groupIdlist.get(i));
            List<String> userRemarkList=new ArrayList<>();
            userRemarkList=query2.list();
            //选出小组成员加入时间
            String sql3 = "select userJoinTime from GrouprelationshipmappingEntity as Item where Item.groupId=?";
            Query query3=getSession().createQuery(sql3);//hibernate创建sql语句方法
            query3.setParameter(0, groupIdlist.get(i));
            List<String> userJoinTimeList=new ArrayList<>();
            userJoinTimeList=query3.list();
            //选出小组成员头像地址、故乡、性别
            List<String> userHeadPortraitList=new ArrayList<>();
            List<String> userHometownList=new ArrayList<>();
            List<String> userGenderList=new ArrayList<>();
            String sql5="select userHeadPortrait from user where userId like:userid1";
            String sql6="select userProvince from user where userId like:userid2";
            String sql7="select userCity from user where userId like:userid3";
            String sql8="select userGender from user where userId like:userid4";
            for(int j=0;j<userIdList.size();j++){
                //获取头像
                Query query5=getSession().createSQLQuery(sql5);
                query5.setString("userid1","%"+userIdList.get(j)+"%");
                List<String> avatarList=query5.list();//虽说是List，每次只有一个数据选择出来
                userHeadPortraitList.add(avatarList.get(0));
                //获取省份
                Query query6=getSession().createSQLQuery(sql6);
                query6.setString("userid2","%"+userIdList.get(j)+"%");
                List<String> provinceList=query6.list();
                //获取城市
                Query query7=getSession().createSQLQuery(sql7);
                query7.setString("userid3","%"+userIdList.get(j)+"%");
                List<String> cityList=query7.list();
                //拼接省份城市为故乡
                userHometownList.add(provinceList.get(0)+" "+cityList.get(0));
                //获取性别
                Query query8=getSession().createSQLQuery(sql8);
                query8.setString("userid4","%"+userIdList.get(j)+"%");
                List<String> genderList=query8.list();
                userGenderList.add(genderList.get(0));
            }
            //选出小组信息
            String sql4 = "from MygroupEntity as Item where Item.groupId=?";
            Query query4=getSession().createQuery(sql4);
            query4.setParameter(0, groupIdlist.get(i));
            List<MygroupEntity> singleGroup=query4.list();
            Group group=new Group();
            group.setGroupId(singleGroup.get(0).getGroupId());
            group.setGroupCreatorld(singleGroup.get(0).getGroupCreatorId());
            group.setGroupCreateTime(singleGroup.get(0).getGroupCreateTime());
            group.setGroupHeadPortrait(singleGroup.get(0).getGroupHeadPortrait());
            group.setGroupName(singleGroup.get(0).getGroupName());
            group.setGroupUserIdList(userIdList);
            group.setGroupUserJoinTimeList(userJoinTimeList);
            group.setGroupUserRemarkList(userRemarkList);
            group.setGroupUserHeadPortraitList(userHeadPortraitList);
            group.setGroupUserHometownList(userHometownList);
            group.setGroupUserGenderList(userGenderList);
            groupList.add(group);
        }
        return groupList;
    }

    @SuppressWarnings("unchecked")
    public Group getOneGroup(String groupId){
        //选出小组成员id
        String sql1 = "select userId from GrouprelationshipmappingEntity as Item where Item.groupId=?";
        Query query1=getSession().createQuery(sql1);//hibernate创建sql语句方法
        query1.setParameter(0, groupId );
        List<String> userIdList=new ArrayList<>();
        userIdList=query1.list();
        //选出小组成员备注
        String sql2 = "select userRemark from GrouprelationshipmappingEntity as Item where Item.groupId=?";
        Query query2=getSession().createQuery(sql2);//hibernate创建sql语句方法
        query2.setParameter(0, groupId);
        List<String> userRemarkList=new ArrayList<>();
        userRemarkList=query2.list();
        //选出小组成员加入时间
        String sql3 = "select userJoinTime from GrouprelationshipmappingEntity as Item where Item.groupId=?";
        Query query3=getSession().createQuery(sql3);//hibernate创建sql语句方法
        query3.setParameter(0, groupId);
        List<String> userJoinTimeList=new ArrayList<>();
        userJoinTimeList=query3.list();
        //选出小组成员头像地址、故乡、性别
        List<String> userHeadPortraitList=new ArrayList<>();
        List<String> userHometownList=new ArrayList<>();
        List<String> userGenderList=new ArrayList<>();
        String sql5="select userHeadPortrait from user where userId like:userid1";
        String sql6="select userProvince from user where userId like:userid2";
        String sql7="select userCity from user where userId like:userid3";
        String sql8="select userGender from user where userId like:userid4";
        for(int j=0;j<userIdList.size();j++){
            //获取头像
            Query query5=getSession().createSQLQuery(sql5);
            query5.setString("userid1","%"+userIdList.get(j)+"%");
            List<String> avatarList=query5.list();//虽说是List，每次只有一个数据选择出来
            userHeadPortraitList.add(avatarList.get(0));
            //获取省份
            Query query6=getSession().createSQLQuery(sql6);
            query6.setString("userid2","%"+userIdList.get(j)+"%");
            List<String> provinceList=query6.list();
            //获取城市
            Query query7=getSession().createSQLQuery(sql7);
            query7.setString("userid3","%"+userIdList.get(j)+"%");
            List<String> cityList=query7.list();
            //拼接省份城市为故乡
            userHometownList.add(provinceList.get(0)+" "+cityList.get(0));
            //获取性别
            Query query8=getSession().createSQLQuery(sql8);
            query8.setString("userid4","%"+userIdList.get(j)+"%");
            List<String> genderList=query8.list();
            userGenderList.add(genderList.get(0));
        }
        //选出小组信息
        String sql4 = "from MygroupEntity as Item where Item.groupId=?";
        Query query4=getSession().createQuery(sql4);
        query4.setParameter(0, groupId);
        List<MygroupEntity> singleGroup=query4.list();
        Group group=new Group();
        group.setGroupId(singleGroup.get(0).getGroupId());
        group.setGroupCreatorld(singleGroup.get(0).getGroupCreatorId());
        group.setGroupCreateTime(singleGroup.get(0).getGroupCreateTime());
        group.setGroupHeadPortrait(singleGroup.get(0).getGroupHeadPortrait());
        group.setGroupName(singleGroup.get(0).getGroupName());
        group.setGroupUserIdList(userIdList);
        group.setGroupUserJoinTimeList(userJoinTimeList);
        group.setGroupUserRemarkList(userRemarkList);
        group.setGroupUserHeadPortraitList(userHeadPortraitList);
        group.setGroupUserHometownList(userHometownList);
        group.setGroupUserGenderList(userGenderList);
        return group;
    }

    @SuppressWarnings("unchecked")
    public void deleteItemByUserIdAndGroupId(String userId,String groupId){
        String hql="delete from GrouprelationshipmappingEntity as Item where Item.groupId=? and Item.userId=?";
        Query query=getSession().createQuery(hql);
        query.setParameter(0,groupId);
        query.setParameter(1,userId);
        query.executeUpdate();
    }
}
