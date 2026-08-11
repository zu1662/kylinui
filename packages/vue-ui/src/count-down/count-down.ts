import type { ComponentPublicInstance } from 'vue';

export type CountDownTime = number | string;

export interface CountDownProps {
  /** 倒计时时长，单位毫秒。 */
  time?: CountDownTime;
  /** 时间格式，支持 DD、HH、mm、ss、S、SS、SSS。 */
  format?: string;
  /** 是否在初始化和重置后自动开始倒计时。 */
  autoStart?: boolean;
  /** 是否开启毫秒级渲染。 */
  millisecond?: boolean;
}

export interface CountDownCurrentTime {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

/** @deprecated 请使用 CountDownCurrentTime。 */
export type CountDownCurrent = CountDownCurrentTime;

export interface CountDownExpose {
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export type CountDownInstance = ComponentPublicInstance<CountDownProps, CountDownExpose>;

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function normalizeCountDownTime(time: CountDownTime): number {
  const value = Number(time);
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

export function parseCountDownTime(time: number): CountDownCurrentTime {
  const total = Math.max(0, time);

  return {
    total,
    days: Math.floor(total / DAY),
    hours: Math.floor((total % DAY) / HOUR),
    minutes: Math.floor((total % HOUR) / MINUTE),
    seconds: Math.floor((total % MINUTE) / SECOND),
    milliseconds: Math.floor(total % SECOND),
  };
}

function padZero(value: number, length = 2): string {
  return String(value).padStart(length, '0');
}

export function formatCountDownTime(format: string, currentTime: CountDownCurrentTime): string {
  let result = format;
  const { days } = currentTime;
  let { hours, minutes, seconds, milliseconds } = currentTime;

  if (result.includes('DD')) {
    result = result.replace('DD', padZero(days));
  } else {
    hours += days * 24;
  }

  if (result.includes('HH')) {
    result = result.replace('HH', padZero(hours));
  } else {
    minutes += hours * 60;
  }

  if (result.includes('mm')) {
    result = result.replace('mm', padZero(minutes));
  } else {
    seconds += minutes * 60;
  }

  if (result.includes('ss')) {
    result = result.replace('ss', padZero(seconds));
  } else {
    milliseconds += seconds * SECOND;
  }

  if (result.includes('S')) {
    const millisecondText = padZero(milliseconds, 3);

    if (result.includes('SSS')) {
      result = result.replace('SSS', millisecondText);
    } else if (result.includes('SS')) {
      result = result.replace('SS', millisecondText.slice(0, 2));
    } else {
      result = result.replace('S', millisecondText.charAt(0));
    }
  }

  return result;
}
