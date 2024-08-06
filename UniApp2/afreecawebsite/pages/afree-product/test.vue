<template>
	<view class="u-page">
		<view class="u-demo-block">
			<text class="u-demo-block__title">基础使用</text>
			<view class="u-demo-block__content">
				<u-row customStyle="margin-bottom: 10px" gutter="10" justify="space-between">
					<u-col span="3">
						<view class="demo-layout bg-purple-light">bg-purple-light</view>
					</u-col>
					<u-col span="3">
						<view class="demo-layout bg-purple">bg-purple</view>
					</u-col>
					<u-col span="6">
						<view class="demo-layout bg-purple">bg-purple</view>
					</u-col>
				</u-row>
				
			</view>
		</view>
	</view>
</template>
<script>
	
</script>
<style lang="scss">
	.u-page{
		padding: 30px 500px;
	}
	.wrap {
		padding: 12px;
	}

	.demo-layout {
		height: 25px;
		border-radius: 4px;
	}

	.bg-purple {
		background: #CED7E1;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}
</style>