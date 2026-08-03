export interface DialogProps {
  modelValue?: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  danger?: boolean;
  loading?: boolean;
  closeOnOverlay?: boolean;
}
