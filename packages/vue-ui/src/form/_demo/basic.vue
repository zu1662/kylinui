<template>
  <KyForm
    :model="model"
    :rules="rules"
    :submitter="saveForm"
    @submit="handleSuccess"
    @failed="handleFailed"
    @submit-error="handleSubmitError"
  >
    <template #default="{ submitting }">
      <div class="ky-demo-stack">
        <KyFormItem name="name" label="联系人">
          <KyInput v-model="model.name" placeholder="请输入真实姓名" clearable />
        </KyFormItem>

        <KyFormItem name="phone" label="手机号">
          <KyInput
            v-model="model.phone"
            placeholder="请输入 11 位手机号"
            input-mode="numeric"
            autocomplete="tel"
            :max-length="11"
            clearable
          />
        </KyFormItem>

        <KyFormItem
          name="nickname"
          label="昵称"
          helper="输入 kylin 可查看异步校验结果"
          :rules="nicknameRules"
        >
          <KyInput v-model="model.nickname" placeholder="请输入昵称" clearable />
        </KyFormItem>

        <KySwitch v-model="hasCompany" label="填写公司信息" />
        <KyFormItem v-if="hasCompany" name="company.name" label="公司名称" required>
          <KyInput v-model="model.company.name" placeholder="请输入公司名称" clearable />
        </KyFormItem>

        <KyFormItem name="note" label="备注" helper="内容会自动扩展，最多显示 5 行">
          <KyTextarea
            v-model="model.note"
            placeholder="补充联系时间或其他要求"
            :max-length="120"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 5 }"
          />
        </KyFormItem>

        <div class="ky-form-demo__actions">
          <KyButton native-type="submit" block :loading="submitting">保存资料</KyButton>
          <KyButton native-type="reset" variant="secondary" block :disabled="submitting">
            恢复初值
          </KyButton>
        </div>
        <p class="ky-form-demo__status" role="status">{{ statusText }}</p>
      </div>
    </template>
  </KyForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormRule, FormRules, FormValidateResult } from '../index';
import { KyButton, KyInput, KySwitch, KyTextarea } from '../../index';
import KyForm, { KyFormItem } from '../index';

const model = reactive({
  name: '',
  phone: '',
  nickname: '',
  company: { name: '' },
  note: '',
});
const hasCompany = ref(false);
const statusText = ref('提交时会校验全部可见字段');
const rules: FormRules = {
  name: { required: true, message: '请填写联系人' },
  phone: [
    { required: true, message: '请填写手机号' },
    { pattern: /^1\d{10}$/, message: '请输入 11 位手机号' },
  ],
};
const nicknameRules: FormRule[] = [
  { required: true, message: '请填写昵称' },
  {
    trigger: 'onChange',
    validator: async (value) => {
      const nickname = String(value ?? '');
      await wait(nickname === 'kylin' ? 700 : 220);
      return nickname === 'kylin' ? '该昵称已被使用' : true;
    },
  },
];

function wait(duration: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

async function saveForm() {
  statusText.value = '正在提交，请勿重复操作';
  await wait(800);
}

function handleSuccess() {
  statusText.value = '保存成功';
}

function handleFailed(result: FormValidateResult) {
  statusText.value = `还有 ${result.errors.length} 个字段需要处理`;
}

function handleSubmitError() {
  statusText.value = '提交失败，请稍后重试';
}
</script>

<style scoped lang="less">
.ky-form-demo__actions {
  display: grid;
  gap: var(--ky-space-3);
}

.ky-form-demo__status {
  min-height: 22px;
  margin: 0;
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
