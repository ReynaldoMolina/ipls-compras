'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FormBackButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="rounded-full w-fit"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-4" />
      <span className="text-xs">Regresar</span>
    </Button>
  );
}
