'use client';

interface BlueTickVerifiedIconProps {
  size?: number;
  className?: string;
  showLabel?: boolean;
}

const BlueTickVerifiedIcon: React.FC<BlueTickVerifiedIconProps> = ({ 
  size = 16, 
  className = '', 
  showLabel = false 
}) => {
  return (
    <span 
      className={`d-inline-flex align-items-center gap-1 ${className}`}
      title="Verified Property"
      style={{ cursor: 'help' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          flexShrink: 0,
          filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.1))'
        }}
      >
        {/* Blue circle background */}
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="#3B82F6"
        />
        
        {/* White checkmark */}
        <path
          d="M8.5 12.5L10.5 14.5L15.5 9.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Subtle shine effect */}
        <circle
          cx="8"
          cy="8"
          r="2"
          fill="white"
          fillOpacity="0.3"
        />
      </svg>
      
      {showLabel && (
        <span 
          className="fw-medium text-primary"
          style={{ fontSize: size * 0.75, lineHeight: 1 }}
        >
          Verified
        </span>
      )}
    </span>
  );
};

export default BlueTickVerifiedIcon;
