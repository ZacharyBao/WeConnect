package cn.kingofworld.C2C;

import javax.servlet.http.HttpSession;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by BaoDong on 2017/11/13.
 */
public class CounterThread extends Thread {
    private HttpSession session;
    private Integer counter;
    private Integer flag;

    public CounterThread() {

    }

    public CounterThread(HttpSession session) {
        this.session = session;
        counter = -1;//避免在最起初couter的值和初始值0一样
        flag = 0;
    }

    public void run() {
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                System.out.println("if之前" + counter);
                if (counter != (Integer) session.getAttribute("counter_flag")) {
                    counter = (Integer) session.getAttribute("counter_flag");
                    System.out.println("现在是" + counter);
                } else if (counter == (Integer) session.getAttribute("counter_flag")) {
                    session.setAttribute("send", "logout,ll");//退出
                    session.setAttribute("send_flag", "1");
                    while (true) {
                        if (session.getAttribute("send_flag") == "0") {//值等于0说明最后的登出消息发给了服务器，之后才能清空session
                            // 没了session，客户端取不到登出消息，就会导致从服务器中关闭客户端socket等资源失败
                            session.invalidate();
                            flag = 1;
                            break;
                        }
                    }
                }
            }
        };
        Timer timer = new Timer();
        long delay = 1000;
        long intevalPeriod = 30 * 1000;//间隔30秒
        timer.scheduleAtFixedRate(task, delay, intevalPeriod);
        System.gc();//回收内存
    }
}
