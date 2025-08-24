import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Define the particle type
    interface Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      shape: 'circle' | 'square' | 'triangle';
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      targetOpacity: number;
      pulseSpeed: number;
      pulseAmount: number;
      fadeSpeed: number;
      lastUpdate: number;
      lastOpacityChange: number;
    }
    
    const particles: Particle[] = [];

    // Create particles
    const createParticles = (count: number) => {
      for (let i = 0; i < count; i++) {
        const baseSize = Math.random() * 200 + 150; // Slightly smaller for better performance
        const hue = Math.random() * 360;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: baseSize,
          baseSize: baseSize,
          speedX: (Math.random() - 0.5) * 0.1, // Even slower movement
          speedY: (Math.random() - 0.5) * 0.1,
          color: `hsla(${hue}, 80%, 60%, 0.05)`, // More transparent for smoother blending
          shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.002, // Much slower rotation
          opacity: 0,
          targetOpacity: Math.random() * 0.08 + 0.02, // Lower max opacity
          pulseSpeed: Math.random() * 0.0003 + 0.0002, // Slower pulsing
          pulseAmount: Math.random() * 0.08 + 0.96, // More subtle size changes
          fadeSpeed: 0.15, // Will be used as seconds to complete fade
          lastUpdate: performance.now(), // More precise timing
          lastOpacityChange: 0 // Track when opacity last changed
        });
      }
    };

    // Initialize particles
    createParticles(8); // Fewer particles for better performance

    // Animation variables
    let animationId: number;
    let lastFrameTime = performance.now();
    let time = 0;

    const animate = (currentTime: number) => {
      if (!ctx) return;
      
      // Calculate time delta in seconds
      const deltaTime = (currentTime - lastFrameTime) / 1000;
      lastFrameTime = currentTime;
      
      // Clear with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(5, 2, 10, 0.15)'; // Darker for better contrast
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += deltaTime * 0.5; // Slower overall animation
      
      // Update and draw particles
      const now = performance.now();
      
      particles.forEach((p) => {
        // Update last update time
        const delta = now - p.lastUpdate;
        p.lastUpdate = now;
        
        // Only update opacity if we're not at the target yet
        if (Math.abs(p.opacity - p.targetOpacity) > 0.0001) {
          // Linear interpolation for smoother transitions
          p.opacity += (p.targetOpacity - p.opacity) * Math.min(1, delta / (p.fadeSpeed * 1000));
        } else if (now - p.lastOpacityChange > 5000) { // Only change opacity every 5+ seconds
          // Random but smooth opacity changes
          p.targetOpacity = Math.random() * 0.08 + 0.02;
          p.lastOpacityChange = now;
        }
        
        // Update position with smooth easing
        p.x += p.speedX * 60 * deltaTime;
        p.y += p.speedY * 60 * deltaTime;
        
        // Smooth pulsing size effect
        const pulse = Math.sin(time * p.pulseSpeed) * (p.pulseAmount - 1) + 1;
        p.size = p.baseSize * pulse;
        
        // Add subtle organic movement
        p.x += Math.sin(time * 0.1) * 0.05;
        p.y += Math.cos(time * 0.07) * 0.05;
        p.rotation += p.rotationSpeed * 60 * deltaTime;
        
        // Smooth screen wrapping with buffer
        const buffer = p.size * 1.2;
        if (p.x < -buffer) p.x = canvas.width + (p.x % canvas.width);
        if (p.x > canvas.width + buffer) p.x = (p.x % canvas.width) - buffer;
        if (p.y < -buffer) p.y = canvas.height + (p.y % canvas.height);
        if (p.y > canvas.height + buffer) p.y = (p.y % canvas.height) - buffer;

        // Only draw if visible enough
        if (p.opacity > 0.01) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          
          // Use softer blending for smoother edges
          ctx.globalCompositeOperation = 'lighter' as GlobalCompositeOperation;
          
          // Extract base color
          const baseHue = parseInt(p.color.split(',')[0].split('(')[1]);
          // Subtle color shift based on position and time
          const hue = (baseHue + time * 5) % 360;
          
          // Apply opacity with smooth edges
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size/2);
          gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${p.opacity * 0.8})`);
          gradient.addColorStop(1, `hsla(${hue}, 70%, 60%, 0)`);
          
          ctx.fillStyle = gradient;
        
        // Draw shapes with anti-aliasing
        ctx.beginPath();
        
        switch (p.shape) {
          case 'square':
            ctx.rect(-p.size/2, -p.size/2, p.size, p.size);
            break;
          case 'triangle':
            ctx.moveTo(0, -p.size/2);
            ctx.lineTo(p.size/2, p.size/2);
            ctx.lineTo(-p.size/2, p.size/2);
            ctx.closePath();
            break;
          default: // circle
            ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
        }
        
        // Fill with shadow for glow effect
        ctx.shadowBlur = p.size * 0.3;
        ctx.shadowColor = `hsla(${hue}, 80%, 60%, ${p.opacity * 0.5})`;
        ctx.fill();
        
          // Reset context
          ctx.shadowBlur = 0;
          ctx.restore();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    // Start animation with proper timing
    animationId = requestAnimationFrame((timestamp) => {
      lastFrameTime = performance.now();
      animate(timestamp);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={-1}
      style={{
        display: 'block',
        backgroundColor: '#0a0514'
      }}
    />
  );
};

export default AnimatedBackground;
