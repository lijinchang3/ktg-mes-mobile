/**
 * tsc 命令打印工具类
 * 2021.04.26 uni-app版本
 * @auth boolTrue
 */
var encode = require("./encoding.js");
var jpPrinter = {
	createNew: function() {
		var jpPrinter = {};
		var data = "";
		var command = []
		var rawCommand = ''

		jpPrinter.name = "标签模式";

		jpPrinter.init = function() {};

		jpPrinter.addCommand = function(content) { //将指令转成数组装起
			//#ifdef MP-WEIXIN
			var code = new encode.TextEncoder(
				'gb18030', {
					NONSTANDARD_allowLegacyEncoding: true
				}).encode(content)
			for (var i = 0; i < code.length; ++i) {
				command.push(code[i])
			}
			//#endif
			
			//#ifdef APP-PLUS
			let byteCommand = plus.android.invoke(content, 'getBytes', 'gb18030');
			for (var i = 0; i < byteCommand.length; ++i) {
			  command.push(byteCommand[i])
			}
			//#endif
			
			//console.log('command--:',command)
			rawCommand += content
		}
		
		function intToByte(i) {
			// 此处关键 -- android是java平台 byte数值范围是 [-128, 127]
			// 因为java平台的byte类型是有符号的 最高位表示符号，所以数值范围固定
			// 而图片计算出来的是数值是 0 -255 属于int类型
			// 所以把int 转换成byte类型 
			//#ifdef APP-PLUS
				var b = i & 0xFF;
				var c = 0;
				if (b >= 128) {
					c = b % 128;
					c = -1 * (128 - c);
				} else {
					c = b;
				}
				return c
			//#endif
			// 而微信小程序不需要，因为小程序api接收的是 无符号8位
			//#ifdef MP-WEIXIN
				return i
			//#endif
		}

		jpPrinter.setSize = function(pageWidght, pageHeight) { //设置页面大小
			data = "SIZE " + pageWidght.toString() + " mm" + "," + pageHeight.toString() + " mm" + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setSpeed = function(printSpeed) { //设置打印机速度
			data = "SPEED " + printSpeed.toString() + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setDensity = function(printDensity) { //设置打印机浓度
			data = "DENSITY " + printDensity.toString() + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setGap = function(printGap) { //传感器
			data = "GAP " + printGap.toString() + " mm\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setCountry = function(country) { //选择国际字符集
			/*
			001:USA
			002:French
			003:Latin America
			034:Spanish
			039:Italian
			044:United Kingdom
			046:Swedish
			047:Norwegian
			049:German
			 */
			data = "COUNTRY " + country + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setCodepage = function(codepage) { //选择国际代码页
			/*
			8-bit codepage 字符集代表
			437:United States
			850:Multilingual
			852:Slavic
			860:Portuguese
			863:Canadian/French
			865:Nordic
			Windows code page
			1250:Central Europe
			1252:Latin I
			1253:Greek
			1254:Turkish
			以下代码页仅限于 12×24 dot 英数字体
			WestEurope:WestEurope
			Greek:Greek
			Hebrew:Hebrew
			EastEurope:EastEurope
			Iran:Iran
			IranII:IranII
			Latvian:Latvian
			Arabic:Arabic
			Vietnam:Vietnam
			Uygur:Uygur
			Thai:Thai
			1252:Latin I
			1257:WPC1257
			1251:WPC1251
			866:Cyrillic
			858:PC858
			747:PC747
			864:PC864
			1001:PC100
			*/
			data = "CODEPAGE " + codepage + "\r\n";
			jpPrinter.addCommand(data)
		}

		jpPrinter.setCls = function() { //清除打印机缓存
			data = "CLS" + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setFeed = function(feed) { //将纸向前推出n
			data = "FEED " + feed + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setBackFeed = function(backup) { //将纸向后回拉n
			data = "BACKFEED " + backup + "\r\n";
			jpPrinter.addCommand(data)
		}

		jpPrinter.setDirection = function(direction) { //设置打印方向，参考编程手册  
			data = "DIRECTION " + direction + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setReference = function(x, y) { //设置坐标原点，与打印方向有关
			data = "REFERENCE " + x + "," + y + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setFromfeed = function() { //根据Size进一张标签纸
			data = "FORMFEED \r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setHome = function() { //根据Size找到下一张标签纸的位置
			data = "HOME \r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setSound = function(level, interval) { //控制蜂鸣器
			data = "SOUND " + level + "," + interval + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setLimitfeed = function(limit) { // 检测垂直间距
			data = "LIMITFEED " + limit + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setBar = function(x, y, width, height) { //绘制线条
			data = "BAR " + x + "," + y + "," + width + "," + height + "\r\n"
			jpPrinter.addCommand(data)
		};

		jpPrinter.setBox = function(x_start, y_start, x_end, y_end, thickness) { //绘制方框
			data = "BOX " + x_start + "," + y_start + "," + x_end + "," + y_end + "," + thickness + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setErase = function(x_start, y_start, x_width, y_height) { //清除指定区域的数据
			data = "ERASE " + x_start + "," + y_start + "," + x_width + "," + y_height + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setReverse = function(x_start, y_start, x_width, y_height) { //将指定的区域反相打印
			data = "REVERSE " + x_start + "," + y_start + "," + x_width + "," + y_height + "\r\n";
			jpPrinter.addCommand(data)
		};

		jpPrinter.setText = function(x, y, font, x_, y_, str) { //打印文字
			data = "TEXT " + x + "," + y + ",\"" + font + "\"," + 0 + "," + x_ + "," + y_ + "," + "\"" +
				str + "\"\r\n"
			jpPrinter.addCommand(data)
		};

		jpPrinter.setQR = function(x, y, level, width, mode, content) { //打印二维码
			data = "QRCODE " + x + "," + y + "," + level + "," + width + "," + mode + "," + 0 + ",\"" +
				content + "\"\r\n"
			jpPrinter.addCommand(data)
		};

		jpPrinter.setBar = function(x, y, codetype, height, readable, narrow, wide, content) { //打印条形码
			data = "BARCODE " + x + "," + y + ",\"" + codetype + "\"," + height + "," + readable + "," + 0 +
				"," + narrow + "," + wide + ",\"" + content + "\"\r\n"
			jpPrinter.addCommand(data)
		};

		// 固定灰度阈值（128以上的都看作白色）
		jpPrinter.setBitmap = function(x, y, mode, res) { //添加图片，res为画布参数
			var width = parseInt((res.width) / 8 * 8 / 8)
			var height = res.height
			var imgWidth = res.width
			var time = 1;
			var temp = res.data.length - width * 32;
			var pointList = []
			var resultData = []
			console.log(width + "--" + height)
			data = "BITMAP " + x + "," + y + "," + width + "," + height + "," + mode + ","
			jpPrinter.addCommand(data)
			//console.log(res.data)
			console.log('---以上是原始数据---')

			//for循环顺序不要错了，外层遍历高度，内层遍历宽度，因为横向每8个像素点组成一个字节
			for (var y = 0; y < height; y++) {
				for (var x = 0; x < imgWidth; x++) {
					let r = res.data[(y * imgWidth + x) * 4];
					let g = res.data[(y * imgWidth + x) * 4 + 1];
					let b = res.data[(y * imgWidth + x) * 4 + 2];
					let a = res.data[(y * imgWidth + x) * 4 + 3]
					//console.log(`当前${y}行${x}列像素,rgba值:(${r},${g},${b},${a})`)
					// 像素灰度值
					let grayColor = r * 0.299 + g * 0.587 + b * 0.114
					//灰度值大于128位 
					//1不打印, 0打印 （参考：佳博标签打印机编程手册tspl）
					if (grayColor > 128) {
						pointList.push(1)
					} else {
						pointList.push(0)
					}
				}
			}
			//console.log(pointList)
			for (var i = 0; i < pointList.length; i += 8) {
				var p = pointList[i] * 128 + pointList[i + 1] * 64 + pointList[i + 2] * 32 + pointList[i +
						3] * 16 + pointList[i + 4] * 8 + pointList[i + 5] * 4 + pointList[i + 6] * 2 +
					pointList[i + 7]
				resultData.push(p)
			}
			console.log('最终数据：')
			//console.log(resultData)
			for (var i = 0; i < resultData.length; ++i) {
				command.push(intToByte(resultData[i]))
			}
		}

		

		jpPrinter.setBitmap2 = function(x, y, mode, res) { //添加图片，res为画布参数
			var w = res.width
			var width = parseInt((res.width + 7) / 8 * 8 / 8)
			var height = res.height;
			console.log(width + "--" + height)
			data = "BITMAP " + x + "," + y + "," + width + "," + height + "," + mode + ","
			jpPrinter.addCommand(data)
			var r = []
			var bits = new Uint8Array(height * width);
			for (y = 0; y < height; y++) {
				for (x = 0; x < w; x++) {
					let r = res.data[(y * w + x) * 4];
					let g = res.data[(y * w + x) * 4 + 1];
					let b = res.data[(y * w + x) * 4 + 2];
					let a = res.data[(y * w + x) * 4 + 3]
					var color = ((a & 0xFF) << 24) | ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | ((b & 0xFF) <<
						0);
					if ((color & 0xFF) > 128) {
						bits[parseInt(y * width + x / 8)] |= (0x80 >> (x % 8));
					}
				}
			}
			for (var i = 0; i < bits.length; i++) {
				//command.push((~bits[i]) & 0xFF);
				command.push(intToByte(bits[i]));
				//r.push((~bits[i]) & 0xFF);
			}
		}

		// 平均灰度阈值（先计算平均灰度，然后大于平均灰度的都算作白色）
		jpPrinter.setBitmap3 = function(x, y, mode, res) { //添加图片，res为画布参数
			var width = parseInt((res.width) / 8 * 8 / 8)
			var height = res.height
			var imgWidth = res.width
			var time = 1;
			var temp = res.data.length - width * 32;
			var pointList = []
			var resultData = []
			console.log(width + "--" + height)
			data = "BITMAP " + x + "," + y + "," + width + "," + height + "," + mode + ","
			jpPrinter.addCommand(data)
			//console.log(res.data)
			console.log('---以上是原始数据---')

			let sumRed = 0,
				sumGreen = 0,
				sumBlue = 0;
			let total = height * imgWidth;
			let pix = res.data;
			for (var i = 0; i < pix.length; i += 4) {
				sumRed += pix[i]
				sumGreen += pix[i + 1]
				sumBlue += pix[i + 2]
			}

			let avgRed = parseInt(sumRed / total);
			let avgGreen = parseInt(sumGreen / total);
			let avgBlue = parseInt(sumBlue / total);
			let avgGrayColor = avgRed * 0.299 + avgGreen * 0.587 + avgBlue * 0.114


			//for循环顺序不要错了，外层遍历高度，内层遍历宽度，因为横向每8个像素点组成一个字节
			for (var y = 0; y < height; y++) {
				for (var x = 0; x < imgWidth; x++) {
					let r = res.data[(y * imgWidth + x) * 4];
					let g = res.data[(y * imgWidth + x) * 4 + 1];
					let b = res.data[(y * imgWidth + x) * 4 + 2];
					let a = res.data[(y * imgWidth + x) * 4 + 3]
					// 像素灰度值
					let grayColor = r * 0.299 + g * 0.587 + b * 0.114
					//灰度值大于128位 
					//1不打印, 0打印 （参考：佳博标签打印机编程手册tspl）
					if (grayColor > avgGrayColor) {
						pointList.push(1)
					} else {
						pointList.push(0)
					}
				}
			}
			//console.log(pointList)
			for (var i = 0; i < pointList.length; i += 8) {
				var p = pointList[i] * 128 + pointList[i + 1] * 64 + pointList[i + 2] * 32 + pointList[i +
						3] * 16 + pointList[i + 4] * 8 + pointList[i + 5] * 4 + pointList[i + 6] * 2 +
					pointList[i + 7]
				resultData.push(p)

			}
			console.log('最终数据：')
			//console.log(resultData)
			for (var i = 0; i < resultData.length; ++i) {
				command.push(intToByte(resultData[i]))
			}
		}

		jpPrinter.RawCommand = function(data) {
			jpPrinter.addCommand(data)
		}

		jpPrinter.setPagePrint = function() { //打印页面
			data = "PRINT 1,1\r\n"
			jpPrinter.addCommand(data)
		};
		//获取打印数据
		jpPrinter.getData = function() {
			return command;
		};

		jpPrinter.getRawData = function() {
			return rawCommand;
		};
		jpPrinter.clearCommand = function() {
			rawCommand = ''
		};

		return jpPrinter;
	}
};

module.exports.jpPrinter = jpPrinter;
