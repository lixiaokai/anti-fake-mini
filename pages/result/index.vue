<template>
	<view class="container">
		<view class="result">
			<view class="btnTitle">
				<uni-icons type="info" size="26" color="#ffffff" class="icon"></uni-icons>
				<text class="uni-ml-5">首次查询 正品认证</text>
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
						<view class="value">1</view>
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
					<view class="uni-mb-10 desc">
						<text>如方便请您留下相关信息，我公司将安排专人为您提供专业的售后服务及提示</text>
					</view>
					<uni-forms ref="form" :model="srvFormData">
						<uni-forms-item label="姓氏" required>
							<uni-easyinput v-model="srvFormData.name" placeholder="请输入姓氏" />
						</uni-forms-item>
						<uni-forms-item label="性别" required>
							<uni-data-checkbox v-model="srvFormData.sex" :localdata="sexs" />
						</uni-forms-item>
						<uni-forms-item label="手机" required>
							<uni-easyinput v-model="srvFormData.phone" type="number" placeholder="请输入手机号" />
						</uni-forms-item>
						<button type="primary">提交</button>
					</uni-forms>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				items: ['产品信息', '售后服务'],
				current: 0,
				srvFormData: {
					name: '',
					sex: ''
				},
				sexs: [{
					text: '先生',
					value: 0
				}, {
					text: '女士',
					value: 1
				}, {
					text: '保密',
					value: 2
				}]
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		},
		onLoad(option) {
			console.log('防伪码如下')
			console.log(option.code)

			const code = option.code
			if (code && code != 'undefined') {
				this.code = option.code
			}
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
		background-color: #4CAF50;
		color: #fff;
		border-radius: 4px;
		text-align: center;
		font-size: 16px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
		box-sizing: border-box;
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