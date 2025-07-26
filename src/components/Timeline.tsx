import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, BriefcaseIcon, AcademicCapIcon, TrophyIcon, CodeBracketIcon, StarIcon } from '@heroicons/react/24/outline';

type TimelineItemType = 'work' | 'education' | 'project' | 'award' | 'certification' | 'other';

interface TimelineItemProps {
  /**
   * The title of the timeline item
   */
  title: string;
  
  /**
   * The subtitle or position/degree
   */
  subtitle?: string;
  
  /**
   * The date or date range (e.g., "2020 - Present")
   */
  date: string;
  
  /**
   * Description or details about the timeline item
   */
  description?: string | ReactNode;
  
  /**
   * Type of timeline item (determines the icon)
   * @default 'other'
   */
  type?: TimelineItemType;
  
  /**
   * Custom icon component
   */
  icon?: ReactNode;
  
  /**
   * Tags or skills related to this item
   */
  tags?: string[];
  
  /**
   * Whether this is the current/most recent item
   */
  isCurrent?: boolean;
  
  /**
   * Custom class for the timeline item
   */
  className?: string;
}

const typeIcons = {
  work: BriefcaseIcon,
  education: AcademicCapIcon,
  project: CodeBracketIcon,
  award: TrophyIcon,
  certification: StarIcon,
  other: CalendarIcon,
};

const typeColors = {
  work: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  education: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  project: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  award: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  certification: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300',
};

export const TimelineItem = ({
  title,
  subtitle,
  date,
  description,
  type = 'other',
  icon,
  tags = [],
  isCurrent = false,
  className = '',
}: TimelineItemProps) => {
  const Icon = icon || typeIcons[type];
  const iconColor = typeColors[type];
  
  return (
    <motion.div 
      className={`relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0 group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline dot */}
      <div className="absolute w-5 h-5 -left-2.5 top-0 rounded-full flex items-center justify-center">
        <div className={`absolute w-3 h-3 rounded-full ${isCurrent ? 'animate-ping' : ''} ${typeColors[type].split(' ')[0]}`} />
        <div className={`w-3 h-3 rounded-full ${typeColors[type].split(' ')[0]}`} />
      </div>
      
      {/* Timeline content */}
      <div className="relative">
        {/* Date */}
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          {date}
          {isCurrent && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              Current
            </span>
          )}
        </div>
        
        {/* Title and icon */}
        <div className="flex items-start gap-3">
          <div className={`mt-1 p-1.5 rounded-lg ${iconColor}`}>
            {typeof Icon === 'function' ? (
              <Icon className="w-4 h-4" />
            ) : (
              <div className="w-4 h-4">{Icon}</div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            
            {subtitle && (
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Description */}
        {description && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </div>
        )}
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface TimelineProps {
  /**
   * Timeline items to display
   */
  items: TimelineItemProps[];
  
  /**
   * Whether to alternate the layout (left/right)
   * @default false
   */
  alternate?: boolean;
  
  /**
   * Custom class for the timeline container
   */
  className?: string;
  
  /**
   * Custom class for timeline items
   */
  itemClassName?: string;
}

const Timeline = ({
  items = [],
  alternate = false,
  className = '',
  itemClassName = '',
}: TimelineProps) => {
  if (items.length === 0) return null;
  
  return (
    <div className={`relative ${className}`}>
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 md:left-1/2 md:-translate-x-0.5" />
      
      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`relative md:grid md:grid-cols-2 md:gap-8 ${
              alternate && index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Empty div for alternating layout */}
            {alternate && index % 2 === 0 && <div></div>}
            
            <TimelineItem
              {...item}
              className={`${itemClassName} ${
                alternate 
                  ? index % 2 === 0 
                    ? 'md:pl-8 md:pr-0 md:text-right' 
                    : 'md:pl-0 md:pr-8'
                  : ''
              }`}
            />
            
            {/* Empty div for non-alternating items */}
            {alternate && index % 2 !== 0 && <div></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
