import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
			colors: {
				border: 'hsl(var(--border))', // Kept as is, border opacity will be applied in className
				input: 'hsla(var(--input), 0.35)', // Made transparent
				ring: 'hsl(var(--ring))',
        ringAccent: 'hsl(var(--ring-accent))',
				background: 'hsl(var(--background))', // Body background, kept mostly opaque via CSS variables
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsla(var(--primary), 0.8)', // Slightly transparent
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsla(var(--secondary), 0.8)', // Slightly transparent
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsla(var(--destructive), 0.8)', // Slightly transparent
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsla(var(--muted), 0.4)', // Made transparent
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsla(var(--accent), 0.6)', // Slightly transparent
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsla(var(--popover), 0.65)', // Made transparent
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsla(var(--card), 0.35)', // Made transparent
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsla(var(--sidebar-background), 0.30)', // Made transparent
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsla(var(--sidebar-primary), 0.8)',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsla(var(--sidebar-accent), 0.6)',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsla(var(--sidebar-border), 0.5)', // Sidebar's own border can be semi-transparent
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 4px)',
				sm: 'calc(var(--radius) - 8px)'
			},
			fontFamily: {
        sans: ['var(--font-sans-custom)'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;