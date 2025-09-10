<template>
     <u-overlay
        z-index="20000"
        :show="show"
        @click="maskClick"
        :custom-style="{
            background: 'transparent',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'pointer-events': 'none'
        }"
    >
        <view class="u-flex u-col-center u-row-center loading-container">
            <view class="">
                <u-loading-icon size="60rpx"></u-loading-icon>
                <view class="loading-text" v-if="text">
                    {{ text }}
                </view>
            </view>
        </view>
    </u-overlay>
</template>

<script>
import modalMixins from '@/mixins/modal.js'
import componentMixins from '@/mixins/components'
export default {
    name: 'ui-toast-loading',
    mixins: [modalMixins, componentMixins],
    data() {
        return {
            text: '',
            mask: true
        }
    },
    methods: {
        showLoading(opt = {}) {
            this.text = opt.title || ''
            this.mask = !opt.mask
            this.open()
        },
        hideLoading() {
            this.text = ''
            this.close()
        },
        maskClick() {
            if (!this.mask) {
                this.show = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.loading-container {
    width: 250rpx;
    height: 250rpx;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20rpx;
    color: #fff;
    text-align: center;

    .loading-text {
        margin-top: 10rpx;
    }
}
</style>
