/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,jsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				navy: "#14213D",
				cat: "#FCA311",
				success: "#4B8175",
				"success-light": "#DCEBE6",
				error: "#AA302B",
				"error-light": "#F9D1CF",
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
				pacifico: ["Pacifico", "cursive"],
			},
		},
		screens: {
			xsm: "350px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
	},
	plugins: [],
};
