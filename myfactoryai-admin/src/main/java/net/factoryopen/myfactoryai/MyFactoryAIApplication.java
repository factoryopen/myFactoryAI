package net.factoryopen.myfactoryai;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.client.RestTemplate;

/**
 * 启动程序
 *
 * @author factoryOpen
 */
@EnableAsync
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class},
        scanBasePackages = {"net.factoryopen.myfactoryai","net.factoryopen.core","com.ruoyi","org.jeecg.modules.jmreport"})
@MapperScan({"com.ruoyi.**.mapper","net.factoryopen.myfactoryai.**.mapper"})
public class MyFactoryAIApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyFactoryAIApplication.class, args);
    }

    /**
     * 启动后打印酷炫欢迎词（控制台）
     */
    @Bean
    public CommandLineRunner printWelcome() {
        return args -> {
            // ANSI 颜色代码
            String RESET = "\u001B[0m";
            String GREEN = "\u001B[32m";
            String CYAN = "\u001B[36m";
            String YELLOW = "\u001B[33m";
            String RED = "\u001B[31m";
            String BOLD = "\u001B[1m";

            // 全新设计的 ASCII 艺术字：清晰的大写字母 AIFACTORY
            String asciiArt =
                    "   ███╗   ███╗██╗   ██╗    ███████╗ █████╗  ██████╗████████╗ ██████╗ ██████╗ ██╗   ██╗    █████╗ ██╗\n" +
                            "   ████╗ ████║╚██╗ ██╔╝    ██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝   ██╔══██╗██║\n" +
                            "   ██╔████╔██║ ╚████╔╝     █████╗  ███████║██║        ██║   ██║   ██║██████╔╝ ╚████╔╝    ███████║██║\n" +
                            "   ██║╚██╔╝██║  ╚██╔╝      ██╔══╝  ██╔══██║██║        ██║   ██║   ██║██╔══██╗  ╚██╔╝     ██╔══██║██║\n" +
                            "   ██║ ╚═╝ ██║   ██║       ██║     ██║  ██║╚██████╗   ██║   ╚██████╔╝██║  ██║   ██║      ██║  ██║██║\n" +
                            "   ╚═╝     ╚═╝   ╚═╝       ╚═╝     ╚═╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝      ╚═╝  ╚═╝╚═╝\n";

            String slogan = "                                                        factoryopen.myfactoryai ｜ 智能驱动制造未来 ⚡\n";

            System.out.println();
            System.out.println(CYAN + BOLD + asciiArt + RESET);
            System.out.println(CYAN + BOLD + slogan + RESET);
            System.out.println(YELLOW + BOLD + "═════════════════════════════════════════════════════════════════════════════════════════════════════════" + RESET);
            System.out.println(GREEN + BOLD + "  🚀 myFactoryAI 系统已成功启动  |  v1.0.0  |  自主Agent引擎" + RESET);
            System.out.println(CYAN + "  🌐 官网: " + BOLD + "www.factoryopen.net" + RESET);
            System.out.println(CYAN + "  🌐 文档: " + BOLD + "http://localhost:8080/swagger-ui/index.html" + RESET + CYAN + "  |  Druid: http://localhost:8080/druid/index.html" + RESET);
            System.out.println(CYAN + "  🌐 微信: " + BOLD + "factoryopen" + RESET);
            System.out.println();
            System.out.println(YELLOW + "  ✨ 核心能力已加载：" + RESET);
            System.out.println("     • 💬 智能对话（DeepSeek / 通义千问）");
            System.out.println("     • 📊 自然语言图表（NL2SQL + ECharts）");
            System.out.println("     • 📈 11维数据洞察报告 + 智能总结");
            System.out.println("     • 🛡️ SQL安全校验 + 权限拦截");
            System.out.println("     • 🧠 元数据增强（字典映射 + 字段中文化）");
            System.out.println("     • 📄 多模态PPT生成（Apache POI）");
            System.out.println("     • 🎤 持续语音输入 + 实时语音应答");
            //System.out.println("     • 🧩 四层Skill体系（57种AI技能）");
            System.out.println("     • 🏭 业务一体化：PLM + ERP(MRPII) + MES + IIoT适配 + 车间数字孪生");
            System.out.println();
            System.out.println(RED + "  💡 提示：语音识别需 HTTPS / localhost 环境，若遇 network 错误请检查网络或使用安全域名。" + RESET);
            System.out.println(GREEN + "  🎉 欢迎使用 factoryOpen.aifactory | 让工厂插上 AI 的翅膀！" + RESET);
            System.out.println(YELLOW + BOLD + "═════════════════════════════════════════════════════════════════════════════════════════════════════════" + RESET);
            System.out.println();
        };
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}