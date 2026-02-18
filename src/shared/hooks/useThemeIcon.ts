import { useThemeStore } from '@/shared/store/themeStore';
import IconVeu from '@/app/assets/icon.svg';
import IconGravata from '@/app/assets/icon-blue.svg';

export function useThemeIcon() {
  const { mode } = useThemeStore();
  return mode === 'gravata' ? IconGravata : IconVeu;
}
