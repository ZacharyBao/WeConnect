package cn.kingofworld.dto;

/**
 * Created by BaoDong on 2017/1/26.
 */
import java.io.*;
import java.net.Socket;

public class User {

    private String name;
    private String account;
    private Socket socket;
    private BufferedReader br;
    private PrintWriter pw;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public Socket getSocket() {
        return socket;
    }

    public void setSocket(final Socket socket) {
        this.socket = socket;
    }

    public BufferedReader getBr() {
        return br;
    }

    public void setBr(BufferedReader br) {
        this.br = br;
    }

    public PrintWriter getPw() {
        return pw;
    }

    public void setPw(PrintWriter pw) {
        this.pw = pw;
    }

    public User(final Socket socket) throws IOException {
        this.socket = socket;
        this.br = new BufferedReader(new InputStreamReader(
                socket.getInputStream(),"UTF-8"));
        this.pw = new PrintWriter(new BufferedWriter( new OutputStreamWriter(socket.getOutputStream(),"utf-8")),true);
        this.name=this.br.readLine();//将socket携带的id获取下来
    }

    @Override
    public String toString() {
        return "User [name=" + name + ", account=" + account + ", socket="
                + socket + "]";
    }
}