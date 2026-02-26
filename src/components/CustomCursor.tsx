import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    // Hide default cursor immediately
    document.body.style.cursor = 'none';
    
    // Also hide cursor on all elements
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Target all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .card-tactile, .annotation, [role="button"], input, select, textarea, h1, h2, h3, p, div[class*="card"]'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHoverStart);
      el.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      // Restore default cursor when component unmounts
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
      
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  // Don't render cursor on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  // Don't render if mouse leaves window
  if (hidden) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          width: linkHovered ? '48px' : '24px',
          height: linkHovered ? '48px' : '24px',
          backgroundColor: linkHovered ? 'rgba(249, 115, 22, 0.2)' : '#F97316',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          boxShadow: linkHovered ? '0 0 30px rgba(249, 115, 22, 0.5)' : 'none',
          opacity: clicked ? 0.7 : 1,
          scale: clicked ? 0.8 : 1
        }}
      />
      
      {/* Optional: Inner dot for more precision */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-white"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '4px',
          opacity: linkHovered ? 0 : 0.8,
          transition: 'opacity 0.2s'
        }}
      />
    </>
  );
};

export default CustomCursor;