package Project.comu.Oauth.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/image/**","/css/**", "/*.ico", "/error", "/js/**");

        registry.addInterceptor(new LoginCheckInterceptor())
                .order(2)
                .addPathPatterns("/**")
                .excludePathPatterns("/", "/login", "/address-search/**",
                                     "/join","/rest/join" ,"/find", "/send",
                                     "/findEmail",  "/login2" , "/go", "/send/**" , "/sms/send",
                                     "/logout","/callback" ,"/naverjoin", "/check-email/**","/check-phone/**" , "/naver",
                                     "https://nid.naver.com/oauth2.0/**","https://business.juso.go.kr/**",
                                     "/css/**","/image/**" , "/js/**", "/join/**" ,
                                     "/*.ico", "/error");
    }
}