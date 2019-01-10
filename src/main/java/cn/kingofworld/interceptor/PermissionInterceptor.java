package cn.kingofworld.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by BaoDong on 2018/4/10.
 */
public class PermissionInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {

        String url = request.getRequestURI();
        String header=request.getHeader("myflag");
        String requestUrl=request.getRequestURI();
        //System.out.println("request.getRequestURI()"+request.getRequestURI());
        //System.out.println("request.getServletPath()"+request.getServletPath());
        //System.out.println("request.getContextPath()"+request.getContextPath());
        if(header!=null){
            return true;
        }else{
            if(request.getRequestURI().equals("/")){//主页则让通过
                return true;
            }
        }
        // 跳转到拒绝访问的页面
        request.getRequestDispatcher("/").forward(
                request, response);
        System.out.println("授权失败");
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
                           Object arg2, ModelAndView arg3) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest arg0,
                                HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {
    }

}
