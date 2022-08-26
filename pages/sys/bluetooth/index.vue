
<template>
	<view class="content">
		
		<button class="btn" type="primary" :loading="blutoothSearchFlag" @tap="startSearchBluetooth">开始搜索 </button>
		<button class="btn" type="warn" @tap="stopBluetoothSearch">停止搜索</button>
		<button class="btn" type="success" @tap="print">打印</button>
		
		
		<view v-for="(item) in deviceList" :data-title="item.deviceId" :data-name="item.name" :data-advertisData="item.advertisServiceUUIDs"
		 :key="item.deviceId" @tap="bindDevice">
			<view class="item">
				<view class="deviceId block">{{item.deviceId}}</view>
				<view class="name block">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	var tsc = require("@/static/common/js/tsc.js");
	var esc = require("@/static/common/js/esc.js");
	var encode = require("@/static/common/js/encoding.js");
	export default{
		
		data(){
			return {
				//蓝牙相关
				blutoothSearchFlag: false,
				deviceList: [],//蓝牙设备清单			
				services: [],//蓝牙设备的服务清单
				serviceId: 0, //当前使用的服务
				writeCharacter: false,
				readCharacter: false,
				notifyCharacter: false,
				//打印相关
				sendContent: "",
				buffSize: [],
				buffIndex: 0,
				printNum: 1,
				currentPrint: 1
			}
		},
		computed: mapState(['vuex_bluetooth']),
		methods: {
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
						console.log("停止成功！");
					},
					fail(e) {
						//停止失败
						//TODO:
						console.log("停止蓝牙搜索失败!");
						uni.showModal({
							title: "提示信息",
							content: "停止搜索失败"
						})
					}
				})
			},
			//检查权限
			checkPermission(){
				let that = this
				let {
					BLEInformation
				} = that.vuex_bluetooth;
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
				let BLEInformation = that.vuex_bluetooth;
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
						console.log("蓝牙设备连接成功");						
						BLEInformation.deviceId = title;
						that.$u.vuex('vuex_bluetooth', BLEInformation);
						console.log(BLEInformation);
						uni.hideLoading();
						that.getServiceId();
					},
					fail(err) {
						//连接失败
						//TODO:
						console.log("连接蓝牙设备失败!");
						uni.showModal({
							title: "提示信息",
							content: "设备连接失败"
						})
						uni.hideLoading();
					}
				})
			},
			//获取蓝牙设备的服务
			getServiceId(){
				let that = this;
				let BLEInformation = that.vuex_bluetooth;
				console.log(BLEInformation);
				let t = setTimeout(() => {
					plus.bluetooth.getBLEDeviceServices({
						deviceId: BLEInformation.deviceId,
						success(res) {
							uni.showModal({
								title: "提示信息",
								content: "服务获取成功"
							})
							that.services = res.services;
							that.getCharacteristics();
						},
						fail(err) {
							//TODO: 获取蓝牙设备的服务清单失败
							console.log("获取蓝牙设备的服务清单失败!");
							uni.showModal({
								title: "提示信息",
								content: "获取蓝牙设备的服务清单失败"
							})
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
				let BLEInformation = that.vuex_bluetooth;
				plus.bluetooth.getBLEDeviceCharacteristics({
					deviceId: BLEInformation.deviceId,
					serviceId: list[num].uuid,
					success(res) {
						console.log("特征量获取成功");
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
						}
						console.log("notif");
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
							//that.openControl();
						}						
					},
					fail(err) {					
						//TODO:获取特征值失败
						console.log("获取特征值失败!");
						uni.showModal({
							title: "提示信息",
							content: "获取特征值失败"
						})
					}
				})
			},
			openControl(){
				console.log("openControl");
				uni.navigateTo({
					url:'/pages/mes/gx/index'
				})
			},
			print(){
				var command = esc.jpPrinter.createNew();
				command.init();
				command.sendText("测试数据");
				command.setPrintAndFeedRow(1);
				
			}
		}
	}
	
	
</script>

<style>
	.btn {
			margin-top: 50rpx;
			height: 40px;
			width: 600rpx;
			line-height: 40px;
		}
	
	.item {
			display: block;
			font-family: Arial, Helvetica, sans-serif;
			font-size: 14px;
			margin: 0 30px;
			margin-top: 10px;
			background-color: #FFA850;
			border-radius: 5px;
			border-bottom: 2px solid #68BAEA;
		}
		
	.block {
			display: block;
			color: #ffffff;
			padding: 5px;
		}
</style>