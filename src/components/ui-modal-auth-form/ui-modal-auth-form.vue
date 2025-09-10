<!-- 
    * @author [ext.yangkaiji1]
    * @email [ext.yangkaiji1@jd.com]
    * @create date 2023-09-05 19:28:29
    * @modify date 2023-09-05 19:28:29
    * @desc [用户输入头像、昵称表单弹窗]
 -->

<template>
	<u-popup
		:mode="getModalProps('mode')"
		:show="show"
		:round="getModalProps('borderRadius')"
		:z-index="getModalProps('zIndex')"
		:closeOnClickOverlay="getModalProps('maskCloseAble')"
		:closeable="false"
		:bgColor="getModalProps('bgColor')"
		@close="close"
		:safeAreaInsetBottom="getModalProps('safeAreaInsetBottom')"
	>
		<view class="content-box">
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="avatar" :src="avatarUrl"></image>
			</button>
			<view style="text-align: center;margin-bottom: 24rpx">点击更换头像</view>
			<view class="row-box" style="display: flex;">
				<view style="width: 200rpx">
					昵称
				</view>
				<view style="flex: 1">
					<input type="nickname" v-model="nickName" placeholder="请输入昵称" />
				</view>
			</view>
			<button type="primary" style="width: 100%;" @click="submit">提交</button>
		</view>
	</u-popup>
</template>

<script>
import { fetchWxUserInfoReport2 } from '@/api/user'
import modalMixnis from '@/mixins/modal.js'
export default {
	mixins: [modalMixnis],
	data() {
		return {
			nickName: '',
			avatarUrl:
				'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
		}
	},
	computed: {
		name() {
			return this.modalOpts.name
		}
	},
	methods: {
		submit() {
			fetchWxUserInfoReport2({
				nickName: this.nickName,
				avatarUrl: this.avatarUrl,
				wxAppId: uni.getAccountInfoSync().miniProgram.appId
				// encryptedData:'asd',
				// iv:'asd'
			}).then(() => {
				this.modalOpts?.onOk(this)
			})
			// if (this.nickName) {
			//     fetchWxUserInfoReport2({
			//         nickName: this.nickName,
			//         avatarUrl: this.avatarUrl,
			//         wxAppId: uni.getAccountInfoSync().miniProgram.appId,
			//         // encryptedData:'asd',
			//         // iv:'asd'
			//     }).then(() => {
			//         this.modalOpts?.onOk(this)
			//     })
			// } else {
			//     uni.showToast('请输入昵称')
			// }
		},
		onChooseAvatar(e) {
			const { avatarUrl } = e.detail
			this.pathToBase64({ url: avatarUrl, type: 'jpg' })
				.then(res => {
					this.avatarUrl = res
				})
				.catch(res => {
					console.log(res)
				})
		},
		pathToBase64({ url, type }) {
			return new Promise((resolve, reject) => {
				wx.getFileSystemManager().readFile({
					filePath: url, //选择图片返回的相对路径
					encoding: 'base64', //编码格式
					success: res => {
						resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
					},
					fail: res => reject(res.errMsg)
				})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.content-box {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
}
.avatar-wrapper {
	padding: 0;
	width: 120rpx !important;
	border-radius: 8rpx;
	margin-top: 40rpx;
	margin-bottom: 40rpx;
	border: none;
}

.avatar {
	display: block;
	width: 120rpx;
	height: 120rpx;
}
.row-box {
	border: 2rpx solid #f0f0f0;
	border-left: none;
	border-right: none;
	padding: 24rpx;
}
</style>
