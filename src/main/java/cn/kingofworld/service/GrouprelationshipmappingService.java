package cn.kingofworld.service;

import cn.kingofworld.dao.GrouprelationshipmappingDao;
import cn.kingofworld.dto.Group;
import cn.kingofworld.entity.GrouprelationshipmappingEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by BaoDong on 2017/11/18.
 */
@Service
@Transactional
public class GrouprelationshipmappingService extends BaseService<GrouprelationshipmappingEntity,Integer> {
    @Resource
    private GrouprelationshipmappingDao grouprelationshipmappingDao;
    @Resource
    public void setGrouprelationshipmappingDao(GrouprelationshipmappingDao grouprelationshipmappingDao){
        super.setBaseDao(grouprelationshipmappingDao);
    }
    public List<Group> getGroups(String id) {
        return grouprelationshipmappingDao.getGroups(id);
    }
    public Group getOneGroup(String groupId){
        return grouprelationshipmappingDao.getOneGroup(groupId);
    }
    public void deleteItemByUserIdAndGroupId(String userId,String groupId){
        grouprelationshipmappingDao.deleteItemByUserIdAndGroupId(userId,groupId);
    }
}
