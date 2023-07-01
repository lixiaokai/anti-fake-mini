"use strict";
const common_vendor = require("../../common/vendor.js");
const common_graceChecker = require("../../common/graceChecker.js");
const _sfc_main = {
  data() {
    return {
      // 表单数据
      formData: {
        securityCode: ""
      }
    };
  },
  onLoad(option) {
    const {
      q
    } = option;
    if (q && q != "undefined") {
      const url = decodeURIComponent(q);
      console.log(url);
      let jsonUrl = this.getwxUrlParam(url);
      let code = jsonUrl.code;
      console.log("code：" + code);
      if (code && code != "undefined") {
        this.formData.securityCode = code;
      }
    }
  },
  methods: {
    formSubmit() {
      var rule = [{
        name: "securityCode",
        checkType: "string",
        checkRule: "6,6",
        errorMsg: "防伪码应为 6 个字符"
      }];
      var checkRes = common_graceChecker.graceChecker.check(this.formData, rule);
      if (checkRes) {
        common_vendor.index.showToast({
          title: "验证通过!",
          icon: "none"
        });
        common_vendor.index.navigateTo({
          url: "/pages/result/index?code=" + this.formData.securityCode
        });
      } else {
        common_vendor.index.showToast({
          title: common_graceChecker.graceChecker.error,
          icon: "none"
        });
      }
    },
    getwxUrlParam(url) {
      let theRequest = {};
      if (url.indexOf("#") != -1) {
        const str = url.split("#")[1];
        const strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
      } else if (url.indexOf("?") != -1) {
        const str = url.split("?")[1];
        const strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
    scanQR() {
      common_vendor.index.scanCode({
        success: (res) => {
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
          const url = res.result;
          let jsonUrl = this.getwxUrlParam(url);
          let code = jsonUrl.code;
          console.log("code：" + code);
          if (code && code != "undefined") {
            this.formData.securityCode = code;
          } else {
            this.formData.securityCode = "";
            common_vendor.index.showToast({
              title: "请扫一扫正确的防伪码!",
              icon: "none"
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.scanQR),
    b: common_vendor.o(($event) => $data.formData.securityCode = $event),
    c: common_vendor.p({
      focus: true,
      confirmType: "查验",
      type: "text",
      suffixIcon: "scan",
      placeholder: "20 位防伪码",
      modelValue: $data.formData.securityCode
    }),
    d: common_vendor.p({
      name: "securityCode"
    }),
    e: common_vendor.sr("form", "6b6b3bf6-0"),
    f: common_vendor.p({
      model: $data.formData,
      ["label-position"]: "top"
    }),
    g: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/admin/wwwroot/vue/anti-fake-mini/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
