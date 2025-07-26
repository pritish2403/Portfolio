import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
  className?: string;
  disableAnimation?: boolean;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({
  variant = 'text',
  animation = 'pulse',
  width,
  height,
  className = '',
  disableAnimation = false,
  style,
  ...props
}, ref) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'relative overflow-hidden after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:animate-wave',
    none: '',
  };
  
  const dimensions = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
  };
  
  const skeletonClasses = [
    baseClasses,
    variantClasses[variant],
    !disableAnimation && animationClasses[animation],
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <motion.div
      ref={ref}
      className={skeletonClasses}
      style={{ ...dimensions, ...style }}
      initial={!disableAnimation ? { opacity: 0.6 } : undefined}
      animate={!disableAnimation ? { opacity: 1 } : undefined}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';

// SkeletonGroup component for multiple skeleton items
export const SkeletonGroup = ({
  count = 1,
  className = '',
  itemClassName = '',
  children,
  ...props
}: {
  count?: number;
  className?: string;
  itemClassName?: string;
  children?: (index: number) => React.ReactNode;
} & Omit<SkeletonProps, 'className'>) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div key={i} className={itemClassName}>
      {children ? children(i) : <Skeleton {...props} />}
    </div>
  ));
  
  return <div className={`space-y-3 ${className}`}>{skeletons}</div>;
};

export default Skeleton;
