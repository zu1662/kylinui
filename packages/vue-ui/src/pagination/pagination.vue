<template>
  <nav class="ky-pagination" :class="`ky-pagination--${mode}`" aria-label="分页导航">
    <button
      type="button"
      class="ky-pagination__item ky-pagination__nav"
      :disabled="disabled || currentPage <= 1"
      aria-label="上一页"
      @click="select(currentPage - 1)"
    >
      <slot name="prev">{{ prevText }}</slot>
    </button>
    <span v-if="mode === 'simple'" class="ky-pagination__summary" aria-live="polite"
      >{{ currentPage }} / {{ totalPages }}</span
    >
    <template v-else
      ><template v-for="item in items" :key="item">
        <span v-if="typeof item !== 'number'" class="ky-pagination__ellipsis" aria-hidden="true"
          >…</span
        >
        <button
          v-else
          type="button"
          class="ky-pagination__item ky-pagination__page"
          :class="{ 'is-active': item === currentPage }"
          :disabled="disabled"
          :aria-current="item === currentPage ? 'page' : undefined"
          :aria-label="`第 ${item} 页`"
          @click="select(item)"
        >
          {{ item }}
        </button>
      </template></template
    >
    <button
      type="button"
      class="ky-pagination__item ky-pagination__nav"
      :disabled="disabled || currentPage >= totalPages"
      aria-label="下一页"
      @click="select(currentPage + 1)"
    >
      <slot name="next">{{ nextText }}</slot>
    </button>
  </nav>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import type { PaginationProps } from './pagination';
import { clampPage, getPaginationItems } from './pagination';
defineOptions({ name: 'KyPagination' });
const props = withDefaults(defineProps<PaginationProps>(), {
  modelValue: 1,
  totalItems: 0,
  itemsPerPage: 10,
  pageCount: 0,
  showPageSize: 5,
  mode: 'multi',
  forceEllipses: false,
  prevText: '上一页',
  nextText: '下一页',
  disabled: false,
});
const emit = defineEmits<{ 'update:modelValue': [page: number]; change: [page: number] }>();
const totalPages = computed(() =>
  Math.max(
    1,
    props.pageCount || Math.ceil(Math.max(props.totalItems, 0) / Math.max(props.itemsPerPage, 1)),
  ),
);
const currentPage = computed(() => clampPage(props.modelValue, totalPages.value));
const items = computed(() =>
  getPaginationItems(currentPage.value, totalPages.value, props.showPageSize, props.forceEllipses),
);
function select(page: number) {
  if (props.disabled) return;
  const next = clampPage(page, totalPages.value);
  if (next === currentPage.value) return;
  emit('update:modelValue', next);
  emit('change', next);
}
watch(totalPages, () => {
  if (currentPage.value !== props.modelValue) emit('update:modelValue', currentPage.value);
});
</script>
