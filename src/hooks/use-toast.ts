type ToastOptions = {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

export function useToast() {
  function toast(options: ToastOptions) {
    // For now, just log to the console
    console.log(`[${options.variant || 'default'}] ${options.title}: ${options.description || ''}`);
  }
  return { toast };
} 