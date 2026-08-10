<template>
  <div class="ky-rating" :class="{ 'is-disabled': disabled }" role="radiogroup" :aria-label="label">
    <button
      v-for="index in count"
      :key="index"
      type="button"
      role="radio"
      :aria-checked="index === modelValue"
      :aria-label="index + ' 分'"
      :disabled="disabled || readonly"
      :class="{ 'is-active': index <= modelValue }"
      @click="select(index)"
    >
      <KyIcon source="iconfont" :name="index <= modelValue ? 'enshrine' : 'enshrine-line'" :size="26" />
    </button>
    <output>{{ modelValue }} 分</output>
  </div>
</template>

<script setup lang="ts">
import KyIcon from '../icon';
import type { RatingProps } from './rating';

defineOptions({ name: 'KyRating' });
const props = withDefaults(defineProps<RatingProps>(), { modelValue: 0, count: 5, label: '评分' });
const emit = defineEmits<{ 'update:modelValue': [number]; change: [number] }>();

// 每颗星使用独立按钮和单选语义，触控热区由样式保证不小于 44 像素。
function select(value: number) {
  if (!props.disabled && !props.readonly) {
    emit('update:modelValue', value);
    emit('change', value);
  }
}
</script>
