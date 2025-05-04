'use client';

import { Suspense } from 'react';
import ExploreContent from './ExploreContent';

export default function ExplorePage() {
  return (
    <>
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="text-white text-xl">Loading...</div></div>}>
        <ExploreContent />
      </Suspense>
    </>
  );
}
