'use client';

import { useVisualFallback } from '@/hooks/useVisualFallback';

export default function VisualFallbackProvider({ children }: { children: React.ReactNode }) {
  useVisualFallback();
  return <>{children}</>;
}
