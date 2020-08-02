package cn.kingofworld.controller;

import cn.kingofworld.C2C.WeClient;
import cn.kingofworld.dto.Msg;
import cn.kingofworld.dto.UserData;
import cn.kingofworld.entity.UserEntity;
import cn.kingofworld.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by BaoDong on 2017/1/28.
 */
@Controller
public class UserController {
    @Resource
    private UserService userService;

    private WeClient weClient;

    @ResponseBody
    @RequestMapping("/saveUserInfo")
    public String saveUserInfo(@RequestParam("file") CommonsMultipartFile file, HttpServletRequest request, String userid, String password,
                               String username, String nickname, String usergender, String year, String month, String day, String usertel,
                               String province, String city) {
        String realPath = request.getSession().getServletContext().getRealPath("");
        String prefix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);//获取后缀名
        String fileName = userid + System.currentTimeMillis() + "." + prefix;
        System.out.println(realPath);
        try {
            //获取输出流
            OutputStream os = new FileOutputStream("/Library/ApacheTomcat/picdata/" + fileName);
            //获取输入流 CommonsMultipartFile 中可以直接得到文件的流
            InputStream is = file.getInputStream();
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
        //以上完成保存头像到制定目录
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(userid);
        userEntity.setUserName(username);
        userEntity.setUserPassword(password);
        userEntity.setUserNickName(nickname);
        userEntity.setUserGender(usergender);
        userEntity.setUserPhoneNum(usertel);
        userEntity.setUserProvince(province);
        userEntity.setUserCity(city);
        userEntity.setUserHeadPortrait("http://localhost:8089/" + fileName);
        userEntity.setUserIsOnline(0);
        String userBirthday = year + "-" + month + "-" + day;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date = sdf.parse(userBirthday);
            System.out.println(userBirthday + "鲍东");
            userEntity.setUserBirthDay(date);
            userEntity.setUserConstellation(Tools.getStarName(date));//通过生日计算出用户的星座
        } catch (ParseException e) {
            e.printStackTrace();
        }
        userService.save(userEntity);
        return "{\"msg\":\"success\"}";
    }

    @ResponseBody
    @RequestMapping("/checkRepeatedId_user")
    public String checkRepeatedId_user(String myid) {
        if (userService.isExist("userId", myid)) {
            return "{\"msg\":\"success\"}";
        } else {
            return "{\"msg\":\"failed\"}";
        }
    }

    @ResponseBody
    @RequestMapping("/getUserPassword")
    public String getUserPassword(String userId, String userPassword) {
        if (userPassword.equals(userService.get("userId", userId).getUserPassword())) {
            return "{\"msg\":\"success\"}";
        } else {
            return "{\"msg\":\"failed\"}";
        }
    }

    @ResponseBody
    @RequestMapping("/updateUserPassword")
    public String updateUserPassword(String userId, String userPassword) {
        if (userService.isExist("userId", userId)) {
            UserEntity userEntity = userService.get("userId", userId);
            userEntity.setUserPassword(userPassword);
            userService.update(userEntity);
            return "{\"msg\":\"success\"}";
        }
        return "{\"msg\":\"failed\"}";

    }

    @ResponseBody
    @RequestMapping("/userLoginCheck")
    public String userLoginCheck(HttpServletRequest request, String id, String psw) {
        if (userService.isExist("userId", id)) {
            if (psw.equals(userService.get("userId", id).getUserPassword())) {
                HttpSession session = request.getSession();
                session.setAttribute("userId", id);
                weClient = new WeClient(id, session);//在登录界面点击登录时才开启线程，这样只有在点击事件后才会创建，防止了网页刷新带来的重复创建线程导致系统内存被快速吃掉
                weClient.start();
                return "{\"msg\":\"success\"}";
            } else {
                return "{\"msg\":\"pswW\"}";
            }
        } else {
            return "{\"msg\":\"idW\"}";
        }
    }

    @RequestMapping(value = "/userIsLoginCheck")
    @ResponseBody
    public List userIsLoginCheck(HttpServletRequest request) {
        HttpSession session = request.getSession();
        List list = new ArrayList();
        String userId = null;
        if (session.getAttribute("userId") == null) {
            list.add("failed");
        } else {
            userId = (String) session.getAttribute("userId");
            UserEntity userEntity = userService.get("userId", userId);
            String userName = userEntity.getUserName();
            String userNickName = userEntity.getUserNickName();
            String userGender = userEntity.getUserGender();
            Date date = userEntity.getUserBirthDay();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            String userBirthday = sdf.format(date);
            String userPhoneNum = userEntity.getUserPhoneNum();
            String userProvince = userEntity.getUserProvince();
            String userCity = userEntity.getUserCity();
            String userSignature = userEntity.getUserSignature();
            String userConstellation = userEntity.getUserConstellation();
            String userHeadPortrait = userEntity.getUserHeadPortrait();
            list.add(userId);
            list.add(userNickName);
            list.add(userName);
            list.add(userGender);
            list.add(userBirthday);
            list.add(userPhoneNum);
            list.add(userProvince);
            list.add(userCity);
            list.add(userSignature);
            list.add(userConstellation);
            list.add(userHeadPortrait);
        }

        return list;
    }

    @ResponseBody
    @RequestMapping(value = "/getUserById")
    public List<UserData> getUserById(String id) {
        List<UserData> list = new ArrayList<UserData>();
        if (userService.isExist("userId", id)) {//通过id获取用户信息得提前判断id是否有效
            List<UserEntity> userEntity = userService.getList("userId", id);
            UserData userData = new UserData();
            userData.setUserConstellation(userEntity.get(0).getUserConstellation());
            userData.setUserCity(userEntity.get(0).getUserCity());
            userData.setUserProvince(userEntity.get(0).getUserProvince());
            userData.setUserPhoneNum(userEntity.get(0).getUserPhoneNum());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            String str = sdf.format(userEntity.get(0).getUserBirthDay());
            userData.setUserBirthday(str);
            userData.setUserGender(userEntity.get(0).getUserGender());
            userData.setUserHeadPortrait(userEntity.get(0).getUserHeadPortrait());
            userData.setUserName(userEntity.get(0).getUserName());
            userData.setUserNickName(userEntity.get(0).getUserNickName());
            userData.setUserSignature(userEntity.get(0).getUserSignature());
            list.add(userData);
        } else {
            UserData userData = new UserData();
            userData.setUserConstellation("null");//这个字段标记
            list.add(userData);
        }
        return list;
    }

    @ResponseBody
    @RequestMapping(value = "/setSendMsg")
    public void setSendMsg(String msg, HttpServletRequest request) {
        HttpSession session = request.getSession();
        Queue<String> sendQueue = (Queue<String>) session.getAttribute("send");
        sendQueue.offer(msg);
        session.setAttribute("send", sendQueue);//更新消息一定要放在更新flag之前，因为flag一但满足，线程会抢在消息更新之前
        session.setAttribute("send_flag", "1");
    }

    @ResponseBody
    @RequestMapping(value = "/setReceiveMsg")
    public List<Msg> setReceiveMsg(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Integer counter = (Integer) session.getAttribute("counter_flag");
        counter++;//前台每一次请求这个URL就会计数，通过这个counter的变化反映出前台页面是否处于打开状态或者关闭状态
        session.setAttribute("counter_flag", counter);
        List<Msg> list = new ArrayList<Msg>();
        Queue<String> recMsg;
        Queue<String> from;
        Queue<String> msgTime;
        if (session.getAttribute("receive_flag") == "1") {
            recMsg = (Queue<String>) session.getAttribute("receive");
            from = (Queue<String>) session.getAttribute("from");
            msgTime = (Queue<String>) session.getAttribute("msgTime");
            while (recMsg.peek() != null && from.peek() != null && msgTime.peek() != null) {//将收到的消息信息全部读取出来
                Msg msg = new Msg();
                msg.setMsgFrom(from.poll());
                msg.setMsgContent(recMsg.poll());
                msg.setMsgTime(msgTime.poll());
                System.out.println("来自" + msg.getMsgFrom() + "内容" + msg.getMsgContent());
                list.add(msg);
            }
            session.setAttribute("receive", recMsg);//将空的队列重新放到对应session里
            session.setAttribute("from", from);
            session.setAttribute("msgTime", msgTime);
            session.setAttribute("receive_flag", "0");
        } else {
            Msg msg = new Msg();
            msg.setMsgFrom("0");
            msg.setMsgContent("0");
            msg.setMsgTime("0");
            list.add(msg);
        }

        return list;
    }

    @ResponseBody
    @RequestMapping("/updateUserHeadPortrait")
    public String updateUserHeadPortrait(@RequestParam("changefile") CommonsMultipartFile changefile, HttpServletRequest request) {
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("userId");
        if (userService.isExist("userId", userId)) {
            String prefix = changefile.getOriginalFilename().substring(changefile.getOriginalFilename().lastIndexOf(".") + 1);
            String fileName = userId + System.currentTimeMillis() + "." + prefix;
            try {
                //获取输出流
                OutputStream os = new FileOutputStream("/Library/ApacheTomcat/picdata/" + fileName);
                //获取输入流 CommonsMultipartFile 中可以直接得到文件的流
                InputStream is = changefile.getInputStream();
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
            UserEntity userEntity = userService.get("userId", userId);
            String oldHeadPortrait = userEntity.getUserHeadPortrait();
            Tools.deleteFile(oldHeadPortrait);//删除老头像
            userEntity.setUserHeadPortrait("http://localhost:8089/" + fileName);
            userService.update(userEntity);
            return "{\"msg\":\"success\"}";
        }
        return "{\"msg\":\"failed\"}";
    }

    @ResponseBody
    @RequestMapping("/updateUserInfo")
    public String updateUserInfo(String userid, String username, String nickname, String usergender,
                                 String userbirthday, String usertel, String userprovince, String usercity, String usersignature) {
        if (userService.isExist("userId", userid)) {
            UserEntity userEntity = userService.get("userId", userid);
            userEntity.setUserName(username);
            userEntity.setUserNickName(nickname);
            userEntity.setUserGender(usergender);
            userEntity.setUserPhoneNum(usertel);
            userEntity.setUserProvince(userprovince);
            userEntity.setUserCity(usercity);
            userEntity.setUserSignature(usersignature);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            try {
                Date date = sdf.parse(userbirthday);
                System.out.println(userbirthday + "鲍东");
                userEntity.setUserBirthDay(date);
                userEntity.setUserConstellation(Tools.getStarName(date));//通过生日计算出用户的星座
            } catch (ParseException e) {
                e.printStackTrace();
            }
            userService.update(userEntity);
            return "{\"msg\":\"success\"}";
        }
        return "{\"msg\":\"failed\"}";
    }

    @ResponseBody
    @RequestMapping("/signOutSafely")
    public String signOutSafely(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Queue<String> sendQueue = (Queue<String>) session.getAttribute("send");
        sendQueue.offer("logout,ll");
        session.setAttribute("send", sendQueue);//退出
        session.setAttribute("send_flag", "1");
        String userId = (String) session.getAttribute("userId");
        int flag = 0;
        while (true) {
            if (session.getAttribute("send_flag") == "0") {//值等于0说明最后的登出消息发给了服务器，之后才能清空session
                // 没了session，客户端取不到登出消息，就会导致从服务器中关闭客户端socket等资源失败
                request.getSession().invalidate();
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            return "{\"msg\":\"success\"}";
        } else {
            return "{\"msg\":\"failed\"}";
        }
    }

}
