interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* 배경 원형 그라디언트 */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* 배경 원 */}
        <circle cx="24" cy="24" r="22" fill="url(#bgGradient)" stroke="#ffffff" strokeWidth="2" />
        
        {/* DNA 이중 나선 구조 */}
        <g transform="translate(12, 8)">
          {/* 왼쪽 나선 */}
          <path
            d="M4 2 Q8 6 4 10 Q0 14 4 18 Q8 22 4 26 Q0 30 4 34"
            stroke="url(#dnaGradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* 오른쪽 나선 */}
          <path
            d="M20 2 Q16 6 20 10 Q24 14 20 18 Q16 22 20 26 Q24 30 20 34"
            stroke="url(#dnaGradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* 연결선들 (염기 쌍) */}
          <line x1="4" y1="6" x2="20" y2="6" stroke="url(#dnaGradient)" strokeWidth="1.5" />
          <line x1="4" y1="14" x2="20" y2="14" stroke="url(#dnaGradient)" strokeWidth="1.5" />
          <line x1="4" y1="22" x2="20" y2="22" stroke="url(#dnaGradient)" strokeWidth="1.5" />
          <line x1="4" y1="30" x2="20" y2="30" stroke="url(#dnaGradient)" strokeWidth="1.5" />
          
          {/* 작은 원들 (염기) */}
          <circle cx="4" cy="6" r="1.5" fill="#ffffff" />
          <circle cx="20" cy="6" r="1.5" fill="#ffffff" />
          <circle cx="4" cy="14" r="1.5" fill="#ffffff" />
          <circle cx="20" cy="14" r="1.5" fill="#ffffff" />
          <circle cx="4" cy="22" r="1.5" fill="#ffffff" />
          <circle cx="20" cy="22" r="1.5" fill="#ffffff" />
          <circle cx="4" cy="30" r="1.5" fill="#ffffff" />
          <circle cx="20" cy="30" r="1.5" fill="#ffffff" />
        </g>
        
        {/* MGC 텍스트 */}
        <text
          x="24"
          y="42"
          textAnchor="middle"
          className="text-[8px] font-bold fill-white"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          MGC
        </text>
      </svg>
    </div>
  );
}

export default Logo;