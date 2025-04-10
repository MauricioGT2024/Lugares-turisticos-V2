export const AREA_THEMES = {
  Centro: {
    gradient: 'from-amber-400 to-emerald-400',
    color: 'amber.400',
    badge: 'rgba(255, 214, 0, 0.9)',
    hover: 'yellow.400'
  },
  Noroeste: {
    gradient: 'from-emerald-400 to-teal-400', 
    color: 'emerald.400',
    badge: 'rgba(72, 187, 120, 0.9)',
    hover: 'green.400'
  },
  Sureste: {
    gradient: 'from-sky-400 to-cyan-400',
    color: 'sky.400',
    badge: 'rgba(66, 153, 225, 0.9)',
    hover: 'blue.400'
  },
  Norte: {
    gradient: 'from-orange-400 to-amber-400',
    color: 'orange.400',
    badge: 'rgba(237, 137, 54, 0.9)',
    hover: 'orange.400'
  }
};

export const DEFAULT_THEME = {
  gradient: 'from-gray-400 to-slate-400',
  color: 'gray.400',
  badge: 'rgba(160, 174, 192, 0.9)',
  hover: 'gray.400'
};

export const getAreaTheme = (area) => {
  return AREA_THEMES[area] || DEFAULT_THEME;
};
