<template>
	<view class="wrap">
		<u-swiper :height="270" :list="imgList" :title="false" @click="imgListClick"></u-swiper>
		<view class="workbench-title">常用应用</view>
		<view class="toolbar">
			<u-grid class="grid" :col="4" :border="false">
				<u-grid-item :index="0" @click="navTo('/pages/sys/workbench/add-form')" >
					<view class="home-icon icon-color01">
						<i class="iconfont icon-qingjia"></i>
					</view>
					<view class="grid-text">请假申请</view>
				</u-grid-item>
				<u-grid-item :index="1" @click="navTo('')">
					<view class="home-icon icon-color04">
						<i class="iconfont icon-hetongguanli"></i>
					</view>
					<view class="grid-text">合同申请</view>
				</u-grid-item>
				<u-grid-item :index="2" @click="navTo('')">
					<view class="home-icon icon-color03">
						<i class="iconfont icon-chucha"></i>
					</view>
					<view class="grid-text">出差申请</view>
				</u-grid-item>
				<u-grid-item :index="2" @click="navTo('')">
					<view class="home-icon icon-color12">
						<i class="iconfont icon-ribao"></i>
					</view>
					<view class="grid-text">日报</view>
				</u-grid-item>
				<u-grid-item  @click="navTo('')">
					<view class="home-icon icon-color04">
						<i class="iconfont icon-tongzhi"></i>
					</view>
					<view class="grid-text">邮件</view>
				</u-grid-item>
				<u-grid-item  @click="navTo('')">
					<view class="home-icon icon-color05">
						<i class="iconfont icon-huiyishi"></i>
					</view>
					<view class="grid-text">会议室</view>
				</u-grid-item>
				<u-grid-item  @click="navTo('/pages/sys/bluetooth/index')">
					<view class="home-icon icon-color05">
						<i class="iconfont icon-huiyishi"></i>
					</view>
					<view class="grid-text">蓝牙</view>
				</u-grid-item>
				<!-- 蓝牙弹框 -->
				<view :hidden="showFlag" class="popUpWindow">
					<view class="popup_title">连接蓝牙打印机</view>
					<view v-for="(item) in deviceList" :data-title="item.deviceId" :data-name="item.name" :data-advertisData="item.advertisServiceUUIDs"
							 :key="item.deviceId" @tap="bindDevice">
						<view class="item">
							<view class="deviceId block">{{item.deviceId}}</view>
							<view class="name block">{{item.name}}</view>
						</view>
					</view>	
					<view @click="startSearchBluetooth()" class="buttons">
						<text class="popup_button">搜索蓝牙</text>
					</view>
					<view @click="stopBluetoothSearch()" class="buttons">
						<text class="popup_button">停止搜索</text>
					</view>
					<view @click="closeBluetoothWindow()" class="buttons">
						<text class="popup_button">关闭</text>
					</view>
				</view>												
				<u-grid-item  @click="navTo('/pages/sys/workbench/install')">
					<view class="home-icon icon-color13">
						<i class="iconfont icon-tianjia" style="color:#90949d;"></i>
					</view>
					<view class="grid-text">添加常用</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="workbench-title">日常办公</view>
		<view class="toolbar">
			<u-grid class="grid" :col="4" :border="false">
				<u-grid-item :index="0" @click="navTo('')" >
					<view class="home-icon icon-color04">
						<i class="iconfont icon-yongche"></i>
					</view>
					<view class="grid-text">用车</view>
				</u-grid-item>
				<u-grid-item :index="2" @click="navTo('')">
					<view class="home-icon icon-color03">
						<i class="iconfont icon-jiabanshenqing"></i>
					</view>
					<view class="grid-text">加班</view>
				</u-grid-item>
				<u-grid-item :index="2" @click="navTo('')">
					<view class="home-icon icon-color12">
						<i class="iconfont icon-kaoqinchuqin"></i>
					</view>
					<view class="grid-text">考勤</view>
				</u-grid-item>
				<u-grid-item  @click="navTo('')">
					<view class="home-icon icon-color04">
						<i class="iconfont icon-haocaifei"></i>
					</view>
					<view class="grid-text">耗材</view>
				</u-grid-item>
				<u-grid-item  @click="navTo('')">
					<view class="home-icon icon-color01">
						<i class="iconfont icon-gongwujiedai"></i>
					</view>
					<view class="grid-text">接待</view>
				</u-grid-item>
				<u-grid-item  @click="navTo('')">
					<view class="home-icon icon-color04">
						<i class="iconfont icon-baoming"></i>
					</view>
					<view class="grid-text">报名</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="workbench-title">财务报销</view>
		<view class="toolbar">
			<u-grid class="grid" :col="4" :border="false">
				<u-grid-item :index="0" @click="navTo('')" >
					<view class="home-icon icon-color04">
						<i class="iconfont icon-finance"></i>
					</view>
					<view class="grid-text">费用报销</view>
				</u-grid-item>
				<u-grid-item :index="2" @click="navTo('')">
					<view class="home-icon icon-color03">
						<i class="iconfont icon-mall-bag"></i>
					</view>
					<view class="grid-text">采购申请</view>
				</u-grid-item>
				<u-grid-item :index="2" @click="navTo('')">
					<view class="home-icon icon-color12">
						<i class="iconfont icon-baoxiaodan"></i>
					</view>
					<view class="grid-text">付款申请</view>
				</u-grid-item>
				<u-grid-item  @click="navTo('')">
					<view class="home-icon icon-color04">
						<i class="iconfont icon-shenpi"></i>
					</view>
					<view class="grid-text">用章申请</view>
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
			showFlag: true,
			blutoothSearchFlag: false,			
			deviceList: [],//蓝牙设备清单			
			services: [],//蓝牙设备的服务清单
			serviceId: 0, //当前使用的服务
			writeCharacter: false,
			readCharacter: false,
			notifyCharacter: false,
			show: false,
			head: '/static/aidex/images/head.png',
			imgList: [
				{image: '/static/aidex/banner/banner01.png'},
				{image: '/static/aidex/banner/banner02.png'}, 
				{image: '/static/aidex/banner/banner03.png'}
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
		},
		openBluetoothWindow(){
			this.showFlag = false;
		},
		closeBluetoothWindow(){
			this.showFlag = true;
		},
		//开始搜索蓝牙设备
		startSearchBluetooth(){
			let that = this;
			uni.openBluetoothAdapter({
				success(res) {
					uni.getBluetoothAdapterState({
						success(res2) {
							if(res2.available){
								that.blutoothSearchFlag = true;
								if(res2.discovering){
									uni.showToast({
										title:"正在搜索蓝牙设备",
										icon: "none"
									})
									return;
								}
								
								that.getBluetoothDevices()
							}else{
								uni.showModal({
									title: "提示信息",
									content: "本机蓝牙不可用"
								})
							}
						},
						fail() {
							uni.showModal({
								title: "提示信息",
								content: "蓝牙初始化失败，请打开蓝牙"
							})
						}
					})
				}
			})
		},
		//停止蓝牙设备搜索
		stopBluetoothSearch(){
			uni.stopBluetoothDevicesDiscovery({
				success(res) {
					this.blutoothSearchFlag = false;
					
				},
				fail(e) {
					//停止失败
					//TODO:
					console.log("停止蓝牙搜索失败!");
				}
			})
		},
		//检查权限
		checkPermission(){
			let that = this
			let {
				BLEInformation
			} = that.Bluetooth;
			let platform = BLEInformation.platform;
			that.getBluetoothDevices();
		},
		//获取蓝牙设备
		getBluetoothDevices(){
			let that = this;
			that.deviceList = [];
			uni.startBluetoothDevicesDiscovery({
				success(res) {
					plus.bluetooth.onBluetoothDeviceFound((result) =>{
						let arr = that.deviceList;
						let devices = [];
						let list = result.devices;
						for(let i=0; i<list.length; i++){
							if(list[i].name && list[i].name != '未知设备'){
								let arrNew = arr.filter((item) =>{
									return item.deviceId == list[i].deviceId;
								})
								if(arrNew.length ==0){
									devices.push(list[i]);
								}								
							}							
						}						
						that.deviceList = arr.concat(devices);
					});
					that.time = setTimeout(() => {
						plus.bluetooth.getBluetoothDevices({
							success(res2) {
								let devices = [];
								let list = res2.devices;
								for( let i=0; i< list.length; i++){
									if(list[i].name && list[i].name !='未知设备'){
										devices.push(list[i]);
									}
								}
								that.deviceList = devices;
							}
						});						
						clearTimeout(that.time);
					},3000);
				}
			})
			
		},
		//绑定蓝牙设备
		bindDevice(e){
			let that = this;
			let {
				title 
			} = e.currentTarget.dataset;
			let {
				BLEInformation
			} = that.Bluetooth;
			that.stopBluetoothSearch();
			that.serviceId = 0;
			that.writeCharacter = false;
			that.readCharacter = false;
			that.notifyCharacter = false;
			uni.showLoading({
				title: "正在连接"
			});
			plus.bluetooth.createBLEConnection({
				deviceId: title,
				success(res) {
					
					BLEInformation.deviceId = title;
					that.$u.vuex('vuex_bluetooth', BLEInformation);
					uni.hideLoading();
					that.getServiceId();
				},
				fail(err) {
					//连接失败
					//TODO:
					console.log("连接蓝牙设备失败!");
					uni.hideLoading();
				}
			})
		},
		//获取蓝牙设备的服务
		getServiceId(){
			let that = this;
			let {
				BLEInformation
			} = that.Bluetooth;
			
			let t = setTimeout(() => {
				plus.bluetooth.getBLEDeviceServices({
					deviceId: BLEInformation.deviceId,
					success(res) {
						that.services = res.services;
						that.getCharacteristics();
					},
					fail(err) {
						//TODO: 获取蓝牙设备的服务清单失败
						console.log("获取蓝牙设备的服务清单失败!");
					}
				})
			},2000);
		},
		//获取特征值
		getCharacteristics(){
			let that = this;
			let {
				services: list,
				serviceId: num,
				writeCharacter: write,
				readCharacter: read,
				notifyCharacter: notify
			} = that;
			let {
				BLEInformation
			} = that.bluetooth;
			
			plus.bluetooth.getBLEDeviceCharacteristics({
				deviceId: BLEInformation.deviceId,
				serviceId: list[num].uuid,
				success(res) {
					
					for(var i = 0;i<res.characteristics.length;i++){
						var properties = res.characteristics[i].properties;
						var item = res.characteristics[i].uuid;
						if(!notify){
							if(properties.notify){
								BLEInformation.notifyCharacterId = item;
								BLEInformation.notifyServiceId = list[num].uuid;
								that.$u.vuex('vuex_bluetooth', BLEInformation);
								notify = true;
							}
						}
						if(!write){
							if(properties.write){
								BLEInformation.writeCharacterId = item;
								BLEInformation.writeServiceId = list[num].uuid;
								that.$u.vuex('vuex_bluetooth', BLEInformation);
								write = true;
							}
						}
						if(!read){
							if(properties.read){
								BLEInformation.readCharacterId = item;
								BLEInformation.readServiceId = list[num].uuid;
								that.$u.vuex('vuex_bluetooth', BLEInformation);
								read = true;
							}
						}						
						if(!notify || !write || !read){
							num ++;
							that.notifyCharacter = notify;
							that.writeCharacter = write;
							that.readCharacter = read;
							that.serviceId = num;
							if(num == list.length){
								uni.showModal({
									title: "提示信息",
									content: "找不到该读写的特征值"
								})
							}else{
								that.getCharacteristics();
							}
						}else{
							that.openControl();
						}
					}
				},
				fail(err) {					
					//TODO:获取特征值失败
					console.log("获取特征值失败!");
				}
			})
		},
		openControl(){
			uni.navigateTo({
				url:'//pages/mes/gx/index'
			})
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
	padding:0 10px;
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
	border-radius: 12rpx;
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
.workbench-title{
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
	padding: 15px 30rpx;
}
 .home-icon i.icon-tongzhi{
	font-size: 22px;
 }
 
    .popup_content {
         position: fixed;
         top: 50%;
         left: 50%;
         width: 480rpx;
         height: 240rpx;
         margin-left: -270rpx;
         margin-top: -270rpx;
         border: 10px solid white;
         background-color: white;
         z-index: 1002;
         overflow: auto;
     }
	 
	 .popup_content_item {
	         padding-top: 5rpx;
	         height: 50rpx;
	         width: 440rpx;
	         background-color: #F1F1F1;
	         margin-top: 20rpx;
	         margin-left: 20rpx;
	         padding-top: 25rpx;
	     }
	 
	.popup_title {
	        width: 480rpx;
	        text-align: center;
	        font-size: 32rpx;
	}
	
	.buttons{
	        text-align: center;
	        font-size: 50rpx;
	        margin-top: 40rpx;
	        background-color: #007AFF;
	}
</style>
