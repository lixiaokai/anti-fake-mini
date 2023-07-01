<template>
	<view class="container">
		<view class="checkResult">
			<button type="primary">
				<text>首次查询 正品认证</text>
			</button>
			<uni-row>
				<uni-col class="col" :span="12">
					<view class="title">首查时间</view>
					<view class="content">2023-10-01 10:10</view>
				</uni-col>
				<uni-col class="col" :span="12">
					<view class="title">查询次数</view>
					<view class="content">1</view>
				</uni-col>
			</uni-row>
			<!--
			<uni-list>
				<uni-list-item title="首查时间: 2023-10-01 10:10"></uni-list-item>
				<uni-list-item title="首查地点: 广东省中山市"></uni-list-item>
				<uni-list-item title="查询次数: 1"></uni-list-item>
			</uni-list>
			-->
		</view>
		<view>
			<view>
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#007aff"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0" class="uni-pt-5">
					<uni-list>
						<uni-list-item title="料件编号: Y-YYZJSF2"></uni-list-item>
						<uni-list-item title="品名: 言月转角沙发双人位 (含扶手箱)"></uni-list-item>
						<uni-list-item title="规格: 1590*900*740"></uni-list-item>
					</uni-list>
				</view>
				<view v-show="current === 1" class="uni-pt-5">
					<view class="uni-mb-10">
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
				items: ['产品信息', '质保服务'],
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

	.checkResult {
		text-align: center;
		margin-bottom: 20px;
	}

	.checkResult .title {
		line-height: 40px;
	}
</style>