<template xmlns="http://www.w3.org/1999/html">
  <div class="login">
    <div class="background"></div>
    <div style="margin-left: 200px">
      <div style="position: absolute;left: 188px;top: 40px;color: #2D2D2D">
        <H1 style="line-height: 26px">factoryOpen，智能工厂开源工具包</H1>
        <H4 style="line-height: 10px">基于若依（www.ruoyi.vip）开源框架，面向中小工厂一体化设计，可快速上手</H4>
      </div>
      <p style="margin-top: 75px">
        <h2 style="line-height: 30px;color: #F5F5DC">QuickFactory开源项目</h2>
        <h4 style="line-height: 8px;color: #F5F5DC">源码下载：<a href="https://gitee.com/factoryopen/quickfactory">https://gitee.com/factoryopen/quickfactory</a></h4>
        <h4 style="line-height: 8px;color: #F5F5DC">开放协议：Apache-2.0</h4>
      </p>
      <p style="margin-bottom: 40px">
        <h2 style="line-height: 30px;color: #F5F5DC">领域与技术</h2>
        <h4 style="line-height: 8px;color: #F5F5DC">软件性质：综合性工业互联网平台</h4>
        <h4 style="line-height: 8px;color: #F5F5DC">业务领域：CRM + PLM + ERP + MES + IIoT适配 + 数字孪生</h4>
        <h4 style="line-height: 8px;color: #F5F5DC">开源技术：Ruoyi (Spring boot + vue + mysql)</h4>
        <h4 style="line-height: 8px;color: #F5F5DC">特色能力：低代码开发 + 数字孪生DIY</h4>
        <h4 style="line-height: 8px;color: #F5F5DC">价值定位：<span style="color: yellow">省级智能车间，市级智能工厂（绿色工厂）</span></h4>
      </p>
      <p style="margin-top: 40px">
        <h2 style="line-height: 30px;color: #F5F5DC">部署包支持</h2>
        <h4 style="line-height: 8px;color: #F5F5DC">Free无限制部署包下载： <a href="">factoryopen_quickfactory_free2.0.0.zip（微信索取，赞助咖啡1杯 ¥36）</a></h4>
        <h4 style="line-height: 8px;color: #F5F5DC">便利服务：部署/培训/首页与Logo更换 360元/次，增改 180-980元/功能</h4>
        <h4 style="line-height: 8px;color: #F5F5DC">进阶服务：个性培训 800元/小时，远程实施 1.8-4.8万元/企，2.5d数字孪生8800元/车间</h4>
      </p>
      <div style="width: 480px;display: flex">
        <p style="width: 128px;">
          <span style="color: #F5F5DC;font-size:14px">抖音号</span>
          <img src="../assets/images/douyin_hao.png" width="110px" height="110px" />
        </p>
        <p style="width: 30px;">
        </p>
        <p style="width: 128px;">
          <span style="color: #F5F5DC;font-size:14px">微信号</span>
          <img src="../assets/images/weixin_hao.png" width="110px" height="110px" />
        </p>
      </div>

    </div>
    <div class="login-content">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h4 class="title">
          <img :src="logo" class="logo" alt="logo">
          factoryopen.net
        </h4>
        <h4 class="title" style="line-height: 30px">
          QuickFactory Git开源版
        </h4>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            placeholder="账号"
          >
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaEnabled">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img"/>
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div style="float: right;" v-if="register">
            <router-link class="link-type" :to="'/register'">立即注册</router-link>
          </div>
        </el-form-item>
      </el-form>
      <p>
        <p style="line-height: 6px; color: antiquewhite; font-size: 15px; font-weight: bold">体验账号（密码均为factoryopen.net）</p>
        <p style="line-height: 6px; color: yellow; font-size: 13px">超级管理员admin，多处理作业员duochuli</p>
        <p style="line-height: 6px; color: antiquewhite; font-size: 13px">产品工艺gongyi，业务员yewuyan，跟单员gendan，会计kuaiji</p>
        <p style="line-height: 6px; color: antiquewhite; font-size: 13px">交管员jiaoguan，计划员jihua，调度员diaodu</p>
        <p style="line-height: 6px; color: antiquewhite; font-size: 13px">采购员caigou，库管员kuguan，质检员zhijian，质保员zhibao</p>
        <p style="line-height: 6px; color: antiquewhite; font-size: 13px">下料工xialiao，机加工jijia，数控工shukong</p>
        <p style="line-height: 6px; color: antiquewhite; font-size: 13px">热处工rechu，成检工chengjian</p>
        <p style="line-height: 6px; color: yellow; font-size: 13px">注：2.5d车间数字孪生，微信联系演示</p>
      </p>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <p>
        <span>©2024-2025 <a target="_blank" href="http://www.factoryopen.net">www.factoryopen.net</a>, All Rights Reserved，</span>
        <a target="_blank" href="http://beian.miit.gov.cn" >皖ICP备2025085041号</a>
      </p>
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
.login {
  display: flex;
  justify-content: center;
  position: relative; /* 定位基准 */
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.png");
  background-size: cover;
}
.background{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  //background: url("../assets/images/login-background.jpg");
  background-size: cover;
  filter: blur(5px);
  z-index: -1;
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
  margin-left: auto;
  margin-right: 200px;
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
}
.login-code-img {
  height: 38px;
}
</style>
