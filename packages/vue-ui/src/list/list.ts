export type ListDirection = 'down' | 'up';

export interface ListProps {
  loading?: boolean;
  finished?: boolean;
  error?: boolean;
  finishedText?: string;
  loadingText?: string;
  errorText?: string;
  immediateCheck?: boolean;
  offset?: number;
  direction?: ListDirection;
  disabled?: boolean;
}
