import {
  Zap,
  CircuitBoard,
  Microscope,
  Cpu,
  Wifi,
  Eye,
  Network,
  Navigation,
  Radar,
  Activity,
  LucideIcon
} from 'lucide-react';

// Map icon string names to Lucide React icon components
const iconMap: Record<string, LucideIcon> = {
  Zap,
  CircuitBoard,
  Microscope,
  Cpu,
  Wifi,
  Eye,
  Network,
  Navigation,
  Radar,
  Activity
};

/**
 * Get a Lucide icon component by its string name
 * @param iconName - The name of the icon (e.g., "Zap", "CircuitBoard")
 * @returns The corresponding Lucide icon component, or Zap as default
 */
export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Zap;
};

export default iconMap;
