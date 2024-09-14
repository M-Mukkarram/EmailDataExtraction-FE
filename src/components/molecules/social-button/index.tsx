import SPButton from '@/components/atoms/sp-button';
import { ReactNode } from 'react';

interface SocialButtonProps {
  icon: ReactNode;
}

export default function SocialButton({ icon }: SocialButtonProps) {
  return (
    <div className="flex  justify-center gap-4">
      <SPButton className="focus:shadow-outline flex h-[54px] w-[54px] items-center justify-center rounded-full border-0 bg-button_bg px-4 py-4">
        {icon}
      </SPButton>
    </div>
  );
}
