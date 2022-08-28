<template>
	<view class="wrap">
		<u-swiper :height="450" :border-radius="0" :list="imgList" :title="false" @click="imgListClick"></u-swiper>
		<view class="shortcut">
			<u-grid :border="false" :col="4">
				<u-grid-item @click="navTo('/pages/sys/workbench/add-form')" >
					<view class="shortcut-icon icon-color01">
						<i class="iconfont icon-qingjia"></i>
					</view>
					<view class="grid-text">生产报工</view>
				</u-grid-item>
				<u-grid-item @click="navTo('/pages/sys/workbench/add-form')" >
					<view class="shortcut-icon icon-color02">
						<i class="iconfont icon-qingjia"></i>
					</view>
					<view class="grid-text">请假申请</view>
				</u-grid-item>
				<u-grid-item @click="navTo('/pages/sys/workbench/add-form')" >
					<view class="shortcut-icon icon-color03">
						<i class="iconfont icon-qingjia"></i>
					</view>
					<view class="grid-text">请假申请</view>
				</u-grid-item>
				<u-grid-item @click="navTo('/pages/sys/workbench/add-form')" >
					<view class="shortcut-icon icon-color04">
						<i class="iconfont icon-qingjia"></i>
					</view>
					<view class="grid-text">请假申请</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-notice-bar class="noticebar" :duration="3000" :font-size="30" mode="vertical" :list="msglist"></u-notice-bar>
		<view class="workflow">
			<u-grid :border="false" :col="4">
				<u-grid-item @click="navTo('/pages/sys/workbench/add-form')" >
					<view class="workflow-icon icon-color01">
						<i class="iconfont icon-daibanshiwu"></i>
					</view>
					<view class="grid-text">待办</view>
				</u-grid-item>
				<u-grid-item @click="navTo('/pages/sys/workbench/add-form')" >
					<view class="workflow-icon icon-color02">
						<i class="iconfont icon-banjieshiwu"></i>
					</view>
					<view class="grid-text">已办</view>
				</u-grid-item>
				<u-grid-item @click="navTo('/pages/sys/workbench/add-form')" >
					<view class="workflow-icon icon-color03">
						<i class="iconfont icon-daibanshixiang"></i>
					</view>
					<view class="grid-text">待阅</view>
				</u-grid-item>
				<u-grid-item @click="navTo('/pages/sys/workbench/add-form')" >
					<view class="workflow-icon icon-color04">
						<i class="iconfont icon-daibanshixiang2"></i>
					</view>
					<view class="grid-text">已阅</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="tongji">
			<u-grid :border="false" :col="2">
				<u-grid-item @click="navTo('/pages/sys/workbench/add-form')">
					<view class="tongji-card">
						
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="tongji-card">
						
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="tongji-card">
						
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="tongji-card">
						
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="tongji-card">
						
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="tongji-card">
						
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="tongji-card">
						
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="tongji-card">
						
					</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-divider>已经到底了</u-divider>
	</view>
	
</template>
<script>
	 import HeadNavBar from '@/components/headnavbar/index';
/**
 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
 */
export default {
	components: {
	  HeadNavBar
	},
	data() {
		return {
			show: false,
			head: '/static/aidex/images/head.png',
			imgList: [
				{image: '/static/aidex/banner/banner01.png'},
				{image: '/static/aidex/banner/banner02.png'}, 
				{image: '/static/aidex/banner/banner03.png'}
			],
			msglist: [
				'国庆节放假通知！',
				'系统异常通知'
			],
			todoCount: 3
		};
	},
	onLoad() {
		
	},
	methods: {
		navTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		imgListClick(index) {
			console.log(`点击了第${index + 1}页图片`)
		},
		itemClick(index) {
			console.log(index);
		}
	}
};
</script>
<style lang="scss">
@import 'index.scss';
.banner-box{
	padding: 0 2%;
	width: 96%;
	height: 170rpx;
	margin: 30rpx 0 30rpx;
}
.u-swiper-wrap{
	padding:0 0px;
}

.banner-pic{
	width: 47%;
	float: left;
	display: inline-block;
	margin: 0 1.5%;
}
.banner-pic image{
	width: 100%;
	height: 170rpx;
	box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}


.u-mode-light-info{
    background-color: #ffffff;
    color: #666666;
    border: 1px solid #e9ecf6;
	font-size: 12px;
	padding: 2px 8px;
	position: relative;
	top:-3px;
}

//快捷方式部分
.shortcut {
	border-radius: 10px;
	padding-top: 15px;
	height: 89px;
}

.shortcut-icon {
 	width: 48px;
 	height: 48px;
	align-items: center;
 	border-radius: 10px;
 	box-sizing: border-box;
	display: flex;
	justify-content: center;
	color:#ffffff;
	font-size: 26px;
 }
 .shortcut-icon i{
	font-size: 26px;
 }

.noticebar{
	margin: 5px 5px;
}

.workflow {
	border-radius: 10px;
	padding-top: 10px;
	height: 89px;
}

.workflow-icon {
 	width: 48px;
 	height: 48px;
	align-items: center;
 	border-radius: 30px;
 	box-sizing: border-box;
	display: flex;
	justify-content: center;
	color:#ffffff;
	font-size: 26px;
 }
 .workflow-icon i{
	font-size: 26px;
 }
 
 .tongji-card {
 	 width: 160px;
 	 height: 120px;
	 border-radius: 5px;
	 box-shadow:  1px 2px 3px rgba(0, 0, 0, 0.2);
 }

</style>
