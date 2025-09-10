<template>
  <ui-page class="page">
    <view style="padding: 30rpx 0">
      <view class="space">演示插槽，自定义样式</view>
      <m-tabbar fill fixed safeBottom :current="current" :tabbar="tabbar2">
        <template v-slot:tabbar_index_1>
          <view class="custom_style">
            <view class="custom_style_icon">+</view>
          </view>
        </template>
      </m-tabbar>
    </view>
  </ui-page>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      tabbar2: {
        color: "#95ACBE",
        selectedColor: "#fff",
        backgroundColor: "#15357A",
        list: [
          {
            pagePath: "pages/tabbar/tabbar",
            text: "我的卡片",
            iconPath: "/static/tabbar/home-in.png",
            selectedIconPath: "/static/tabbar/home-on.png",
          },
          {
            pagePath: "pages/test/index",
            text: "解决方案",
            iconPath: "/static/tabbar/case-in.png",
            selectedIconPath: "/static/tabbar/case-on.png",
          },
          {
            pagePath: "pages/test/index",
            text: "更多信息",
            iconPath: "/static/tabbar/site-in.png",
            selectedIconPath: "/static/tabbar/site-on.png",
          },
        ],
      },
    };
  },
  onLoad() {},
  methods: {
    onClick(index) {
      console.log(index);
      this.current = index;
    },
    onChange(index) {
      const {
        tabbar1: { list },
      } = this;
      console.log("你选中的是:", list[index]);
    },
    onBeforeChange(next) {
      uni.showModal({
        title: "非法进入",
        content: "您正在非法进入其他页面,是否继续",
        success: function (res) {
          if (res.confirm) {
            next();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
