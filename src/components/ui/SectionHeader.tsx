import type { FC, ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  rightContent?: ReactNode;
  className?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  rightContent,
  className = ''
}) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <h2 className="text-white text-xl md:text-2xl font-medium">{title}</h2>
      {rightContent && (
        <div>
          {rightContent}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
