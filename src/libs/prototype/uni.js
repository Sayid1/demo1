import globalComponents from "@/libs/utils/global-components";
import * as app from "@/libs/modules/app";
import { navTo, navToMix, navBack } from "@/libs/utils/router";
import { setShareMessage } from "@/libs/utils/share";
import { getAccountInfoSync } from "@/libs/utils/sys";
import * as cdnUtils from "@/libs/utils/cdn";
import { setStorageSync, getStorageSync } from "@/libs/utils/storge";
uni.getAccountInfoSync = getAccountInfoSync;

function setConfig({ props = {}, config = {}, mixins = {}, store = {} }) {
  const { deepMerge } = uni.$u;
  uni.$ui.props = deepMerge(uni.$ui.props, props);
  uni.$ui.mixins = deepMerge(uni.$ui.mixins, mixins);
  uni.$ui.config = deepMerge(uni.$ui.config, config);
  uni.$ui.store = deepMerge(uni.$ui.store, store);
}

if (!uni.$ui) {
  uni.$ui = {};
}
let config = {
  ...globalComponents,
  ...app,
  navTo,
  navToMix,
  navBack,
  setShareMessage,
  setStorageSync,
  getStorageSync,
  addUnit(val, unit) {
    return uni.$u.addUnit(val, unit || "rpx");
  },
  setConfig,
  ...cdnUtils,
};

for (let p in config) {
  if (
    [
      "showToast",
      "showLoading",
      "hideLoading",
      "setStorageSync",
      "getStorageSync",
    ].includes(p)
  ) {
    uni[p] = config[p];
  } else {
    uni.$ui[p] = config[p];
  }
}
