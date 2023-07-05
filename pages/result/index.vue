<template>
	<view class="container">
		<view class="result">
			<view class="btnTitle" :class="`${btnColor}`">
				<!-- <uni-icons type="info" size="26" color="#ffffff" class="icon"></uni-icons> -->
				<text class="uni-ml-2">{{ queryResult }}</text>
			</view>
			<view class="line"></view>
			<view class="content">
				<uni-row>
					<uni-col :span="12">
						<view class="col left">
							<view class="title uni-mb-5">首查时间</view>
							<view class="value">2023-10-01 10:10</view>
						</view>
					</uni-col>
					<uni-col class="col right" :span="12">
						<view class="title uni-mb-5">查询次数</view>
						<view class="value">{{ queryTimes }}</view>
					</uni-col>
				</uni-row>
			</view>
			<!--
			<uni-list>
				<uni-list-item title="首查时间: 2023-10-01 10:10"></uni-list-item>
				<uni-list-item title="首查地点: 广东省中山市"></uni-list-item>
				<uni-list-item title="查询次数: 1"></uni-list-item>
			</uni-list>
			-->
		</view>
		<view>
			<view class="tabTitle">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#007aff"></uni-segmented-control>
			</view>
			<view class="tabContent">
				<view v-show="current === 0" class="uni-pt-5 productInfo">
					<uni-list>
						<uni-list-item :title="`防伪码: ${code}`"></uni-list-item>
						<uni-list-item title="料件编号: Y-YYZJSF2"></uni-list-item>
						<uni-list-item title="品名: 言月转角沙发双人位 (含扶手箱)"></uni-list-item>
						<uni-list-item title="规格: 1590*900*740"></uni-list-item>
						<uni-list-item title="其他: 其他信息"></uni-list-item>
					</uni-list>
				</view>
				<view v-show="current === 1" class="uni-pt-5 serviceForm">
					<view class="form">
						<view class="uni-mb-10 desc">
							<text>{{ srvFormDataTitle }}</text>
						</view>
						<uni-forms ref="form" :model="srvFormData">
							<uni-forms-item label="姓氏" required>
								<uni-easyinput :disabled="srvFormDataDisabled" v-model="srvFormData.name"
									placeholder="请输入姓氏" />
							</uni-forms-item>
							<uni-forms-item label="性别" required>
								<uni-data-checkbox :disabled="srvFormDataDisabled" v-model="srvFormData.sex"
									:localdata="sexs" />
							</uni-forms-item>
							<uni-forms-item label="手机" required>
								<uni-easyinput :disabled="srvFormDataDisabled" v-model="srvFormData.phone" type="number"
									placeholder="请输入手机号" />
							</uni-forms-item>
							<button :hidden="srvFormDataHidden" type="primary" @click="formSubmit">提交</button>
						</uni-forms>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import graceChecker from "../../common/graceChecker.js";
	import QQMapWX from '../../common/qqmap-wx-jssdk.min.js';
	// var QQMapWX = require('../../common/qqmap-wx-jssdk.min');
	export default {
		data() {
			return {
				code: '',
				items: ['产品信息', '售后服务'],
				current: 0,
				srvFormData: {
					name: '',
					sex: '',
					phone: ''
				},
				srvFormDataDisabled: false,
				srvFormDataHidden: false,
				srvFormDataTitle: '如方便请您留下相关信息，我公司将安排专人为您提供专业的售后服务及提示',
				sexs: [{
					text: '先生',
					value: 0
				}, {
					text: '女士',
					value: 1
				}, {
					text: '保密',
					value: 2
				}],
				btnColor: 'green',
				queryTimes: 1,
				queryResult: '首次查询 正品认证',
				location: '',
				province: '',
				city: '',
				district: ''
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			formSubmit() {
				// 定义表单规则
				var rule = [{
					name: "name",
					checkType: "string",
					checkRule: "1,5",
					errorMsg: "姓氏不能为空"
				}, {
					name: "phone",
					checkType: "string",
					checkRule: "11,11",
					errorMsg: "手机号不能为空或不正确"
				}];
				// 进行表单检查
				var checkRes = graceChecker.check(this.srvFormData, rule);
				if (checkRes) {
					// todo: 临时演示用
					this.srvFormDataDisabled = true;
					this.srvFormDataHidden = true;
					this.srvFormDataTitle = '感谢您选择我们的产品，近 3 天我公司将安排专人为您提供专业的售后服务及提示';
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			getAuthorize() {
				if (uni.getSystemInfoSync().platform !== 'mp-weixin') {
					return;
				}

				uni.authorize({
					scope: 'scope.userLocation',
					success: (res) => {
						this.getLocation()
					},
					fail: (err) => {
						uni.showModal({
							content: '需要授权位置信息',
							confirmText: '确认授权'
						}).then(res => {
							if (res['confirm']) {
								uni.openSetting({
									success: res => {
										if (res.authSetting['scope.userLocation']) {
											uni.showToast({
												title: '授权成功',
												icon: 'none'
											})
										} else {
											uni.showToast({
												title: '授权失败',
												icon: 'none'
											})
										}
										this.getLocation()
									}
								})
							}
							if (res['cancel']) {
								// 取消授权
								this.getLocation()
							}
						})
					}
				})
			},
			getLocation() {
				uni.getLocation({
					success: (res) => {
						const {
							latitude,
							longitude
						} = res

						const qqMapSdk = new QQMapWX({
							key: '5LYBZ-QOW2B-PWQU4-N7U46-52PH6-MFBWD'
						})
						qqMapSdk.reverseGeocoder({
							location: latitude ? `${latitude},${longitude}` : '',
							success: (val) => {
								console.log('城市信息', val)
							},
							fail: (err) => {
								console.log('获取城市失败', err)
							}
						})
					},
					fail: (err) => {
						if (err.errMsg === 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF' || err
							.errMsg === 'getLocation:fail system permission denied') {
							uni.showModal({
								content: '请开启手机定位服务',
								showCancel: false
							})
						} else if (err.errMsg === 'getLocation:fail:system permission denied') {
							uni.showModal({
								content: '请给微信开启定位权限',
								showCancel: false
							})
						}
					}
				})
			}
		},
		onLoad(option) {
			console.log('防伪码如下')
			console.log(option.code)

			const code = option.code
			if (code && code != 'undefined') {
				this.code = option.code
			}

			// todo: 临时演示用
			if (code && code == '222222') {
				this.btnColor = 'red'
				this.queryTimes = 2
				this.queryResult = '多次查询 谨防假冒'
			}

			// this.getAuthorize();
		}
	}
</script>

<style>
	.container {
		padding: 15px;
	}

	.result {
		background-color: #fff;
		text-align: center;
		margin-bottom: 20px;
		border: 2px solid #efefef;
		border-radius: 10px;
		padding: 20px 6px;
	}

	.result .btnTitle {
		padding: 10px;
		margin: 10px 10px 20px;
		color: #fff;
		border-radius: 4px;
		text-align: center;
		font-size: 16px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.result .green {
		background-color: #4CAF50;
	}

	.result .red {
		background-color: #e64340;
	}

	.result .btnTitle text {
		font-size: 20px;
	}

	.result .line {
		border-top: 2px solid #dddddd;
		margin: 0 10px;
		padding: 10px 0;
	}

	.result .content .left {
		border-right: 2px solid #dddddd;
	}

	.result .content .title {
		color: #555;
	}

	.tabTitle {
		margin-bottom: 5px;
	}

	.tabContent .serviceForm {
		background-color: #ffffff;
		padding: 10px 15px;
	}

	.tabContent .serviceForm .desc {
		font-size: 14px;
		color: #666;
	}
</style>