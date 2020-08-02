package cn.kingofworld.C2C;

/**
 * Created by BaoDong on 2017/1/26.
 */

import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;
import java.util.LinkedList;
import java.util.Queue;

/**
 * 作用：一直接收服务端转发过来的信息
 */
public class ClientThread extends Thread {
    private Socket socket;
    private HttpSession session;

    public ClientThread(Socket socket, HttpSession session) {
        this.socket = socket;
        this.session = session;
    }

    public void run() {
        try {
            InputStream inputStream = socket.getInputStream();
            InputStreamReader inputStreamReader = new InputStreamReader(
                    inputStream, "UTF-8");
            BufferedReader br = new BufferedReader(inputStreamReader);
            try {
                // 信息的格式：(login||logout||say),发送人,收发人,信息体
                Queue<String> initialReceive = new LinkedList<String>();
                Queue<String> initialFrom = new LinkedList<String>();
                Queue<String> initialTime = new LinkedList<>();
                session.setAttribute("receive", initialReceive);//将空的队列对象存进
                session.setAttribute("from", initialFrom);
                session.setAttribute("msgTime", initialTime);
                Queue<String> msgQueue;
                Queue<String> msgFrom;
                Queue<String> msgTime;
                while (true) {
                    String msg = br.readLine();//当服务端把socket关闭之后，br就读
                    // 不到东西，就会变成null
                    System.out.println(msg);
                    if (msg == null) {//此时通过msg是null判断服务端socket已经断开，跳出死循环，执行完线程，结束
                        break;
                    }
                    String[] str = msg.split(",");
                    String mymsg = getMsgContent(msg);
                    switch (str[0]) {
                        case "say":
                            System.out.println(str[2] + " 对   " + str[1] + " say:  " + mymsg);
                            break;
                        case "group":
                            System.out.println(str[2] + " 对   " + str[1] + " say(group):  " + mymsg);
                            break;
                        case "offline":
                            System.out.println(str[4] + " 对   " + str[3] + " say(group):  " + mymsg);
                            break;
                        default:
                            break;
                    }
                    msgQueue = (Queue<String>) session.getAttribute("receive");
                    msgFrom = (Queue<String>) session.getAttribute("from");
                    msgTime = (Queue<String>) session.getAttribute("msgTime");
                    msgQueue.offer(mymsg);
                    if (str[0].equals("group")) {
                        msgFrom.offer(str[1] + "," + str[2]);
                        msgTime.offer("0");
                    } else if (str[0].equals("say")) {
                        msgFrom.offer(str[2]);
                        msgTime.offer("0");
                    } else if (str[0].equals("offline")) {
                        if (str[2].equals("say")) {
                            msgFrom.offer(str[4]);
                        } else if (str[2].equals("group")) {
                            msgFrom.offer(str[3] + "," + str[4]);
                        }
                        msgTime.offer(str[1]);
                    } else if (str[0].equals("create") || str[0].equals("add")) {
                        msgFrom.offer("0,0,0");//这个用来区分另外两种接收消息类型，因为它通过','切割能形成3段
                        msgTime.offer("0");
                    }
                    session.setAttribute("receive", msgQueue);
                    session.setAttribute("from", msgFrom);//
                    session.setAttribute("msgTime", msgTime);
                    session.setAttribute("receive_flag", "1");
                    System.out.println(session.getAttribute("userId") + "收到了:" + session.getAttribute("receive"));
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                inputStream.close();
                inputStreamReader.close();
                br.close();
                socket.close();
                System.out.println("接收消息线程关闭");
            }
        } catch (IOException e1) {
            e1.printStackTrace();
        }
    }

    private String getMsgContent(String msg) {
        int flag = 0;//标记消息最后一位是不是split的分割号英文逗号
        if (msg.charAt(msg.length() - 1) == ',') {
            msg = msg + "1";//如果最后一位是“，“那就要在msg之后加上1，用来做结尾标记
            flag = 1;
        }
        String[] str = msg.split(",");
        String mymsg = "";
        if (str.length > 4) {//获取消息，因为消息当中可能包含逗号，所以之前用逗号来切分信息，消息需要重新被拼接
            if (!str[0].equals("offline")) {
                for (int i = 3; i < str.length; i++) {
                    if (i == 3) {
                        mymsg = str[i];
                    } else {
                        if (flag == 1 && i == str.length - 1) {
                            mymsg = mymsg + ",";//最后一个str[i]里面存放的是之前添加进去的结尾标记“1”，所以不需要加上去，取而代之的是逗号
                        } else {
                            mymsg = mymsg + "," + str[i];//因为如果str数组大于4说明消息内容中含有我们的分割标记符号逗号，为了还原消息本身，我们在拼接
                        }//被拆分的消息时，同时也要加上被认定为分隔符而失去的逗号
                    }
                }
            } else {
                for (int i = 5; i < str.length; i++) {
                    if (i == 5) {
                        mymsg = str[i];
                    } else {
                        if (flag == 1 && i == str.length - 1) {
                            mymsg = mymsg + ",";//最后一个str[i]里面存放的是之前添加进去的结尾标记“1”，所以不需要加上去，取而代之的是逗号
                        } else {
                            mymsg = mymsg + "," + str[i];//因为如果str数组大于4说明消息内容中含有我们的分割标记符号逗号，为了还原消息本身，我们在拼接
                        }//被拆分的消息时，同时也要加上被认定为分隔符而失去的逗号
                    }
                }
            }
        } else if (str.length == 4) {
            mymsg = str[3];
        } else {
            mymsg = str[2];
        }
        return mymsg;
    }
}
