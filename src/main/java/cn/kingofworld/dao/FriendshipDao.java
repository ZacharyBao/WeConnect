package cn.kingofworld.dao;

import cn.kingofworld.entity.FriendshipEntity;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import java.util.*;

/**
 * Created by BaoDong on 2017/3/1.
 */
@Repository
public class FriendshipDao extends BaseDao<FriendshipEntity, Integer> {
    @SuppressWarnings("unchecked")
    public int HasAddedTheAccount(String from, String to) {//判断数据库中是否存在这个好友请求
        int flag = 0;
        String sql = "select fIsFriend from friendship where fFromId like:from and fToId like:to";
        Query query = getSession().createSQLQuery(sql);
        query.setString("from", "%" + from + "%");
        query.setString("to", "%" + to + "%");
        List list = query.list();
        if (list.size() == 0)
            flag = 0;//表示没有发送过好友请求
        else {
            if ((Integer) list.get(0) == 0)
                flag = 1;//表示发送过请求，但是还没成为好友
            else if ((Integer) list.get(0) == 1)
                flag = 2;//表示发送过请求，成为好友
        }
        return flag;
    }

    @SuppressWarnings("unchecked")
    public List getFriendsId(String id) {//得到好友的id
        List list = new ArrayList();
        Set set=new HashSet();//将重复的过滤
        String friendId;
        String sql1 = "select fToId from friendship where fFromId like:id and (fIsFriend =:isfriend or fIsFriend=:isfriend2)";
        Query query1 = getSession().createSQLQuery(sql1);
        int isfriend = 1;
        int isfriend2=2;
        query1.setString("id", "%" + id + "%");
        query1.setInteger("isfriend", isfriend);
        query1.setInteger("isfriend2",isfriend2);
        List fisrtPart = query1.list();
        Iterator iterator = fisrtPart.iterator();
        while (iterator.hasNext()) {
            friendId = (String) iterator.next();
            set.add(friendId);
        }

        String sql2 = "select fFromId from friendship where fToId like:id and (fIsFriend =:isfriend or fIsFriend=:isfriend2)";
        Query query2 = getSession().createSQLQuery(sql2);
        query2.setString("id", "%" + id + "%");
        query2.setInteger("isfriend", isfriend);
        query2.setInteger("isfriend2",isfriend2);
        List secondPart = query2.list();
        Iterator iterator2 = secondPart.iterator();
        while (iterator2.hasNext()) {
            friendId = (String) iterator2.next();
            set.add(friendId);
        }
        list.addAll(set);
        return list;
    }

    @SuppressWarnings("unchecked")
    public List<Integer> getFriendshipItemNum(String from,String to){//删除好友时，获取好友表中那一项，将其删除
        List<Integer> list = new ArrayList<Integer>();
        String sql1 = "select fNum from friendship where fFromId like:from and fToId like:to";
        Query query1 = getSession().createSQLQuery(sql1);
        query1.setString("from", "%" + from + "%");
        query1.setString("to", "%" + to + "%");
        list.addAll(query1.list());
        String sql2 = "select fNum from friendship where fFromId like:to and fToId like:from";
        Query query2 = getSession().createSQLQuery(sql2);
        query2.setString("from", "%" + from + "%");
        query2.setString("to", "%" + to + "%");
        list.addAll(query2.list());
        return list;
    }

    @SuppressWarnings("unchecked")
    public List<String> getFriendRequest(String id){//找到发送过来的请求，等待同意或者拒绝
        List<String> list=new ArrayList<String>();
        String sql="select fFromId from friendship  where fToId like:to and fIsFriend=:flag";
        Query query=getSession().createSQLQuery(sql);
        query.setString("to","%"+id+"%");
        query.setInteger("flag",0);
        list.addAll(query.list());
        return list;
    }

    @SuppressWarnings("unchecked")
    public List<Integer> getFriendshipItemNumTwo(String from,String to){
        List<Integer> list = new ArrayList<Integer>();
        String sql1 = "select fNum from friendship where fFromId like:from and fToId like:to";
        Query query1 = getSession().createSQLQuery(sql1);
        query1.setString("from", "%" + from + "%");
        query1.setString("to", "%" + to + "%");
        list.addAll(query1.list());
        return list;
    }

    @SuppressWarnings("unchecked")
    public List<String> getApprovedFriendRequest(String id){//得到通过的请求
        List<String> list=new ArrayList<String>();
        String sql="select fToId from friendship  where fFromId like:a and fIsFriend=:flag";
        Query query=getSession().createSQLQuery(sql);
        query.setString("a","%"+id+"%");
        query.setInteger("flag",2);
        list.addAll(query.list());
        return list;
    }

}
