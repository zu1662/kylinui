import { nextTick, ref } from 'vue';

export type TextInputFormatter = (value: string) => string;
export type TextInputFormatTrigger = 'onChange' | 'onBlur';

export interface TextInputControlOptions {
  getModelValue: () => string | number | undefined;
  getFormatter?: () => TextInputFormatter | undefined;
  getFormatTrigger?: () => TextInputFormatTrigger;
  preserveNumber?: boolean;
  onValue: (value: string | number) => void;
  onClear: () => void;
}

export function useTextInputControl(options: TextInputControlOptions) {
  const inputRef = ref<HTMLInputElement | null>(null);
  let composing = false;
  let compositionValue: string | undefined;

  function commit(input: HTMLInputElement, shouldFormat: boolean) {
    const raw = input.value;
    const cursor = input.selectionStart ?? raw.length;
    const formatter = options.getFormatter?.();
    const formatted = shouldFormat && formatter ? formatter(raw) : raw;

    if (formatted !== raw) {
      const nextCursor = formatter ? formatter(raw.slice(0, cursor)).length : cursor;
      input.value = formatted;
      void nextTick(() => {
        if (
          typeof document !== 'undefined' &&
          document.activeElement === input &&
          input.type !== 'number'
        ) {
          const normalizedCursor = Math.min(nextCursor, formatted.length);
          input.setSelectionRange(normalizedCursor, normalizedCursor);
        }
      });
    }

    // formatter 可能产生空格等展示字符，此时保持字符串；未格式化的数字模型继续兼容原有回写规则。
    const value =
      options.preserveNumber &&
      typeof options.getModelValue() === 'number' &&
      !formatter &&
      formatted !== ''
        ? Number(formatted)
        : formatted;
    options.onValue(value);
  }

  function update(event: Event) {
    const input = event.target as HTMLInputElement;
    if (compositionValue !== undefined && input.value === compositionValue) {
      compositionValue = undefined;
      return;
    }
    compositionValue = undefined;
    if (composing) return;
    commit(input, options.getFormatTrigger?.() !== 'onBlur');
  }

  function startComposition() {
    composing = true;
  }

  // 中文输入法结束后主动提交一次；仅跳过值相同的后续 input，避免吞掉下一次真实输入。
  function endComposition(event: CompositionEvent) {
    composing = false;
    const input = event.target as HTMLInputElement;
    commit(input, options.getFormatTrigger?.() !== 'onBlur');
    compositionValue = input.value;
  }

  function blur(event: FocusEvent) {
    if (options.getFormatTrigger?.() === 'onBlur') {
      commit(event.target as HTMLInputElement, true);
    }
  }

  function clear() {
    options.onValue('');
    options.onClear();
    inputRef.value?.focus();
  }

  return {
    inputRef,
    update,
    startComposition,
    endComposition,
    blur,
    clear,
    focus: () => inputRef.value?.focus(),
    blurInput: () => inputRef.value?.blur(),
    select: () => inputRef.value?.select(),
  };
}
