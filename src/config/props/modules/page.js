export default {
  headerBackground: () => {
    return {
      backgroundColor: "#568b96",
    };
  },
  // 头部左边图标一直显示
  showHeaderLeftIconAlway: false,
  // 是否显示头部左边图标
  showHeaderLeftIcon: null,
  // 是否显示头部导航
  showHeader: true,
  // 隐藏头部返回首页按钮
  hideHomeIcon: false,
  // 是否显示头部标题
  showTitle: true,
  // 左边图标
  headerLeftIcon: "",
  // 头部标题颜色
  titleColor: "#fff",
  // 头部标题
  title: "",
  tabbarList: () => {
    return [];
  },
  // 隐藏头部导航占位符 沉浸式
  immersive: false,
  // 隐藏底部导航占位符 沉浸式
  immersiveBottom: false,
  // 固定内容高度
  fixedBodyHeight: false,
  isScrollView: false,
  // 显示底部导航 true 显示 false 隐藏  auto 自适应
  showTabbar: "auto",
  autoBack: true,
  hideHomeIconInTabbar: true,
};
