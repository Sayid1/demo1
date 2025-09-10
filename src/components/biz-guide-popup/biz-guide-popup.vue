<!-- 
  * @author [杨开积]
  * @email yangkaiji@hexapodant.com
  * @create date 2024-03-21 09:16:09
  * @modify date 2024-03-21 09:16:09
  * @desc [计算结果引导弹窗]
 -->

 <template>
  <u-popup :safeAreaInsetBottom="false" mode="center" :round="11" :show="show" @close="close" @open="open">
    <view class="content-box">
      <view class="title gradient-font">建议每日补充{{opts.nutrientGapNum}}kcal</view>
      <view class="sub-title">请选择您想要了解的产品</view>
      <view class="menu-box">
        <view class="menu-item" @click="selectHandler('new')">
          <image class="product-img" :src="$ui.getCdnImage('guide-page/product-new-4.png')" />
          <view class="product-title">
            <view class="product-label">
              <image class="product-label-img" :src="$ui.getCdnImage('guide-page/icon-new-label.png')" />
            </view>
            <view class="product-title-inner">雅培全安素</view>
          </view>
          <view class="arrow-tip">
            <image class="arrow-img" :src="$ui.getCdnImage('guide-page/icon-guide-arrow.png')" />
          </view>
        </view>
        <view class="menu-item" @click="selectHandler('old')">
          <image class="product-img" :src="$ui.getCdnImage('guide-page/product-old-4.png')" />
          <view class="product-title">
            <view class="product-title-inner">全安素</view>
          </view>
          <view class="arrow-tip">
            <image class="arrow-img" :src="$ui.getCdnImage('guide-page/icon-guide-arrow.png')" />
          </view>
        </view>
      </view>
      <view class="copyright mg-t14 color-99" style="height: 220rpx;">CHN.2025.64755.AND.1</view>
      <view class="close-btn" @click="close">
        <image class="close-img" :src="$ui.getCdnImage('close.png')" />
      </view>
    </view>
  </u-popup>
</template>

<script>
import modal from '@/mixins/modal'
export default {
  data() {
    return {
      opts: {}
    }
  },
  mixins: [modal],

  methods: {
    openPopup(options) {
      this.show = true
      this.opts = options
    },
    close() {
      this.show = false
    },
    selectHandler(type){
      this.$emit('click', type)
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.content-box {
  width: 616rpx;
  height: 721rpx;
  padding: 0 49rpx;
  .gradient-font{
    background-image: linear-gradient(
			90deg,
			#d6b36d 0%,
			#d8890d 25%,
			#efd9a5 47%,
			#d8890d 73%,
			#d67900 100%
		);
    background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
  }
  .title {
    font-family: PingFang SC, PingFang SC;
    font-weight: 600;
    font-size: 43rpx;
    line-height: 51rpx;
    margin-top: 54rpx;
    text-align: center;
    
  }
  .sub-title{
    font-weight: 400;
    font-size: 25rpx;
    color: #1E3E65;
    line-height: 30rpx;
    margin-top: 42rpx;
  }
  .menu-box{
    .menu-item{
      border: 2rpx solid #C99842;
      width: 522rpx;
      height: 199rpx;
      display: flex;
      margin-top: 29rpx;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      border-radius: 18rpx;
      .product-img{
        width: 145rpx;
        height: 145rpx;
        margin: 27rpx 16rpx 0 76rpx;
      }
      .product-title{
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .product-label {
          width: 83rpx;
          height: 38rpx;
          margin-bottom: 11rpx;
          .product-label-img{
            width: 83rpx;
            height: 38rpx;
          }
        }
        .product-title-inner{
          font-size: 29rpx;
          color: #1E3E65;
          font-weight: 500;
        }
      }
      .arrow-tip{
        width: 47rpx;
        height: 47rpx;
        position: absolute;
        bottom: 18rpx;
        right: 18rpx;
        .arrow-img{
          width: 47rpx;
          height: 47rpx;
        }
      }
    }
  }
  .close-btn{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -125rpx;
    width: 72rpx;
    height: 72rpx;
    .close-img{
      width: 72rpx;
      height: 72rpx;
    }
  }
}
</style>
