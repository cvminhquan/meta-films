import type { FC, ReactNode } from 'react';

interface FilmGridProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const FilmGrid: FC<FilmGridProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`mt-10 ${className}`}>
      {title && (
        <h2 className="text-white text-xl md:text-2xl font-medium mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {children}
      </div>
    </div>
  );
};

export default FilmGrid;
