import React, { useState, useEffect } from 'react';

interface TextCarouselProps {
  items: { text: string; background: string }[];
}

const TextCarousel: React.FC<TextCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="w-full h-7 relative overflow-hidden">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
            index === currentIndex ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ backgroundColor: item.background }}
        >
          <div className="flex items-center justify-center h-full text-white">
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextCarousel;
