package cn.kingofworld.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by BaoDong on 2016/11/6.
 */
@Controller
public class MainController {
    @RequestMapping(value = "/")
    public String index() {
        System.out.println("index");
        return "index";
    }

    @RequestMapping(value = "/RegisterPage")
    public String RegisterPage() {
        System.out.println("RegisterPage");
        return "register";
    }

    @RequestMapping(value = "/UserPage")
    public String UserPage() {
        System.out.println("UserPage");
        return "UserPage";
    }

    @RequestMapping(value = "/Global")
    public String Global() {
        System.out.println("Global");
        return "indexGlobal";
    }

    @RequestMapping(value = "/GlobalRegisterPage")
    public String GlobalRegisterPage() {
        System.out.println("GlobalRegisterPage");
        return "registerGlobal";
    }

    @RequestMapping(value = "/GlobalUserPage")
    public String GlobalUserPage() {
        System.out.println("GlobalUserPage");
        return "UserPageGlobal";
    }

    @RequestMapping(value = "/abc")
    public String Test3Page() {
        System.out.println("abc");
        return "test3";
    }
}
