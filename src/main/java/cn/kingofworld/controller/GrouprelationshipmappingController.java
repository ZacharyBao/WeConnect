package cn.kingofworld.controller;

import cn.kingofworld.dto.Group;
import cn.kingofworld.entity.GrouprelationshipmappingEntity;
import cn.kingofworld.service.GrouprelationshipmappingService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

/**
 * Created by BaoDong on 2017/11/18.
 */
@Controller
public class GrouprelationshipmappingController {
    @Resource
    GrouprelationshipmappingService grouprelationshipmappingService;

    @ResponseBody
    @RequestMapping("/loadGroups")
    public List<Group> loadGroups(String id){
        List<Group> groupList=grouprelationshipmappingService.getGroups(id);
        return groupList;
    }

    @ResponseBody
    @RequestMapping("/loadOneGroup")
    public List<Group> loadOneGroup(String id){
        List<Group> groupList= new ArrayList<>();
        Group group=grouprelationshipmappingService.getOneGroup(id);
        groupList.add(group);
        return groupList;
    }

    @ResponseBody
    @RequestMapping("/quitGroup")
    public String quitGroup(HttpServletRequest request,String userId, String groupId){
        grouprelationshipmappingService.deleteItemByUserIdAndGroupId(userId,groupId);
        //将新加入的小组成员添加到服务器群组列表里面
        HttpSession session=request.getSession();
        Queue<String> sendQueue=(Queue<String>)session.getAttribute("send");
        sendQueue.offer("quit,"+userId+","+groupId);
        session.setAttribute("send",sendQueue);//更新消息一定要放在更新flag之前，因为flag一但满足，线程会抢在消息更新之前
        session.setAttribute("send_flag","1");
        return "{\"msg\":\"success\"}";
    }
}
