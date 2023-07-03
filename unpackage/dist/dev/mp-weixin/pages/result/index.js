"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      code: "",
      items: ["产品信息", "售后服务"],
      current: 0,
      srvFormData: {
        name: "",
        sex: ""
      },
      sexs: [{
        text: "先生",
        value: 0
      }, {
        text: "女士",
        value: 1
      }, {
        text: "保密",
        value: 2
      }]
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  },
  onLoad(option) {
    console.log("防伪码如下");
    console.log(option.code);
    const code = option.code;
    if (code && code != "undefined") {
      this.code = option.code;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_icons2 + _easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_segmented_control2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_col + _easycom_uni_row + _easycom_uni_segmented_control + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "info",
      size: "26",
      color: "#ffffff"
    }),
    b: common_vendor.p({
      span: 12
    }),
    c: common_vendor.p({
      span: 12
    }),
    d: common_vendor.o($options.onClickItem),
    e: common_vendor.p({
      current: $data.current,
      values: $data.items,
      styleType: "text",
      activeColor: "#007aff"
    }),
    f: common_vendor.p({
      title: `防伪码: ${$data.code}`
    }),
    g: common_vendor.p({
      title: "料件编号: Y-YYZJSF2"
    }),
    h: common_vendor.p({
      title: "品名: 言月转角沙发双人位 (含扶手箱)"
    }),
    i: common_vendor.p({
      title: "规格: 1590*900*740"
    }),
    j: common_vendor.p({
      title: "其他: 其他信息"
    }),
    k: $data.current === 0,
    l: common_vendor.o(($event) => $data.srvFormData.name = $event),
    m: common_vendor.p({
      placeholder: "请输入姓氏",
      modelValue: $data.srvFormData.name
    }),
    n: common_vendor.p({
      label: "姓氏",
      required: true
    }),
    o: common_vendor.o(($event) => $data.srvFormData.sex = $event),
    p: common_vendor.p({
      localdata: $data.sexs,
      modelValue: $data.srvFormData.sex
    }),
    q: common_vendor.p({
      label: "性别",
      required: true
    }),
    r: common_vendor.o(($event) => $data.srvFormData.phone = $event),
    s: common_vendor.p({
      type: "number",
      placeholder: "请输入手机号",
      modelValue: $data.srvFormData.phone
    }),
    t: common_vendor.p({
      label: "手机",
      required: true
    }),
    v: common_vendor.sr("form", "17ce290d-11"),
    w: common_vendor.p({
      model: $data.srvFormData
    }),
    x: $data.current === 1
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/wwwroot/vue/anti-fake-mini/pages/result/index.vue"]]);
wx.createPage(MiniProgramPage);
