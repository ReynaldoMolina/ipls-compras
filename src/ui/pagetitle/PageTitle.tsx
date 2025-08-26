'use client';

import ArrowBack from '@/icons/arrow_back.svg';
import { useRouter } from 'next/navigation';

export default function PageTitle({
  title,
  showBackIcon = false,
}: {
  title: string;
  showBackIcon?: boolean;
}) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 pb-2">
      {showBackIcon && (
        <button
          type="button"
          className="h-full rounded-full p-0.5 hover:bg-button-hover cursor-pointer transition"
          onClick={() => router.back()}
        >
          <ArrowBack />
        </button>
      )}
      <h2 className="font-semibold text-md">{title}</h2>
    </div>
  );
}
