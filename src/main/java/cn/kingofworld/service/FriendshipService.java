package cn.kingofworld.service;

import cn.kingofworld.dao.FriendshipDao;
import cn.kingofworld.entity.FriendshipEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by BaoDong on 2017/3/1.
 */
@Service
@Transactional
public class FriendshipService extends BaseService<FriendshipEntity,Integer>{
    @Resource
    private FriendshipDao friendshipDao;
    @Resource
    public void setFriendshipDao(FriendshipDao friendshipDao){
        super.setBaseDao(friendshipDao);
    }

    public int HasAddedTheAccount(String from,String to) {
        return friendshipDao.HasAddedTheAccount(from,to);
    }

    public List getFriendsId(String id) {
        return friendshipDao.getFriendsId(id);
    }

    public List<Integer> getFriendshipItemNum(String from,String to){
        return friendshipDao.getFriendshipItemNum(from,to);
    }

    public List<String> getFriendRequest(String id){
        return friendshipDao.getFriendRequest(id);
    }

    public List<String> getApprovedFriendRequest(String id){
        return friendshipDao.getApprovedFriendRequest(id);
    }

    public List<Integer> getFriendshipItemNumTwo(String from,String to){
        return friendshipDao.getFriendshipItemNumTwo(from,to);
    }
}
