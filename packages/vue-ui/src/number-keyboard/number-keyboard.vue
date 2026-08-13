<template>
  <KyPopup
    :model-value="visible"
    position="bottom"
    :overlay="false"
    :close-on-overlay="false"
    :lock-scroll="false"
    :safe-area="safeArea"
    :teleport="teleport"
    :z-index="zIndex"
    animation="slide-up"
    panel-class="ky-number-keyboard__popup"
    :aria-label="ariaLabel"
    @update:model-value="updateVisible"
    @opened="emit('show')"
    @close="emit('hide')"
  >
    <section
      ref="keyboardElement"
      class="ky-number-keyboard"
      :class="[`ky-number-keyboard--${theme}`, { 'is-disabled': disabled }]"
      :aria-label="ariaLabel"
    >
      <header
        v-if="title || $slots.title || (theme === 'default' && closeText)"
        class="ky-number-keyboard__header"
      >
        <span class="ky-number-keyboard__title"
          ><slot name="title">{{ title }}</slot></span
        >
        <button
          v-if="theme === 'default' && closeText"
          type="button"
          class="ky-number-keyboard__header-close"
          :disabled="disabled"
          @click="closeKeyboard"
        >
          {{ closeText }}
        </button>
      </header>

      <div class="ky-number-keyboard__body">
        <div class="ky-number-keyboard__keys" role="group" aria-label="数字按键">
          <button
            v-for="key in keys"
            :key="key.id"
            type="button"
            class="ky-number-keyboard__key"
            :class="[
              `ky-number-keyboard__key--${key.type}`,
              { 'is-wide': key.span === 2, 'is-full': key.span === 3 },
            ]"
            :aria-label="key.ariaLabel"
            :disabled="disabled"
            @click="pressKey(key)"
          >
            <slot v-if="key.type === 'extra'" name="extra-key" :key-value="key.text">
              {{ key.text }}
            </slot>
            <slot v-else-if="key.type === 'delete'" name="delete">
              <span class="ky-number-keyboard__delete-icon" aria-hidden="true">⌫</span>
            </slot>
            <span v-else>{{ key.text }}</span>
          </button>
        </div>

        <div v-if="theme === 'custom'" class="ky-number-keyboard__sidebar">
          <button
            v-if="showDeleteKey"
            type="button"
            class="ky-number-keyboard__side-key ky-number-keyboard__side-key--delete"
            :aria-label="deleteText"
            :disabled="disabled"
            @click="removeLast"
          >
            <slot name="delete">
              <span class="ky-number-keyboard__delete-icon" aria-hidden="true">⌫</span>
            </slot>
          </button>
          <button
            type="button"
            class="ky-number-keyboard__side-key ky-number-keyboard__side-key--close"
            :class="{ 'is-full': !showDeleteKey }"
            :disabled="disabled"
            @click="closeKeyboard"
          >
            {{ closeText }}
          </button>
        </div>
      </div>
    </section>
  </KyPopup>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import KyPopup from '../popup';
import type { NumberKeyboardKey, NumberKeyboardProps } from './number-keyboard';

defineOptions({ name: 'KyNumberKeyboard' });
const props = withDefaults(defineProps<NumberKeyboardProps>(), {
  modelValue: '',
  visible: false,
  title: '',
  theme: 'default',
  extraKey: '',
  closeText: '完成',
  deleteText: '删除',
  maxlength: Number.POSITIVE_INFINITY,
  randomKeyOrder: false,
  showDeleteKey: true,
  hideOnClickOutside: true,
  safeArea: true,
  teleport: 'body',
  zIndex: 900,
  disabled: false,
  ariaLabel: '数字键盘',
});
const emit = defineEmits<{
  'update:modelValue': [value: string];
  'update:visible': [value: boolean];
  input: [key: string];
  delete: [];
  close: [];
  blur: [];
  show: [];
  hide: [];
}>();

const keyboardElement = ref<HTMLElement | null>(null);
const digitOrder = ref(createDigitOrder());

