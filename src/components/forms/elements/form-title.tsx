'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function FormTitle({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <ArrowLeft
        className="size-7 hover:bg-secondary rounded-full p-1"
        onClick={() => router.back()}
      />
      <h1 className="font-semibold text-sm">{title}</h1>
    </div>
  );
}
