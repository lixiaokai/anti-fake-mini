<template>
  <view class="container">
    <!-- <uni-title type="h1" align="center" title="防伪查询"></uni-title> -->
    <uni-forms :model="formData" ref="form" label-position="top">
      <uni-forms-item name="securityCode">
        <uni-easyinput focus confirmType="查验" type="text" suffixIcon="scan" v-model="formData.securityCode"
          placeholder="20 位防伪码" @iconClick="scanQR"></uni-easyinput>
      </uni-forms-item>
    </uni-forms>
    <button type="primary" @click="formSubmit">开始查验</button>
  </view>
</template>

<script>
  import graceChecker from "../../common/graceChecker.js"
  export default {
    data() {
      return {
        // 表单数据
        formData: {
          securityCode: ''
        }
      }
    },
    onLoad(option) {
      const {
        q
      } = option;
      if (q && q != 'undefined') {
        // 获取到二维码原始链接内容
        const url = decodeURIComponent(q);
        console.log(url);
        // 此处就是我们要获取的参数 json，通过方法解析
        let jsonUrl = this.getwxUrlParam(url);
        // 比如我要得到 id 的值，直接取值即可
        let code = jsonUrl.code;
        console.log('code：' + code);

        if (code && code != 'undefined') {
          this.formData.securityCode = code;
        }
      }
    },
    methods: {
      formSubmit() {
        // 定义表单规则
        var rule = [{
          name: "securityCode",
          checkType: "string",
          checkRule: "6,6",
          errorMsg: "防伪码应为 6 个字符"
        }];
        // 进行表单检查
        var checkRes = graceChecker.check(this.formData, rule);
        if (checkRes) {
          uni.showToast({
            title: "验证通过!",
            icon: "none"
          });
          uni.navigateTo({
            url: "/pages/result/index?code=" + this.formData.securityCode
          });
        } else {
          uni.showToast({
            title: graceChecker.error,
            icon: "none"
          });
        }
      },
      getwxUrlParam(url) {
        let theRequest = {};
        if (url.indexOf('#') != -1) {
          const str = url.split('#')[1];
          const strs = str.split('&');
          for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
          }
        } else if (url.indexOf('?') != -1) {
          const str = url.split('?')[1];
          const strs = str.split('&');
          for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
          }
        }
        return theRequest;
      },
      scanQR() {
        uni.scanCode({
          success: res => {
            console.log('条码类型：' + res.scanType);
            console.log('条码内容：' + res.result);

            const url = res.result;
            let jsonUrl = this.getwxUrlParam(url);
            let code = jsonUrl.code;
            console.log('code：' + code);

            if (code && code != 'undefined') {
              this.formData.securityCode = code;
            } else {
              this.formData.securityCode = '';
              uni.showToast({
                title: "请扫一扫正确的防伪码!",
                icon: "none"
              });
            }
          }
        });
      }
    }
  }
</script>

<style>
  .container {
    padding: 15px;
  }
</style>