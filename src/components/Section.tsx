import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  isFirst?: boolean;
  bgColor?: 'white' | 'gray' | 'olive' | 'mustard' | 'transparent';
  textColor?: 'light' | 'dark';
}

const Section = ({
  id,
  title,
  subtitle,
  description,
  children,
  className = '',
  noPadding = false,
  isFirst = false,
  bgColor = 'transparent',
  textColor = 'dark',
}: SectionProps) => {
  const bgColors = {
    white: 'bg-white dark:bg-gray-900',
    gray: 'bg-gray-50 dark:bg-gray-800',
    olive: 'bg-olive/10 dark:bg-olive/5',
    mustard: 'bg-mustard/10 dark:bg-mustard/5',
    transparent: '',
  };

  const textColors = {
    light: 'text-white',
    dark: 'text-gray-900 dark:text-white',
  };

  const sectionVariants: Variants = {
    offscreen: {
      opacity: 0,
      y: 30,
    },
    onView: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.05,
      },
    },
  };

  const contentVariants: Variants = {
    offscreen: {
      opacity: 0,
      y: 20,
    },
    onView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${
        !noPadding ? 'py-16 md:py-24 lg:py-32' : ''
      } ${bgColors[bgColor]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle || description) && (
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="offscreen"
            whileInView="onView"
            viewport={{ once: true, margin: '-100px' }}
            variants={sectionVariants}
          >
            {subtitle && (
              <motion.span
                className="inline-block px-3 py-1 text-sm font-semibold text-olive dark:text-mustard bg-olive/10 dark:bg-mustard/10 rounded-full mb-4"
                variants={contentVariants}
              >
                {subtitle}
              </motion.span>
            )}
            <motion.h2
              className={`text-3xl sm:text-4xl font-bold ${textColors[textColor]} mb-4`}
              variants={contentVariants}
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                className={`text-lg ${textColor === 'dark' ? 'text-gray-600 dark:text-gray-300' : 'text-gray-200'} max-w-2xl mx-auto`}
                variants={contentVariants}
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        )}
        
        <motion.div
          initial="offscreen"
          whileInView="onView"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;
