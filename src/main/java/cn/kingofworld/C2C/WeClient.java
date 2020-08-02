package cn.kingofworld.C2C;

/**
 * Created by BaoDong on 2017/1/26.
 */

import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.Socket;
import java.util.LinkedList;
import java.util.Queue;

/*
 *   client线程主要是负责：
 *   1.发送信息
 *   2.一直接收信息，并解析
 * */
public class WeClient extends Thread {//这个线程在每一个用户点击登录时被创建，最开始是要把用户的id上传至服务端socket
    private String userId;
    private HttpSession session;

    public WeClient() {

    }

    public WeClient(String userId, HttpSession session) {
        this.userId = userId;
        this.session = session;
    }

    public void run() {
        Socket socket = null;
        PrintWriter pw = null;
        ClientThread thread = null;
        CounterThread counterThread = null;
        Integer counter = 0;
        try {
            socket = new Socket("127.0.0.1", 9999);
            //开启一个线程接收信息，并解析
            thread = new ClientThread(socket, session);
            thread.setName("Client1");
            thread.start();
            //开启一个线程用来检测前台页面是否关闭
            counterThread = new CounterThread(session);
            counterThread.start();
            //主线程用来发送信息
            //BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
            pw = new PrintWriter(new BufferedWriter(new OutputStreamWriter(socket.getOutputStream(), "utf-8")), true);
            pw.println(userId);//上传用户id到服务端
            pw.flush();
            System.out.println(userId + "上传完毕");
            session.setAttribute("counter_flag", counter);//初始化计数器为0
            Queue<String> initialSend = new LinkedList<>();
            session.setAttribute("send", initialSend);//初始化存发送消息的队列
            while (true) {
                if (session.getAttribute("send_flag") == "1") {//值为1才可以发消息
                    Queue<String> sendQueue = (Queue<String>) session.getAttribute("send");
                    while (sendQueue.peek() != null) {
                        pw.println(sendQueue.poll());
                        //out.write(s+"\n");
                        pw.flush();
                    }
                    session.setAttribute("send", sendQueue);
                    session.setAttribute("send_flag", "0");//重新置0
                }
            }
        } catch (Exception e) {//有可能是session被清空了，或者socket被关闭了
            System.out.println("服务器异常");
        } finally {
            pw.close();
            System.out.println("发送消息线程已结束");
            System.out.println("WeClient线程已结束");
        }
    }
}