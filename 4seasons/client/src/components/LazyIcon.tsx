import { lazy, Suspense, memo, ComponentType } from 'react';
import { LucideIcon, LucideProps } from 'lucide-react';
import { logger } from '@/utils/logger';

interface LazyIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

const iconCache = new Map<string, ComponentType<LucideProps>>();

const loadIcon = (iconName: string): ComponentType<LucideProps> => {
  if (iconCache.has(iconName)) {
    return iconCache.get(iconName)!;
  }

  const LazyIconComponent = lazy(async () => {
    try {
      const iconModule = await import('lucide-react');
      const IconComponent = (iconModule as any)[iconName] as LucideIcon;

      if (!IconComponent) {
        logger.warn(`Icon "${iconName}" not found in lucide-react`, { iconName }, 'LazyIcon');
        return { default: iconModule.HelpCircle };
      }

      return { default: IconComponent };
    } catch (error) {
      logger.error(`Failed to load icon "${iconName}"`, { iconName, error: error instanceof Error ? error.message : String(error) }, 'LazyIcon');
      const { HelpCircle } = await import('lucide-react');
      return { default: HelpCircle };
    }
  }) as ComponentType<LucideProps>;

  iconCache.set(iconName, LazyIconComponent);
  return LazyIconComponent;
};

function LazyIconComponent({ name, ...props }: LazyIconProps) {
  const IconComponent = loadIcon(name);

  return (
    <Suspense fallback={<div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />}>
      <IconComponent {...props} />
    </Suspense>
  );
}

export const LazyIcon = memo(LazyIconComponent);

// Pre-load commonly used icons for better UX
export const preloadIcons = (iconNames: string[]) => {
  iconNames.forEach(name => {
    loadIcon(name);
  });
};

// Common icon sets for preloading
export const CRITICAL_ICONS = [
  'Menu', 'X', 'ChevronDown', 'Phone', 'Mail', 'MapPin', 'Home'
];

export const NAVIGATION_ICONS = [
  'Building2', 'FileText', 'HelpCircle', 'Shield', 'PiggyBank', 'Map'
];

export const UI_ICONS = [
  'CheckCircle', 'AlertCircle', 'Info', 'Star', 'Heart', 'Share2'
];