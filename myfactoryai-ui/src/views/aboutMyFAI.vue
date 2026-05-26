<template xmlns="http://www.w3.org/1999/html">
  <div class="login">
    <div class="background"></div>
    <div class="left-content">
      <div style="position: absolute;left: 118px;top: 50px;color: #2D2D2D">
        <H1 style="line-height: 26px">factoryOpen，Agent驱动的智能工厂开源工具包</H1>
        <H4 style="line-height: 10px">基于 Apache.AI 和 <a href="www.ruoyi.vip">Ruoyi（www.ruoyi.vip）</a>双开源框架，Apache-2.0协议，面向中小工厂一体化设计，可快速上手</H4>
      </div>
      <p style="margin-top: 118px">
        <h2 style="line-height: 30px;color: #F5F5DC">myFAI开源项目（myFactoryAI）</h2>
        <h4 style="line-height: 8px;color: #F5F5DC">github下载：<a href="https://github.com/factoryopen/myfactoryai">https://github.com/factoryopen/myfactoryai</a></h4>
        <h4 style="line-height: 8px;color: #F5F5DC">gitee下载：<a href="https://gitee.com/factoryopen/myfactoryai">https://gitee.com/factoryopen/myfactoryai</a></h4>
        <h4 style="line-height: 8px;color: #F5F5DC">Free无限制部署包下载： <a href="../res/download/factoryopen_myfactoryai_free1.0.0.zip">factoryopen_myfactoryai_free1.0.0.zip</a></h4>
      </p>
      <p style="margin-bottom: 68px">
        <h2 style="line-height: 30px;color: #F5F5DC">项目定位</h2>
        <h4 style="line-height: 8px;color: #F5F5DC">价值锚点：<span style="color: yellow">AI工厂，省级智能车间，市级智能工厂（绿色工厂）</span></h4>
        <h4 style="line-height: 8px;color: #F5F5DC">业务一体化：PLM + ERP(MRPII/SCM) + MES + IIoT适配 + 2.5d车间数字孪生 + CRM/SRM </h4>
        <h4 style="line-height: 8px;color: #F5F5DC">AI驱动：模型接入选择、口语应答、口语图表生成、数据洞察报告生成、PPT/流程图生成</h4>
      </p>
      <p style="margin-top: 68px">
        <h2 style="line-height: 30px;color: #F5F5DC">服务支持</h2>
        <h4 style="line-height: 8px;color: #F5F5DC">便捷服务：部署代办 ¥1000元/次，技术培训 ¥1000元/3h，业务培训 ¥1000元/3h，实施培训 ¥1000元/3h</h4>
        <h4 style="line-height: 8px;color: #F5F5DC">实施服务：敏捷实施（14人天 功能微调）¥36000元/工厂，标准实施（34人天 功能改扩）¥78000元/工厂</h4>
        <h4 style="line-height: 8px;color: #F5F5DC">顾问服务：技术/流程/实施的培训答疑诊断（远程为主），12月×¥5000元/月，6月×¥6000元/月，3月×¥7000元/月</h4>
      </p>
    </div>
    <div class="login-content">
      <div style="width: 300px;display: flex">
        <p style="width: 188px;">
          <span style="color: #F5F5DC;font-size:18px">抖音号（一根葱）</span>
          <img src="../assets/images/douyin_hao.png" width="168px" height="168px" />
        </p>
        <p style="width: 30px;">
        </p>
        <p style="width: 188px;">
          <span style="color: #F5F5DC;font-size:18px">微信号（一根葱）</span>
          <img src="../assets/images/weixin_hao.png" width="168px" height="168px" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt';
import logoImg from '@/assets/logo/loginLogo.png';


export default {
  name: "Login",
  data() {
    return {
      logo: logoImg,
      codeUrl: "",
      loginForm: {
        username: "admin",
        password: "factoryopen.net",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaEnabled: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
            if (this.captchaEnabled) {
              this.getCode();
            }
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.login {
  display: flex;
  justify-content: space-between; /* 两端对齐 */
  position: relative;
  align-items: center;
  min-height: 100vh; /* 改为 min-height: 100vh，确保至少占满整个视口 */
  height: auto; /* 高度自适应 */
  background-image: url("../assets/images/login-background.png");
  background-size: auto; /* 保持图片原始尺寸 */
  background-repeat: repeat; /* 图片重复平铺 */
  background-position: top left; /* 从左上角开始平铺 */
}

.background{
  position: fixed; /* 改为 fixed，固定定位 */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("../assets/images/login-background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: blur(5px);
  z-index: -1;
}

/* 左侧内容区域 - 自动占满剩余空间 */
.left-content {
  flex: 1;
  margin-left: 118px;
  padding-bottom: 80px; /* 添加底部内边距，避免内容贴底 */
}

.logo {
  height: 30px;
  margin: 0 0 0 0;
}

.title {
  margin: 0px 10px 10px auto;
  text-align: center;
  color: #707070;
}

.login-content{
  z-index: 1;
  margin-right: 200px;
  padding-bottom: 80px; /* 添加底部内边距，避免内容贴底 */
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  line-height: 5px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 12px;
  font-weight: lighter;
  letter-spacing: 1px;
  background-color: rgba(0, 0, 0, 0.3); /* 添加半透明背景，提高文字可读性 */
  padding: 10px 0;
  z-index: 10;
}

.login-code-img {
  height: 38px;
}
</style>
