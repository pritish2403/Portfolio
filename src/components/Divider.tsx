import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'gradient' | 'text';
type DividerOrientation = 'horizontal' | 'vertical';
type DividerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeMap = {
  xs: '0.5',
  sm: '1',
  md: '2',
  lg: '3',
  xl: '4',
};

const variantStyles = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  gradient: '',
  text: 'solid',
};

const gradientColors = {
  default: 'from-olive via-mustard to-tan-light',
  primary: 'from-blue-500 via-purple-500 to-pink-500',
  success: 'from-green-400 to-blue-500',
  danger: 'from-red-500 to-orange-500',
  warning: 'from-yellow-400 to-orange-500',
};

interface DividerProps {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  size?: DividerSize;
  color?: string;
  gradient?: keyof typeof gradientColors;
  text?: string;
  textPosition?: 'left' | 'center' | 'right';
  textClassName?: string;
  className?: string;
  animate?: boolean;
  animationDelay?: number;
  animationDuration?: number;
  children?: ReactNode;
}

const Divider = ({
  variant = 'solid',
  orientation = 'horizontal',
  size = 'md',
  color = 'currentColor',
  gradient = 'default',
  text,
  textPosition = 'center',
  textClassName = '',
  className = '',
  animate = true,
  animationDelay = 0,
  animationDuration = 0.8,
  children,
}: DividerProps) => {
  const isText = variant === 'text' || Boolean(text) || Boolean(children);
  const isGradient = variant === 'gradient';
  const isVertical = orientation === 'vertical';
  
  const width = isVertical ? '' : 'w-full';
  const height = isVertical ? 'h-full' : 'h-auto';
  const borderStyle = variantStyles[variant];
  const borderSize = sizeMap[size];
  const borderColor = isGradient ? 'transparent' : color;
  
  const textPositionMap = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  const dividerVariants: Variants = {
    hidden: { 
      opacity: 0,
      scaleX: orientation === 'horizontal' ? 0 : 1,
      scaleY: orientation === 'vertical' ? 0 : 1,
    },
    visible: (custom: { delay: number }) => ({
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      transition: {
        delay: custom.delay,
        duration: custom.delay ? animationDuration : 0,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const renderDivider = () => {
    if (isText) {
      return (
        <div 
          className={`relative flex items-center ${width} ${height} ${className}`}
          style={{
            color: isGradient ? 'transparent' : color,
          }}
        >
          <motion.div 
            className={`flex-1 ${isVertical ? 'h-full' : 'h-px'} ${isGradient ? `bg-gradient-to-r ${gradientColors[gradient]}` : 'bg-current'}`}
            style={{
              opacity: 0.5,
              borderStyle: isGradient ? 'none' : borderStyle,
              borderWidth: isVertical ? '0 0 0 1px' : '1px 0 0 0',
            }}
            initial={animate ? 'hidden' : false}
            animate={animate ? 'visible' : false}
            custom={{ delay: animationDelay }}
            variants={dividerVariants}
          />
          
          {(text || children) && (
            <div 
              className={`px-3 flex-shrink-0 ${textPositionMap[textPosition]} ${textClassName}`}
              style={{
                color: isGradient ? 'inherit' : color,
              }}
            >
              {children || text}
            </div>
          )}
          
          <motion.div 
            className={`flex-1 ${isVertical ? 'h-full' : 'h-px'} ${isGradient ? `bg-gradient-to-r ${gradientColors[gradient]}` : 'bg-current'}`}
            style={{
              opacity: 0.5,
              borderStyle: isGradient ? 'none' : borderStyle,
              borderWidth: isVertical ? '0 0 0 1px' : '1px 0 0 0',
            }}
            initial={animate ? 'hidden' : false}
            animate={animate ? 'visible' : false}
            custom={{ delay: animationDelay }}
            variants={dividerVariants}
          />
        </div>
      );
    }

    return (
      <motion.div 
        className={`${width} ${isVertical ? 'h-full' : 'h-px'} ${isGradient ? `bg-gradient-to-r ${gradientColors[gradient]}` : 'bg-current'} ${className}`}
        style={{
          borderStyle: isGradient ? 'none' : borderStyle,
          borderWidth: isVertical ? '0 0 0 1px' : '1px 0 0 0',
          borderColor,
          opacity: 0.5,
        }}
        initial={animate ? 'hidden' : false}
        animate={animate ? 'visible' : false}
        custom={{ delay: animationDelay }}
        variants={dividerVariants}
        aria-hidden="true"
      />
    );
  };

  return renderDivider();
};

export default Divider;
