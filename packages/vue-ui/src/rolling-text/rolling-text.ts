import type { ComponentPublicInstance } from 'vue';

export type RollingTextValue = number | string;
export type RollingTextDirection = 'up' | 'down';

export interface RollingTextProps {
  /** 结束数值。 */
  value?: RollingTextValue;
  /** 起始数值；未传入时按当前位数使用全零。 */
  startValue?: RollingTextValue;
  /** 动画时长，单位毫秒。 */
  duration?: number;
  /** 是否在挂载和数值变化后自动播放。 */
  autoStart?: boolean;
  /** 数字滚动方向。 */
  direction?: RollingTextDirection;
  /** 至少展示的整数位数，不足时在左侧补零。 */
  minIntegerDigits?: number;
  /** 固定展示的小数位数。 */
  decimalPlaces?: number;
  /** 是否显示千位分隔符。 */
  thousands?: boolean;
  /** 数字滚动是否呈现错峰效果。 */
  stagger?: boolean;
}

export interface RollingTextExpose {
  start: () => void;
  reset: () => void;
}

export type RollingTextInstance = ComponentPublicInstance<RollingTextProps, RollingTextExpose>;

export interface RollingTextCharacter {
  key: string;
  value: string;
  digit: boolean;
  startDigit: number;
  endDigit: number;
  digitIndex: number;
}

export function normalizeRollingNumber(value: RollingTextValue): number {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export function formatRollingNumber(
  value: RollingTextValue,
  decimalPlaces = 0,
  minIntegerDigits = 1,
  thousands = false,
): string {
  const normalizedPlaces = Math.min(12, Math.max(0, Math.trunc(decimalPlaces) || 0));
  const normalizedIntegerDigits = Math.max(1, Math.trunc(minIntegerDigits) || 1);
  const fixed = Math.abs(normalizeRollingNumber(value)).toFixed(normalizedPlaces);
  const [integer, decimal] = fixed.split('.');
  const paddedInteger = integer.padStart(normalizedIntegerDigits, '0');
  const groupedInteger = thousands
    ? paddedInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : paddedInteger;
  const sign = normalizeRollingNumber(value) < 0 ? '-' : '';

  return decimal === undefined ? `${sign}${groupedInteger}` : `${sign}${groupedInteger}.${decimal}`;
}

export function createRollingCharacters(
  startValue: RollingTextValue,
  value: RollingTextValue,
  decimalPlaces = 0,
  minIntegerDigits = 1,
  thousands = false,
): RollingTextCharacter[] {
  const startText = formatRollingNumber(startValue, decimalPlaces, minIntegerDigits, thousands);
  const endText = formatRollingNumber(value, decimalPlaces, minIntegerDigits, thousands);
  const width = Math.max(startText.length, endText.length);
  const paddedStart = startText.padStart(width, ' ');
  const paddedEnd = endText.padStart(width, ' ');
  let digitIndex = 0;

  return Array.from(paddedEnd).map((character, index) => {
    const digit = /\d/.test(character);
    const currentDigitIndex = digit ? digitIndex++ : -1;
    const startCharacter = paddedStart[index];

    return {
      key: `${index}-${character}`,
      value: character,
      digit,
      startDigit: /\d/.test(startCharacter) ? Number(startCharacter) : 0,
      endDigit: digit ? Number(character) : 0,
      digitIndex: currentDigitIndex,
    };
  });
}
