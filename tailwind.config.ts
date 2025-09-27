import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'display': ['SF Pro Display', 'Inter', 'sans-serif'],
			},
			colors: {
				// Web3 Futuristic Palette
				'space': {
					900: '#0F0F23',
					800: '#1A1B3E', 
					700: '#252659',
					600: '#303174',
					500: '#3B3C8F',
					400: '#4647AA',
					300: '#5152C5',
					200: '#6B6DE0',
					100: '#8688FB',
				},
				'cyber': {
					900: '#8E1B4B',
					800: '#A02357',
					700: '#B22B63',
					600: '#C4336F',
					500: '#D63B7B',
					400: '#E84387',
					300: '#FA4B93',
					200: '#FF63A5',
					100: '#FF7BB7',
				},
				'neon': {
					cyan: '#00F5FF',
					violet: '#8B5CF6',
					pink: '#FF10F0',
					blue: '#3B82F6',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem',
			},
			backdropBlur: {
				xs: '2px',
			},
			boxShadow: {
				'neon': '0 0 20px rgba(139, 92, 246, 0.3)',
				'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.3)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0', opacity: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)', opacity: '1'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)', opacity: '1'
					},
					to: {
						height: '0', opacity: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
					'50%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;