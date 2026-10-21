import React from 'react';
import AiSeoHero from '../components/AiSeoHero';

export const metadata = {
  title: 'AI SEO Agent - Always Optimizing | Promanage',
  description: 'Powered by multiple AI agents that work together to grow your visibility, rankings and revenue across every search experience.',
};

export default function AiSeoPage() {
  return (
    <div className="bg-[#fcfdfd] text-[#1a2b3c] font-sans selection:bg-[#00897b] selection:text-white">
      <AiSeoHero />
    </div>
  );
}
