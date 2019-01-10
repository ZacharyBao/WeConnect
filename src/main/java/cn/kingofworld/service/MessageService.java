package cn.kingofworld.service;

import cn.kingofworld.dao.MessageDao;
import cn.kingofworld.entity.MessageEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Transactional
public class MessageService extends BaseService<MessageEntity,Integer> {
    @Resource
    private MessageDao messageDao;
    @Resource
    public void setMessageDao(MessageDao messageDao){
        super.setBaseDao(messageDao);
    }
}
