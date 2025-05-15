
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
			fontFamily: {
				sans: ['Cairo', 'Montserrat', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				cairo: ['Cairo', 'sans-serif'],
			},
			colors: {
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
				},
				"pegasus-orange": "#F97316",
				"pegasus-light-orange": "#FEC6A1",
				"pegasus-dark-orange": "#E55D11",
				"pegasus-orange-50": "#FFF7F0",
				"pegasus-orange-100": "#FFEDD5",
				"pegasus-orange-200": "#FED7AA",
				"pegasus-orange-300": "#FDBA74",
				"pegasus-orange-400": "#FB923C",
				"pegasus-orange-500": "#F97316",
				"pegasus-orange-600": "#EA580C",
				"pegasus-orange-700": "#C2410C",
				"pegasus-orange-800": "#9A3412",
				"pegasus-orange-900": "#7C2D12",
				"pegasus-gray": "#f1f1f1",
				"pegasus-gray-dark": "#333333",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
				'card': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'pricing': '0 20px 25px -5px rgba(249, 115, 22, 0.1), 0 10px 10px -5px rgba(249, 115, 22, 0.04)',
				'glow': '0 0 15px rgba(249, 115, 22, 0.5)',
				'3d': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.1)',
                'neon': '0 0 5px rgba(249, 115, 22, 0.5), 0 0 20px rgba(249, 115, 22, 0.3)',
                'inner-glow': 'inset 0 0 15px rgba(249, 115, 22, 0.2)'
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'fade-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'float-slow': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-15px)'
					}
				},
				'pulse-light': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'pulse-gentle': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.9',
						transform: 'scale(0.98)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'slide-in': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'bounce-gentle': {
                    '0%, 100%': {
                        transform: 'translateY(0)'
                    },
                    '50%': {
                        transform: 'translateY(-5px)'
                    }
                },
                'spin-slow': {
                    '0%': {
                        transform: 'rotate(0deg)'
                    },
                    '100%': {
                        transform: 'rotate(360deg)'
                    }
                },
                'ripple': {
                    '0%': {
                        transform: 'scale(0)',
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'scale(4)',
                        opacity: '0'
                    }
                },
                'shimmer': {
                    '0%': {
                        backgroundPosition: '-500px 0'
                    },
                    '100%': {
                        backgroundPosition: '500px 0'
                    }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-in-delay-1': 'fade-in 0.5s ease-out 0.1s forwards',
				'fade-in-delay-2': 'fade-in 0.5s ease-out 0.2s forwards',
				'fade-in-delay-3': 'fade-in 0.5s ease-out 0.3s forwards',
				'fade-in-delay-4': 'fade-in 0.5s ease-out 0.4s forwards',
				'fade-in-delay-5': 'fade-in 0.5s ease-out 0.5s forwards',
				'fade-in-right': 'fade-in-right 0.5s ease-out',
				'fade-in-left': 'fade-in-left 0.5s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'float-slow': 'float-slow 8s ease-in-out infinite',
				'pulse-light': 'pulse-light 3s infinite',
				'pulse-gentle': 'pulse-gentle 3s infinite',
				'scale-in': 'scale-in 0.3s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
                'spin-slow': 'spin-slow 12s linear infinite',
                'ripple': 'ripple 1s ease-out',
                'shimmer': 'shimmer 1.5s infinite linear'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-pattern': 'url("/patterns/hero-pattern.svg")',
				'orange-gradient': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
				'orange-light-gradient': 'linear-gradient(135deg, #FED7AA 0%, #FB923C 100%)',
				'shimmer': 'linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.2), transparent)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

