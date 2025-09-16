'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-5" />
    </Button>
  );
}
