import React from 'react';

interface ImageWatermarkProps {
  text?: string;
  fontSize?: string;
  color?: string;
  opacity?: number;
  letterSpacing?: string;
}

const ImageWatermark: React.FC<ImageWatermarkProps> = ({
  text = 'CSY',
  fontSize = '48px',
  color = 'rgb(255, 255, 255)',
  opacity = 0.4,
  letterSpacing = '4px'
}) => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize,
      fontWeight: 'bold',
      color: `rgba(${color.match(/\d+/g)?.join(', ')}, ${opacity})`,
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      pointerEvents: 'none',
      userSelect: 'none',
      letterSpacing
    }}>
      {text}
    </div>
  );
};

export default ImageWatermark;
