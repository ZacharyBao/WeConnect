package cn.kingofworld.controller;

import cn.kingofworld.entity.GrouprelationshipmappingEntity;
import cn.kingofworld.entity.MygroupEntity;
import cn.kingofworld.service.GroupService;
import cn.kingofworld.service.GrouprelationshipmappingService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Queue;

/**
 * Created by BaoDong on 2017/11/18.
 */
@Controller
public class GroupController {
    @Resource
    private GroupService groupService;
    @Resource
    private GrouprelationshipmappingService grouprelationshipmappingService;

    @ResponseBody
    @RequestMapping("/checkRepeatedId_group")
    public String checkRepeatedId_group(String groupId) {
        if (groupService.isExist("groupId", groupId)) {
            return "{\"msg\":\"success\"}";
        } else {
            return "{\"msg\":\"failed\"}";
        }
    }

    @ResponseBody
    @RequestMapping("/saveGroupInfo")
    public String saveGroupInfo(@RequestParam("groupHeadportrait") CommonsMultipartFile groupHeadportrait, String groupId, String groupName,
                                String groupCreator, String groupMemberIdList[], String groupMemberNickNameList[], HttpServletRequest request) {
        String prefix = groupHeadportrait.getOriginalFilename().substring(groupHeadportrait.getOriginalFilename().lastIndexOf(".") + 1);//获取后缀名
        String fileName = "group" + groupId + System.currentTimeMillis() + "." + prefix;
        try {
            //获取输出流
            OutputStream os = new FileOutputStream("/Library/ApacheTomcat/picdata/" + fileName);
            //获取输入流 CommonsMultipartFile 中可以直接得到文件的流
            InputStream is = groupHeadportrait.getInputStream();
            int temp;
            //一个一个字节的读取并写入
            while ((temp = is.read()) != (-1)) {
                os.write(temp);
            }
            os.flush();
            os.close();
            is.close();

        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        MygroupEntity groupEntity = new MygroupEntity();
        groupEntity.setGroupCreatorId(groupCreator);
        groupEntity.setGroupHeadPortrait("http://localhost:8089/" + fileName);
        groupEntity.setGroupName(groupName);
        groupEntity.setGroupId(groupId);
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
        String createTime = sdf.format(date);
        groupEntity.setGroupCreateTime(createTime);
        groupService.save(groupEntity);
        System.out.println("id是" + groupMemberIdList[0]);
        System.out.println("昵称是" + groupMemberNickNameList[0]);
        //将群组映射关系保存下来
        for (int i = 0; i < groupMemberIdList.length; i++) {
            GrouprelationshipmappingEntity mappingEntity = new GrouprelationshipmappingEntity();
            mappingEntity.setGroupId(groupId);
            mappingEntity.setUserId(groupMemberIdList[i]);
            mappingEntity.setUserRemark(groupMemberNickNameList[i]);
            mappingEntity.setUserJoinTime(createTime);
            grouprelationshipmappingService.save(mappingEntity);
        }
        HttpSession session = request.getSession();
        Queue<String> sendQueue = (Queue<String>) session.getAttribute("send");
        for (int j = 0; j < groupMemberIdList.length; j++) {//这里发送消息去IM服务器要等到保存操作全部完成
            sendQueue.offer("create," + groupMemberIdList[j] + "," + groupId);
            System.out.println("创建群组，消息以发送" + "create," + groupMemberIdList[j] + "," + groupId);
        }
        session.setAttribute("send", sendQueue);
        session.setAttribute("send_flag", "1");
        return "{\"msg\":\"success\"}";
    }

    @ResponseBody
    @RequestMapping("/saveEditGroupInfo")
    public String saveEditGroupInfo(HttpServletRequest request, String editGroupId, String editGroupName,
                                    String groupMemberIdList[], String groupMemberNickNameList[]) throws IOException {
        System.out.println("啦啦啦啦啦啦" + editGroupId);
        MygroupEntity groupEntity = groupService.get("groupId", editGroupId);

        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        if (multipartResolver.isMultipart(request)) {
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            Iterator iter = multiRequest.getFileNames();
            while (iter.hasNext()) {
                //一次遍历所有文件
                MultipartFile file = multiRequest.getFile(iter.next().toString());
                if (file != null) {
                    String prefix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
                    String fileName = "group" + editGroupId + System.currentTimeMillis() + "." + prefix;
                    String path = "/Library/ApacheTomcat/picdata/" + fileName;
                    //上传
                    file.transferTo(new File(path));
                    String oldGroupHeadportrait = groupEntity.getGroupHeadPortrait();
                    Tools.deleteFile(oldGroupHeadportrait);//删除老头像
                    groupEntity.setGroupHeadPortrait("http://localhost:8089/" + fileName);//更新新头像地址
                }

            }
            System.out.println("进来了");
        } else {
            System.out.println("不是Multipart！");
        }
        groupEntity.setGroupName(editGroupName);
        groupService.update(groupEntity);
        //将群组映射关系保存下来
        if (groupMemberIdList != null) {
            for (int i = 0; i < groupMemberIdList.length; i++) {
                GrouprelationshipmappingEntity mappingEntity = new GrouprelationshipmappingEntity();
                mappingEntity.setGroupId(editGroupId);
                mappingEntity.setUserId(groupMemberIdList[i]);
                mappingEntity.setUserRemark(groupMemberNickNameList[i]);
                Date date = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
                String joinTime = sdf.format(date);
                mappingEntity.setUserJoinTime(joinTime);
                grouprelationshipmappingService.save(mappingEntity);
                //将新加入的小组成员添加到服务器群组列表里面
                HttpSession session = request.getSession();
                Queue<String> sendQueue = (Queue<String>) session.getAttribute("send");
                sendQueue.offer("add," + groupMemberIdList[i] + "," + editGroupId);
                session.setAttribute("send", sendQueue);//更新消息一定要放在更新flag之前，因为flag一但满足，线程会抢在消息更新之前
                session.setAttribute("send_flag", "1");
            }
        } else {
            System.out.println("没有新成员加入");
        }
        return "{\"msg\":\"success\"}";
    }

}

