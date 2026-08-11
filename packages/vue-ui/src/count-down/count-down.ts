export interface CountDownProps {
  time?: number;
  format?: string;
  autoStart?: boolean;
  millisecond?: boolean;
}
export interface CountDownCurrent {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
