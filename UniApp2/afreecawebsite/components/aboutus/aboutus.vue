<template>
	<view class="subcontainer">
		<view class="itembox">
			<p>阿飞卡工作室，一家专注于移动游戏领域的创新型研发企业，自2018年成立以来，一直秉承着创新、专注和卓越的企业精神。我们拥有一支由30位充满激情和才华的游戏开发者组成的专业团队，他们来自不同的背景，但共同拥有对游戏的无限热爱和对品质的极致追求。</p>
			
			<p>在短短几年内，阿飞卡工作室凭借其独特的创意和精湛的技术，成功开发并推出了多款深受玩家喜爱的放置挂机类（IDLE）手机游戏。我们的游戏以其轻松上手、趣味性强和创新玩法而著称，为玩家提供了在忙碌生活中随时享受游戏乐趣的可能。
			
			我们的产品线涵盖了多种题材和风格，从奇幻冒险到现代都市，从策略经营到角色扮演，每一款游戏都是我们对创新和用户体验的不懈追求的体现。我们相信，通过不断的技术革新和创意探索，阿飞卡工作室能够为全球玩家带来更多令人难忘的游戏体验。</p>
			
			<p>随着移动游戏行业的蓬勃发展，阿飞卡工作室正以开放的心态和前瞻的视野，积极探索新的游戏类型和市场机会。我们致力于成为全球领先的手机游戏研发商，为玩家创造更多价值，为行业贡献更多力量。加入阿飞卡，让我们一起在游戏的世界里，飞得更高，走得更远。</p>
		</view>

	</view>
</template>

<script>
	export default {
		name: "aboutus",
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
		border-radius: 10px;
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

		.itembox {
			color: #636363;
			line-height: 1.8;
			text-indent: 2em;
			p {
			    margin-bottom: 1em; /* 段落底部的外边距为1em */
			}
		}
	}
</style>