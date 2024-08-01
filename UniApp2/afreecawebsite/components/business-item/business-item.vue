<template>
	<view class="subcontainer">
		<view class="leftbox"><img src="@/static/images/location.png" alt=""></view>
		<view class="rightbox">
			<span style="font-size: 22px;font-weight: bold;">公司地址：</span>
			<span>Contact：老宠虫</span>
			<span>WeChat：crazybunny002</span>
			<span>Address：广东省深圳市宝安区前海科兴科学园8栋2008室 阿飞卡游戏</span>
			<br>
			<span style="font-size: 22px;font-weight: bold;">建议路径：</span>
			<span>1，深圳本市合作伙伴搭乘地铁：碧海湾地铁站出站后，依照地图软件所示，步行10分钟即可达到；</span><br>
			<span>2，深圳本地合作伙伴打车或自驾：从东边老科兴或者软件园片区前来的话，尽量走北环、月亮湾大道以及沿江高速可大大缩短时间；</span><br>
			<span>3，广州合作伙伴自驾：从广州自驾经沿江高速60分钟即可达到；</span><br>
			<span>4，外地合作伙伴建议飞行：从宝安国际机场打车30分钟即可达到；</span>
		</view>
	</view>
</template>

<script>
	export default {
		name: "business-item",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.subcontainer {
		box-shadow:
			3px 0 2px -2px rgba(0, 0, 0, 0.2),
			/* 右侧阴影 */
			-3px 0 2px -2px rgba(0, 0, 0, 0.2),
			/* 左侧阴影 */
			0 3px 2px -2px rgba(0, 0, 0, 0.2),
			/* 下方阴影 */
			0 -3px 2px -2px rgba(0, 0, 0, 0.2);
		/* 上方阴影 */
		border-radius: 5px;
		padding-top: 70px;
		padding-left: 70px;
		padding-right: 70px;
		padding-bottom: 70px;
		background-color: #fff;
		width: 1000px;
			
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		.rightbox {
			flex: 1;
			padding: 50px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			line-height: 1.8;
			
		}
		
		.leftbox {
			width: 500px;
			height: 700px;
			
			// background-color: #6effbc;
		
			img {
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px solid #ecebeb;
			}
		}
	}
</style>