'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FormTitle({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="inline-flex gap-2 items-center">
      <Button
        variant="ghost"
        type="button"
        className="w-fit mb-0"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-5" />
      </Button>
      <span className="text-sm font-semibold">{title}</span>
    </div>
  );
}
