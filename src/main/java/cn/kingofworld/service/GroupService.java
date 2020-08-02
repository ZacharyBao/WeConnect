package cn.kingofworld.service;

import cn.kingofworld.dao.GroupDao;
import cn.kingofworld.entity.MygroupEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by BaoDong on 2017/11/18.
 */
@Service
@Transactional
public class GroupService extends BaseService<MygroupEntity, Integer> {
    @Resource
    private GroupDao groupDao;

    @Resource
    public void setGroupDao(GroupDao groupDao) {
        super.setBaseDao(groupDao);
    }
}
