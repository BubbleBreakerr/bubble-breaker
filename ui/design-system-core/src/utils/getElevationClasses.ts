import { BaseElevation, Elevation } from '../components/types/common.types';

export function getElevationClasses(elevation: Elevation) {
  if (typeof elevation === 'object') {
    return `${getBaseElevationClasses(elevation.light)} dark:${getBaseElevationClasses(
      elevation.dark,
    )}`;
  }

  return getBaseElevationClasses(elevation);
}

function getBaseElevationClasses(elevation: BaseElevation) {
  switch (elevation) {
    case 'none':
      return '';
    case '1':
      return 'shadow-[0_0_4px_rgba(0,0,0,0.2)]';
    case '2':
      return 'shadow-[0_0_4px_rgba(255, 255, 255, 0.4)]';
  }
}