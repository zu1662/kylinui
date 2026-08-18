<template>
  <KyForm :model="model" :rules="rules" v-bind="configProps" @submit="submitted = true">
    <template #default="{ submitting }">
      <div class="ky-demo-stack">
        <KyFormItem name="name" label="联系人">
          <KyInput v-model="model.name" placeholder="请输入联系人" clearable />
        </KyFormItem>
        <KyFormItem name="note" label="备注" helper="最多输入 80 个字符">
          <KyTextarea
            v-model="model.note"
            placeholder="补充配送要求"
            :max-length="80"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </KyFormItem>
        <KyButton native-type="submit" block :loading="submitting">提交表单</KyButton>
        <p v-if="submitted" class="ky-form-usage__status" role="status">表单已通过校验</p>
      </div>
    </template>
  </KyForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormRules } from '../index';
import { KyButton, KyInput, KyTextarea } from '../../index';
import KyForm, { KyFormItem } from '../index';

defineProps<{ configProps: Record<string, unknown> }>();

const model = reactive({ name: '', note: '' });
const submitted = ref(false);
const rules: FormRules = {
  name: { required: true, message: '请填写联系人' },
};
</script>

<style scoped lang="less">
.ky-form-usage__status {
  margin: 0;
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-success);
  text-align: center;
}
</style>
