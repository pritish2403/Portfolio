import { Variants } from 'framer-motion';

/**
 * Common animation variants for Framer Motion
 */

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay = 0): Variants => ({
  hidden: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    opacity: 0,
  },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.5,
      delay,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  },
});

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const textVariant = (delay = 0): Variants => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down', type: string, delay: number, duration: number): Variants => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  visible: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export const zoomIn = (delay: number, duration: number): Variants => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export const rotateIn = (delay: number, direction: 'left' | 'right' = 'left'): Variants => ({
  hidden: {
    rotate: direction === 'left' ? -100 : 100,
    opacity: 0,
  },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      duration: 0.7,
      bounce: 0.25,
    },
  },
});

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

// Button hover animation
export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const buttonTap = {
  scale: 0.95,
};

// Card hover animation
export const cardHover = {
  y: -5,
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
  },
};

// Stagger children with custom delay
interface StaggerChildrenProps {
  delayOrder: number;
  duration?: number;
  delayChildren?: number;
  staggerChildren?: number;
}

export const staggerChildren = ({
  delayOrder = 1,
  duration = 0.5,
  delayChildren = 0.1,
  staggerChildren = 0.1,
}: StaggerChildrenProps): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: delayOrder * delayChildren,
      staggerChildren,
    },
  },
});

// Animation for list items
export const listItem = (index: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
    },
  },
});

// Animation for modal overlay
export const modalOverlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Animation for modal content
export const modalContent = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.15 },
  },
};

// Animation for tooltip
export const tooltip = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.15 },
  },
};

// Animation for skeleton loading
export const skeletonPulse = {
  initial: { opacity: 0.6 },
  animate: { 
    opacity: 1,
    transition: { 
      repeat: Infinity, 
      repeatType: 'reverse',
      duration: 1.5,
      ease: 'easeInOut'
    } 
  },
};

// Animation for progress bar
export const progressBar = (progress: number) => ({
  initial: { width: 0 },
  animate: { 
    width: `${progress}%`,
    transition: { 
      duration: 1,
      ease: 'easeInOut',
    } 
  },
});

// Animation for tabs
interface TabAnimationProps {
  direction: number;
  transition?: {
    type?: string;
    damping?: number;
    stiffness?: number;
  };
}

export const tabAnimation = ({ 
  direction, 
  transition = { type: 'spring', damping: 25, stiffness: 300 } 
}: TabAnimationProps) => ({
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
  transition,
});

// Animation for image reveal
export const imageReveal = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
};

// Animation for text reveal
export const textReveal = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
});

// Animation for smooth appearance
export const smoothAppear = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: 'easeOut',
    },
  },
});
