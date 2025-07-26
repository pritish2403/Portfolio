import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

type CardVariant = 'elevated' | 'outlined' | 'filled' | 'gradient';
type CardSize = 'sm' | 'md' | 'lg';
type CardRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  rounded?: CardRounded;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  animateOnHover?: boolean;
  animateOnTap?: boolean;
  initial?: 'visible' | 'hidden' | 'offscreen';
  whileInView?: 'visible' | 'hidden' | 'offscreen';
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | 'some' | 'all';
  };
}

const cardVariants: Record<CardVariant, string> = {
  elevated: 'bg-white dark:bg-gray-800 shadow-sm hover:shadow-md dark:shadow-gray-900/20',
  outlined: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  filled: 'bg-gray-50 dark:bg-gray-700/50',
  gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700',
};

const cardSizes: Record<CardSize, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const cardRounded: Record<CardRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-3xl',
};

const animationVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  offscreen: {
    opacity: 0,
    y: 30,
  },
};

const hoverVariants = {
  hover: {
    y: -4,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

const Card = ({
  children,
  variant = 'elevated',
  size = 'md',
  rounded = 'lg',
  className = '',
  hoverable = false,
  onClick,
  animateOnHover = false,
  animateOnTap = false,
  initial = 'visible',
  whileInView,
  viewport = { once: true, margin: '-100px' },
  ...props
}: CardProps) => {
  const baseClasses = `
    ${cardVariants[variant]}
    ${cardSizes[size]}
    ${cardRounded[rounded]}
    ${hoverable ? 'transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-900/30' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const MotionComponent = animateOnHover || animateOnTap ? motion.div : 'div';

  const cardContent = (
    <MotionComponent
      className={baseClasses}
      onClick={onClick}
      whileHover={animateOnHover ? 'hover' : undefined}
      whileTap={animateOnTap ? 'tap' : undefined}
      variants={hoverVariants}
      {...(onClick && { role: 'button', tabIndex: 0 })}
      {...props}
    >
      {children}
    </MotionComponent>
  );

  if (whileInView) {
    return (
      <motion.div
        initial={initial}
        whileInView={whileInView}
        viewport={viewport}
        variants={animationVariants}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

// Card Header Component
const CardHeader = ({
  children,
  className = '',
  withBorder = false,
}: {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
}) => (
  <div
    className={`mb-4 ${withBorder ? 'pb-4 border-b border-gray-100 dark:border-gray-700' : ''} ${className}`}
  >
    {children}
  </div>
);

// Card Title Component
const CardTitle = ({
  children,
  as: Component = 'h3',
  className = '',
}: {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) => (
  <Component
    className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}
  >
    {children}
  </Component>
);

// Card Subtitle Component
const CardSubtitle = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <p className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
    {children}
  </p>
);

// Card Content Component
const CardContent = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`${className}`}>{children}</div>;

// Card Footer Component
const CardFooter = ({
  children,
  className = '',
  withBorder = true,
}: {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
}) => (
  <div
    className={`mt-6 pt-4 ${
      withBorder ? 'border-t border-gray-100 dark:border-gray-700' : ''
    } ${className}`}
  >
    {children}
  </div>
);

// Card Image Component
const CardImage = ({
  src,
  alt,
  className = '',
  imgClassName = '',
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) => (
  <div className={`overflow-hidden ${className}`}>
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto object-cover ${imgClassName}`}
      loading="lazy"
    />
  </div>
);

// Attach subcomponents to Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card;
