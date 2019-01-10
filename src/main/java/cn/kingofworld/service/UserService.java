package cn.kingofworld.service;

import cn.kingofworld.dao.UserDao;
import cn.kingofworld.entity.UserEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by BaoDong on 2017/1/28.
 */
@Service
@Transactional
public class UserService extends BaseService<UserEntity,Integer>{
    @Resource
    private UserDao userDao;
    @Resource
    public void setUserDao(UserDao userDao){
        super.setBaseDao(userDao);
    }

}
