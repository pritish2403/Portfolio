import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon } from '@heroicons/react/24/outline';

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarVariant = 'circle' | 'rounded' | 'square';
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | null;

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

const variantClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none',
};

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-500',
};

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  status?: AvatarStatus;
  name?: string;
  className?: string;
  withAnimation?: boolean;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  src,
  alt = '',
  size = 'md',
  variant = 'circle',
  status = null,
  name,
  className = '',
  withAnimation = true,
  ...props
}, ref) => {
  const [imageError, setImageError] = useState(false);
  const hasImage = src && !imageError;
  const showInitials = !hasImage && name;
  
  const getInitials = () => {
    if (!name) return '';
    return name
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const getBackgroundColor = () => {
    if (!name) return 'bg-gray-100 dark:bg-gray-700';
    
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    ];
    
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  return (
    <motion.div
      ref={ref}
      className={`relative inline-flex items-center justify-center overflow-hidden 
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      initial={withAnimation ? { opacity: 0, scale: 0.8 } : undefined}
      animate={withAnimation ? { opacity: 1, scale: 1 } : undefined}
      transition={withAnimation ? { type: 'spring', stiffness: 500, damping: 30 } : undefined}
      whileHover={withAnimation ? { scale: 1.05 } : undefined}
      whileTap={withAnimation ? { scale: 0.95 } : undefined}
      {...props}
    >
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${variantClasses[variant]}`}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : showInitials ? (
        <div 
          className={`h-full w-full flex items-center justify-center font-medium 
            ${getBackgroundColor()} ${variantClasses[variant]}`}
        >
          {getInitials()}
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center text-gray-400">
          <UserIcon className="h-3/5 w-3/5" />
        </div>
      )}
      
      {status && (
        <span
          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white 
            ${statusColors[status]} ${variant === 'circle' ? '' : 'transform -translate-x-1 -translate-y-1'}`}
          aria-label={status}
        />
      )}
    </motion.div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
