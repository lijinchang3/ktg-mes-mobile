<template>
	<view class="content">
		<view class="body">
			<view style='margin-top:4%;display: flex;flex-direction: row;'>
				<button type='primary' @tap='receiptTest' :loading='isReceiptSend' :disabled='isReceiptSend'>打印</button>
			</view>
		</view>
	</view>
</template>

<script>
	var tsc = require("@/static/common/js/tsc.js");
	var esc = require("@/static/common/js/esc.js");
	var encode = require("@/static/common/js/encoding.js");
	export default {
		data(){
			return {
				content: "", //要打印的内容
				bufferSize: [],
				bufferIndex: 0,
				
			}
		}
	}
</script>

<style>
</style>