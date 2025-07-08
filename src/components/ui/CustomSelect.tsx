"use client";

import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  theme?: 'genre' | 'country' | 'year' | 'sort-field' | 'sort-type';
  icon?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  theme = 'genre',
  icon = '',
  className = ''
}) => {
  const themeColors = {
    genre: {
      hover: '#60a5fa',
      focus: '#3b82f6',
      shadow: 'rgba(96, 165, 250, 0.3)'
    },
    country: {
      hover: '#34d399',
      focus: '#10b981',
      shadow: 'rgba(52, 211, 153, 0.3)'
    },
    year: {
      hover: '#a78bfa',
      focus: '#8b5cf6',
      shadow: 'rgba(167, 139, 250, 0.3)'
    },
    'sort-field': {
      hover: '#fb923c',
      focus: '#f97316',
      shadow: 'rgba(251, 146, 60, 0.3)'
    },
    'sort-type': {
      hover: '#f87171',
      focus: '#ef4444',
      shadow: 'rgba(248, 113, 113, 0.3)'
    }
  };

  const colors = themeColors[theme];

  return (
    <div className={`custom-select ${theme} ${className}`}>
      <style jsx>{`
        .custom-select {
          position: relative;
          display: inline-block;
        }
        .custom-select select {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: white;
          border: 2px solid #374151;
          border-radius: 12px;
          padding: 12px 40px 12px 16px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          appearance: none;
          min-width: 140px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }
        .custom-select select:hover {
          border-color: ${colors.hover};
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px ${colors.shadow};
          transform: translateY(-2px);
          background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
        }
        .custom-select select:focus {
          outline: none;
          border-color: ${colors.focus};
          box-shadow: 0 0 0 4px ${colors.shadow.replace('0.3', '0.15')}, 0 10px 25px -3px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }
        .custom-select::after {
          content: '▼';
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 12px;
          pointer-events: none;
          transition: all 0.3s ease;
        }
        .custom-select:hover::after {
          color: ${colors.hover};
          transform: translateY(-50%) scale(1.1);
        }
        .custom-select select option {
          background-color: #1f2937;
          color: white;
          padding: 12px 16px;
          border: none;
          font-weight: 500;
        }
        .custom-select select option:hover {
          background-color: #374151;
        }
        .custom-select select option:checked {
          background-color: ${colors.focus};
          color: white;
        }
        @media (max-width: 768px) {
          .custom-select select {
            min-width: 120px;
            padding: 10px 32px 10px 12px;
            font-size: 13px;
          }
        }
      `}</style>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{icon} {placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
