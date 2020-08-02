package cn.kingofworld.controller;

import java.io.File;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by BaoDong on 2017/1/28.
 */
public class Tools {
    public static String getStarName(Date date) {//通过日期计算出星座
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int month = c.get(Calendar.MONTH) + 1;
        int day = c.get(Calendar.DAY_OF_MONTH);
        String m;
        if (month < 10)
            m = "0" + month;
        else
            m = "" + month;
        String d;
        if (day < 10)
            d = "0" + day;
        else
            d = "" + day;
        String md = m + d;
        if (md.compareTo("0321") >= 0 && md.compareTo("0420") <= 0) {
            return "白羊座";
        } else if (md.compareTo("0421") >= 0 && md.compareTo("0521") <= 0) {
            return "金牛座";
        } else if (md.compareTo("0522") >= 0 && md.compareTo("0621") <= 0) {
            return "双子座";
        } else if (md.compareTo("0622") >= 0 && md.compareTo("0722") <= 0) {
            return "巨蟹座";
        } else if (md.compareTo("0723") >= 0 && md.compareTo("0823") <= 0) {
            return "狮子座";
        } else if (md.compareTo("0824") >= 0 && md.compareTo("0923") <= 0) {
            return "处女座";
        } else if (md.compareTo("0924") >= 0 && md.compareTo("1023") <= 0) {
            return "天秤座";
        } else if (md.compareTo("1024") >= 0 && md.compareTo("1122") <= 0) {
            return "天蝎座";
        } else if (md.compareTo("1123") >= 0 && md.compareTo("1221") <= 0) {
            return "射手座";
        } else if (md.compareTo("1222") >= 0 || md.compareTo("0120") <= 0) {
            return "摩羯座";
        } else if (md.compareTo("0121") >= 0 && md.compareTo("0219") <= 0) {
            return "水瓶座";
        } else if (md.compareTo("0220") >= 0 && md.compareTo("0320") <= 0) {
            return "双鱼座";
        }
        return "null";
    }

    public static boolean deleteFile(String fileAddress) {
        String fileName = "/Library/ApacheTomcat/picdata/" + fileAddress.substring(fileAddress.lastIndexOf("/") + 1);
        //由于删除文件只能是绝对路径，用图片在服务器上的路径是删除不了的，必须试用其绝对路径删除
        File file = new File(fileName);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
            if (file.delete()) {
                System.out.println("删除单个文件" + fileName + "成功！");
                return true;
            } else {
                System.out.println("删除单个文件" + fileName + "失败！");
                return false;
            }
        } else {
            System.out.println("删除单个文件失败：" + fileName + "不存在！");
            return false;
        }
    }
}
