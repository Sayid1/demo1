<template>
  <view
    class="ui-page-container"
    :class="customClass"
    :style="[$u.addStyle(customStyle)]"
  >
    <ui-page-scroll :isScrollView="isScrollView" @scroll="scroll">
      <!-- 导航头 -->
      <u-navbar
        v-if="showHeaderFix"
        :fixed="true"
        :safeAreaInsetTop="true"
        :leftIcon="leftIcon || ''"
        bgColor="transparent"
        :placeholder="!immersive"
      >
        <view slot="left" style="position: relative">
          <u-icon
            v-if="showLeftIcon || showHomeIcon"
            @click="leftIconClick"
            :name="leftIcon || ''"
            size="40rpx"
            :color="titleColor"
          ></u-icon>
        </view>
        <view slot="center" :style="{ color: titleColor }">
          <view
            class="header-wrapper-bg"
            :style="[
              headerBackground,
              {
                top: -statusBarHeight + 'px',
              },
            ]"
          ></view>
          <view class="" style="position: relative" v-if="showTitle">
            <slot name="header">
              {{ headerTitle || "" }}
            </slot>
          </view>
        </view>
      </u-navbar>
      <view class="ui-page-body" :style="[bodyStyle]">
        <slot></slot>
      </view>
    </ui-page-scroll>
  </view>
</template>

<script>
import componentMixins from "@/mixins/components";
import navBarMixins from "./mixins/nav-bar";
import { getTabbarHeight, getNavbarHeight } from "@/libs/utils/sys";
// import bizCommonComponent from "./common.vue";
import { isWechat } from "@/libs/utils/wechat";
export default {
  name: "ui-page",
  mixins: [componentMixins, navBarMixins],
  // components: {
  //   bizCommonComponent,
  // },
  props: {
    // 隐藏头部导航占位符 沉浸式
    immersive: {
      type: Boolean,
      default: uni.$ui.props.page.immersive,
    },
    // 隐藏底部导航占位符 沉浸式
    immersiveBottom: {
      type: Boolean,
      default: uni.$ui.props.page.immersiveBottom,
    },
    // 固定内容高度
    fixedBodyHeight: {
      type: Boolean,
      default: uni.$ui.props.page.fixedBodyHeight,
    },
    // 是否使用scrollview
    isScrollView: {
      type: Boolean,
      default: uni.$ui.props.page.isScrollView,
    },
    // 显示底部导航 true 显示 false 隐藏  auto 自适应
    showTabbar: {
      type: [Boolean, String],
      default: uni.$ui.props.page.showTabbar,
    },
  },
  data() {
    return {
      statusBarHeight: 0,
    };
  },
  mounted() {
    this.statusBarHeight = this.$u.sys().statusBarHeight;
  },
  computed: {
    // 计算body区域
    bodyStyle() {
      let { fixedBodyHeight } = this;
      let h = this.getBodyHeight();
      return {
        height: fixedBodyHeight ? h : "auto",
        minHeight: h,
      };
    },
    // 是否显示底部导航
    isShowTabbar() {
      return (
        this.showTabbar === true ||
        (this.showTabbar === "auto" && this.tabbarCurrent !== -1)
      );
    },
    isWechat() {
      return isWechat();
    },
    showHeaderFix() {
      return this.isWechat ? false : this.showHeader;
    },
  },
  methods: {
    // 获取视图区域高度
    getBodyHeight() {
      let { immersive, isShowTabbar, immersiveBottom } = this;
      let systemInfo = uni.getSystemInfoSync();

      let h = getNavbarHeight() || 0;
      let h2 = isShowTabbar ? getTabbarHeight() || 0 : 0;
      let px =
        (immersive || !this.showHeaderFix ? 0 : h) + (immersiveBottom ? 0 : h2);
      return `calc(${
        this.isWechat ? systemInfo.safeArea.height : systemInfo.windowHeight
      }px - ${px}px)`;
    },
    scroll(evt) {
      this.$emit("scroll", evt);
    },
    // 获取全局组件实例
    getCommonComponent(ref, opts) {
      let vm = this.$refs.bizCommonComponent;

      if (vm) {
        return vm.getRef(ref, opts);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header-wrapper-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity 0.5s, background 0.5s;
  z-index: 0;
  opacity: 1;
  pointer-events: none;
}
.ui-page-container {
  min-height: 100vh;
  width: 100vw;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #fff;
}
.ui-page-body {
  width: 100%;
}
</style>
