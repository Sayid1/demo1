<script>
import { checkVerUpdate, getAppLaunchInfo } from "@/libs/utils/sys";
import { showShareMenu } from "@/libs/utils/share";
// import { str2param, filterUrlParams } from '@/libs/utils/url'
// import { wxLogin } from '@/libs/modules/login'

export default {
  async onLaunch(opt) {
    getAppLaunchInfo(opt);
  },
  onShow(opt) {},
  onHide(opt) {
    console.log("App Hide", opt);
  },
  methods: {},
};
</script>

<style lang="scss">
@import "~uview-ui/index.scss";
// @import "~@/style/common.scss";
// @import "~@/style/dialog.scss";
page {
  background-color: #f8f8f8;
}
.space {
  padding: 30rpx;
}
.custom_style {
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  &_icon {
    background-color: #15357a;
    font-size: 80rpx;
    width: 120rpx;
    height: 120rpx;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -40rpx;
  }
}

// .no-style-btn {
//   border: 0 !important;
//   outline: 0 !important;
//   padding: 0 !important;
//   background: none !important;
//   box-shadow: none !important;
//   color: inherit !important;
//   font-size: inherit;
//   line-height: inherit;
//   border-radius: inherit;
//   &::after {
//     border: none !important;
//   }
// }
// .safe-area-bottom {
//   height: constant(safe-area-inset-bottom);
//   height: env(safe-area-inset-bottom);
// }
// .safe-area-bottom-padding {
//   padding-bottom: constant(safe-area-inset-bottom) !important;
//   padding-bottom: env(safe-area-inset-bottom) !important;
//   box-sizing: content-box;
// }
// .u-tabbar__content {
//   background-color: rgba($color: #fff, $alpha: 0.9) !important;
//   backdrop-filter: blur(4px);
// }
// .u-navbar__content__left {
//   z-index: 1;
// }

// .u-action-sheet__item-wrap__item__name {
//   font-size: 36rpx !important;
// }
</style>
