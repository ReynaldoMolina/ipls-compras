'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ServerActionState } from '@/types/types';

interface FeedbackOptions {
  back?: boolean;
  redirectTo?: string;
  refresh?: boolean;
}

export function useServerActionFeedback(
  state: ServerActionState | undefined,
  options: FeedbackOptions = {}
) {
  const router = useRouter();

  useEffect(() => {
    if (state?.success === undefined) return;

    if (state.success) {
      toast.success(state.title ?? 'Éxito', {
        description: state.description,
      });

      if (options.redirectTo) {
        router.push(options.redirectTo);
      }
      if (options.back) {
        router.back();
      }
      if (options.refresh) {
        router.refresh();
      }
    } else {
      toast.error(state?.title ?? 'Error', {
        description: state?.description ?? 'Ocurrió un problema inesperado.',
      });
    }
  }, [state?.success]);
}