const normalizedExtraKeys = computed(() => {
  const values = Array.isArray(props.extraKey) ? props.extraKey : [props.extraKey];
  return values
    .map((value) => String(value))
    .filter(Boolean)
    .slice(0, props.theme === 'custom' ? 2 : 1);
});
const normalizedMaxlength = computed(() => {
  if (!Number.isFinite(props.maxlength)) return Number.POSITIVE_INFINITY;
  return Math.max(0, Math.floor(props.maxlength));
});
const keys = computed<NumberKeyboardKey[]>(() => {
  const digits = props.randomKeyOrder ? digitOrder.value : createDigitOrder();
  if (props.theme === 'custom') return createCustomKeys(digits, normalizedExtraKeys.value);
  return createDefaultKeys(digits, normalizedExtraKeys.value[0]);
});

function createDigitOrder() {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
}

function shuffleDigits() {
  const values = createDigitOrder();
  // 仅在打开键盘时重排，避免响应式更新导致用户眼前的按键位置突变。
  for (let index = values.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [values[index], values[target]] = [values[target], values[index]];
  }
  digitOrder.value = values;
}

function toDigitKey(value: string, index: number): NumberKeyboardKey {
  return {
    id: `digit-${index}-${value}`,
    type: 'digit',
    text: value,
    ariaLabel: value,
  };
}

function toExtraKey(value: string, index: number): NumberKeyboardKey {
  return {
    id: `extra-${index}-${value}`,
    type: 'extra',
    text: value,
    ariaLabel: value,
  };
}

function createDefaultKeys(digits: string[], extraKey?: string) {
  const head = digits.slice(0, 9).map(toDigitKey);
  const zero = toDigitKey(digits[9], 9);
  const result: NumberKeyboardKey[] = [...head];

  if (extraKey) result.push(toExtraKey(extraKey, 0));
  else zero.span = 2;
  result.push(zero);
  if (props.showDeleteKey) {
    result.push({ id: 'delete', type: 'delete', text: '', ariaLabel: props.deleteText });
  } else if (extraKey) {
    result[result.length - 1].span = 2;
  } else {
    zero.span = 3;
  }
  return result;
}

function createCustomKeys(digits: string[], extraKeys: string[]) {
  const head = digits.slice(0, 9).map(toDigitKey);
  const zero = toDigitKey(digits[9], 9);
  if (extraKeys.length === 0) zero.span = 3;
  if (extraKeys.length === 1) zero.span = 2;
  return [...head, ...extraKeys.map(toExtraKey), zero];
}

function pressKey(key: NumberKeyboardKey) {
  if (key.type === 'delete') {
    removeLast();
    return;
  }
  if (props.modelValue.length >= normalizedMaxlength.value) return;

  emit('update:modelValue', `${props.modelValue}${key.text}`);
  emit('input', key.text);
}

function removeLast() {
  if (props.disabled) return;
  if (props.modelValue) emit('update:modelValue', props.modelValue.slice(0, -1));
  emit('delete');
}

function updateVisible(value: boolean) {
  emit('update:visible', value);
}

function closeKeyboard() {
  if (props.disabled) return;
  emit('close');
  updateVisible(false);
}

function handleDocumentPointerDown(event: PointerEvent) {
  if (props.disabled || !props.visible || !props.hideOnClickOutside) return;
  const target = event.target;
  if (target instanceof Node && keyboardElement.value?.contains(target)) return;

  emit('blur');
  updateVisible(false);
}

watch(
  () => props.visible,
  async (visible) => {
    if (typeof document === 'undefined') return;
    document.removeEventListener('pointerdown', handleDocumentPointerDown);
    if (!visible) return;
    if (props.randomKeyOrder) shuffleDigits();
    // 等待本次打开手势完成后再监听外部点击，避免触发按钮同时把键盘关闭。
    await nextTick();
    document.addEventListener('pointerdown', handleDocumentPointerDown);
  },
  { immediate: true },
);
watch(
  () => props.randomKeyOrder,
  (enabled) => {
    if (enabled) shuffleDigits();
    else digitOrder.value = createDigitOrder();
  },
);

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('pointerdown', handleDocumentPointerDown);
  }
});
</script>
