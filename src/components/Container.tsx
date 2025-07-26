import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  animate?: boolean;
  delay?: number;
};

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-4 sm:px-6',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-10',
  xl: 'px-8 sm:px-10 lg:px-12',
};

const marginClasses = {
  none: '',
  sm: 'my-4',
  md: 'my-8',
  lg: 'my-12',
  xl: 'my-16',
  auto: 'my-0 mx-auto',
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Container = ({
  children,
  className = '',
  size = 'xl',
  padding = 'md',
  margin = 'none',
  animate = false,
  delay = 0,
}: ContainerProps) => {
  const classes = `
    ${sizeClasses[size]} 
    ${paddingClasses[padding]} 
    ${marginClasses[margin]} 
    ${className}
  `;

  if (animate) {
    return (
      <motion.div
        className={classes}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        custom={delay}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={classes}>{children}</div>;
};

export default Container;
