// Environment variables with fallback values for development
const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10),
    maxRetries: parseInt(process.env.NEXT_PUBLIC_API_MAX_RETRIES || '3', 10),
    retryDelay: parseInt(process.env.NEXT_PUBLIC_API_RETRY_DELAY || '1000', 10),
  },

  // Application Configuration
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Portfolio',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Personal portfolio website',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    environment: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test',
  },

  // Authentication Configuration
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    userKey: 'user',
    tokenExpiry: parseInt(process.env.NEXT_PUBLIC_AUTH_TOKEN_EXPIRY || '86400', 10), // 24 hours
    refreshTokenExpiry: parseInt(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY || '2592000', 10), // 30 days
  },

  // Contact Form Configuration
  contact: {
    recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    defaultRecipient: process.env.NEXT_PUBLIC_DEFAULT_EMAIL_RECIPIENT || 'contact@yourdomain.com',
  },

  // Analytics Configuration
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_TRACKING_ID || '',
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || '',
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID || '',
  },

  // Social Media Links
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/yourusername',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/yourusername',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/yourusername',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/yourusername',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/yourusername',
  },

  // Feature Flags
  features: {
    darkMode: process.env.NEXT_PUBLIC_FEATURE_DARK_MODE !== 'false',
    notifications: process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS !== 'false',
    analytics: process.env.NEXT_PUBLIC_FEATURE_ANALYTICS === 'true',
    contactForm: process.env.NEXT_PUBLIC_FEATURE_CONTACT_FORM !== 'false',
  },

  // UI Configuration
  ui: {
    defaultTheme: process.env.NEXT_PUBLIC_DEFAULT_THEME || 'light',
    themeColor: process.env.NEXT_PUBLIC_THEME_COLOR || '#4f46e5',
    maxWidth: parseInt(process.env.NEXT_PUBLIC_MAX_WIDTH || '1280', 10),
    mobileBreakpoint: parseInt(process.env.NEXT_PUBLIC_MOBILE_BREAKPOINT || '640', 10),
    tabletBreakpoint: parseInt(process.env.NEXT_PUBLIC_TABLET_BREAKPOINT || '768', 10),
    desktopBreakpoint: parseInt(process.env.NEXT_PUBLIC_DESKTOP_BREAKPOINT || '1024', 10),
  },
};

export default config;
