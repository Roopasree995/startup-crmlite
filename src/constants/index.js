export const STATUS_OPTIONS = [
  'New',
  'Contacted',
  'Meeting Scheduled',
  'Proposal Sent',
  'Won',
  'Lost'
];

export const SOURCE_OPTIONS = [
  'Website',
  'Referral',
  'LinkedIn',
  'Cold Call',
  'Email Campaign',
  'Other'
];

export const STATUS_COLORS = {
  New: '#94A3B8',
  Contacted: '#2563EB',
  Meeting: '#F59E0B',
  Proposal: '#7C3AED',
  Won: '#22C55E',
  Lost: '#EF4444',
};

// Map full statuses from lead objects to shortened forms
export const STATUS_MAP = {
  'New': 'New',
  'Contacted': 'Contacted',
  'Meeting Scheduled': 'Meeting',
  'Proposal Sent': 'Proposal',
  'Won': 'Won',
  'Lost': 'Lost',
};

// Standard primary colors for non-status charts
export const CHART_COLORS = {
  primary: '#2563EB', // Blue
  success: '#22C55E', // Green
  warning: '#F59E0B', // Amber
  purple: '#7C3AED',  // Purple
  danger: '#EF4444',  // Red
  slate: '#64748B',   // Slate
};

// Recharts theme styling variables for Light vs Dark Modes
export const getChartTheme = (isDarkMode) => ({
  gridColor: isDarkMode ? '#334155' : '#E2E8F0', // slate-700 / slate-200
  textColor: isDarkMode ? '#94A3B8' : '#64748B', // slate-400 / slate-500
  tooltipBg: isDarkMode ? '#1E293B' : '#FFFFFF', // slate-800 / white
  tooltipBorder: isDarkMode ? '#334155' : '#E2E8F0', // slate-700 / slate-200
  tooltipText: isDarkMode ? '#F8FAFC' : '#0F172A', // slate-50 / slate-900
});
