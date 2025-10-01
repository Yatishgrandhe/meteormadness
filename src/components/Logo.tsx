import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  isScrolled?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true, isScrolled = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Logo Collaboration */}
      <div className="flex items-center space-x-3">
        {/* TSA Logo */}
        <div className={`${sizeClasses[size]} relative bg-white rounded-lg shadow-lg p-1`}>
          <img 
            src="/images/tsa-logo.png" 
            alt="TSA Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to styled div if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div 
            className="w-full h-full bg-gradient-to-br from-tsa-navy to-blue-600 flex items-center justify-center text-white font-bold rounded-lg"
            style={{ display: 'none' }}
          >
            TSA
          </div>
        </div>

        {/* School Logo */}
        <div className={`${sizeClasses[size]} relative bg-white rounded-lg shadow-lg p-1`}>
          <img 
            src="/images/school-logo.png" 
            alt="School Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to styled div if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div 
            className="w-full h-full bg-gradient-to-br from-school-primary to-blue-500 flex items-center justify-center text-white font-bold rounded-lg"
            style={{ display: 'none' }}
          >
            CA
          </div>
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`font-heading font-bold ${textSizeClasses[size]} ${
            isScrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
          }`}>
            Central Academy TSA
          </h1>
          <p className={`text-xs hidden sm:block ${
            isScrolled ? 'text-gray-600' : 'text-blue-100 drop-shadow-md'
          }`}>
            Technology Student Association
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
