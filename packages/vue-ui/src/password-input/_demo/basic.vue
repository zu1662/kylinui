<template>
  <div class="password-input-demo">
    <section>
      <h3>基础用法</h3>
      <KyPasswordInput
        v-model="paymentPassword"
        info="请输入 6 位支付密码"
        @complete="paymentCompleted = true"
      />
      <p v-if="paymentCompleted" class="password-input-demo__result">密码输入完成</p>
    </section>

    <section>
      <h3>分隔样式</h3>
      <KyPasswordInput
        v-model="verificationCode"
        variant="separated"
        :mask="false"
        auto-complete="one-time-code"
        info="验证码已发送至 138****8888"
      />
    </section>

    <section>
      <h3>错误状态</h3>
      <KyPasswordInput model-value="1234" error="密码位数不足，请重新输入" />
    </section>

    <section>
      <h3>配合数字键盘</h3>
      <KyPasswordInput
        v-model="keyboardPassword"
        readonly
        :focused="keyboardVisible"
        info="点击输入框唤起安全数字键盘"
        @click="keyboardVisible = true"
      />
    </section>

    <section>
      <h3>明文与禁用</h3>
      <KyPasswordInput model-value="KY2026" type="text" :mask="false" />
      <KyPasswordInput model-value="123456" disabled info="禁用状态不可编辑" />
    </section>

    <KyNumberKeyboard
      v-model="keyboardPassword"
      v-model:visible="keyboardVisible"
      :maxlength="6"
      title="请输入支付密码"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import KyNumberKeyboard from '../../number-keyboard';
import KyPasswordInput from '../index';

const paymentPassword = ref('');
const paymentCompleted = ref(false);
const verificationCode = ref('');
const keyboardPassword = ref('');
const keyboardVisible = ref(false);

watch(paymentPassword, (value) => {
  if (value.length < 6) paymentCompleted.value = false;
});
</script>

<style scoped lang="less">
.password-input-demo {
  display: grid;
  gap: var(--ky-space-6);
}

.password-input-demo section {
  display: grid;
  gap: var(--ky-space-3);
}

.password-input-demo h3 {
  margin: 0;
  font-size: var(--ky-font-size-title);
  color: var(--ky-color-text-primary);
}

.password-input-demo__result {
  margin: 0;
  font-size: var(--ky-font-size-body);
  color: var(--ky-color-success);
}
</style>
