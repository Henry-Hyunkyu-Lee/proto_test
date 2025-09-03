import Logo from './Logo';

interface LogoWithTextProps {
  className?: string;
  logoSize?: 'sm' | 'md' | 'lg';
  textSize?: 'sm' | 'md' | 'lg';
  vertical?: boolean;
}

export function LogoWithText({ 
  className = "", 
  logoSize = "md", 
  textSize = "md",
  vertical = false 
}: LogoWithTextProps) {
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  if (vertical) {
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <Logo size={logoSize} />
        <div className="text-center">
          <h1 className={`${textSizeClasses[textSize]} font-bold text-gray-900`}>
            마이진케어
          </h1>
          <p className="text-sm text-gray-600">MyGeneCare</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Logo size={logoSize} />
      <div>
        <h1 className={`${textSizeClasses[textSize]} font-bold text-gray-900`}>
          마이진케어
        </h1>
        <p className="text-sm text-gray-600">MyGeneCare</p>
      </div>
    </div>
  );
}

export default LogoWithText;