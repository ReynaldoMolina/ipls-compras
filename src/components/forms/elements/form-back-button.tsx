'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FormBackButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      type="button"
      className="w-fit mb-0"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-4" />
    </Button>
  );
}
