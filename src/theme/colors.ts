// OLD COLORS (for reference)
// export const colors = {
//   primary: '#1063FD',
//   muted: '#3A5A92',
//   background: '#EFEEF6',
//   gray: '#6E6E73',
//   lightGray: '#DCDCE2',
//   green: '#4FEE57',
//   lightGreen: '#DBFFCB',
//   red: '#EF0827',
//   yellow: '#FCC70B',
//   white: '#FFFFFF',
// };

// NEW LUNE COLORS
export const colors = {
	// Primary Colors (replaces your old primary)
	primary: '#7c3aed', // Perfect match for your icon
	primaryLight: '#c4b5fd', // Keep this
	primaryDark: '#6d28d9', // Keep this

	// Muted/Secondary (replaces your old muted)
	muted: '#6b7280',
	secondary: '#e8ecf0',
	secondaryDark: '#c1c9d2',

	// Background Colors (replaces your old background)
	background: '#f9fafb',
	backgroundSecondary: '#f3f4f6',

	// Gray Colors (replaces your old gray/lightGray)
	gray: '#6b7280',
	lightGray: '#e5e7eb',
	darkGray: '#374151',

	// Status Colors (replaces your old green/red/yellow)
	green: '#34d399', // Success/online
	lightGreen: '#a7f3d0', // Light success backgrounds
	red: '#f87171', // Error states
	lightRed: '#fecaca', // Light error backgrounds
	yellow: '#fbbf24', // Warning states
	lightYellow: '#fef3c7', // Light warning backgrounds

	// Additional Lune-specific colors
	accent: '#ffd93d', // Star gold accent
	accentSoft: '#fff4a3', // Soft accent
	info: '#60a5fa', // Info states
	lightInfo: '#dbeafe', // Light info backgrounds

	// Text Colors
	textPrimary: '#1f2937',
	textSecondary: '#6b7280',
	textLight: '#9ca3af',

	// White (unchanged)
	white: '#ffffff',
	black: '#000000',

	// User Status
	online: '#10b981',
	away: '#f59e0b',
	offline: '#6b7280',

	// Border Colors
	border: '#e5e7eb',
	borderLight: '#f3f4f6',
};

// // MIGRATION MAPPING (for easy replacement in your code)
// export const colorMigrationMap = {
// 	// Old -> New mappings
// 	'#1063FD': colors.primary, // Your old primary -> new primary purple
// 	'#3A5A92': colors.muted, // Your old muted -> new muted gray
// 	'#EFEEF6': colors.background, // Your old background -> new background
// 	'#6E6E73': colors.gray, // Your old gray -> new gray
// 	'#DCDCE2': colors.lightGray, // Your old lightGray -> new lightGray
// 	'#4FEE57': colors.green, // Your old green -> new green
// 	'#DBFFCB': colors.lightGreen, // Your old lightGreen -> new lightGreen
// 	'#EF0827': colors.red, // Your old red -> new red
// 	'#FCC70B': colors.yellow, // Your old yellow -> new yellow
// 	'#FFFFFF': colors.white, // White stays the same
// };

// GRADIENT HELPER (for buttons, headers, etc.)
export const gradients = {
	primary: ['#667eea', '#764ba2'],
	primaryLight: ['#8a9bff', '#9bb5ff'],
	accent: ['#ffd93d', '#ffe066'],
};

// USAGE EXAMPLES:
//
// Instead of: backgroundColor: colors.primary
// Use: backgroundColor: colors.primary (new purple)
//
// For gradients:
// background: `linear-gradient(135deg, ${gradients.primary[0]}, ${gradients.primary[1]})`
//
// Or with React Native:
// backgroundColor: colors.primary
// Or for gradients with react-native-linear-gradient:
// colors={gradients.primary}
