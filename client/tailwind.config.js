/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path according to your project structure
  ],
  theme: {
    fontSize: {
      xs: ["8.69px", "11px"],
      sm: ["12px", "14px"],
      sm10: ["10px", "17px"],
      sm14: ["14px", "17px"],
      "2sm": ["15px", "23px"],
      base: "1rem",
      xl: ["18px", "20px"],
      "2xl": ["20px", "25px"],
      "3xl": ["32px", "33px"],
      "4xl": ["38px", "40px"],
      "5xl": ["42px", "48px"],
      "6xl": ["48px", "52px"],
      "7xl": ["55px", "62px"],
      24: ["24px", "29.26px"],
      21: ["21px", "29.26px"],
      22: ["22px", "1.5reem"],
    },
 
    backgroundImage: {
      'auth': "url('assets/auth/auth-frame.svg')",
      'auth-sinup': "url('assets/auth/auth-signup.svg')",
      'home':"url('assets/home/home-bg.svg')",
      'house': "url('assets/home/house-thailand.svg')",
      'contact': "url('assets/home/contactus.svg')",
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "4px",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
      xl:"16px",
      card: "0px 20px 20px 20px",
      'filter-btn':"15px 15px 0px 0px"
      
    },
    extend: {
      dropShadow: {
        light: "0px 4px 12px rgba(0, 0, 0, 0.04)",
      },
      boxShadow: {
        light:"linear-gradient(84deg, rgba(8, 8, 8, 0.75) 9.41%, rgba(32, 32, 32, 0.66) 18.2%, rgba(90, 89, 89, 0.44) 32.9%, rgba(206, 206, 206, 0.00) 57.29%, rgba(7, 11, 3, 0.75) 89.84%);",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        // roboto: ["Roboto", "sans-serif"],
      },
      screens: {},
      colors: {
      'reply-box':"rgba(225, 23, 141, 0.10)",
      transparent: "transparent",
      primary: {
        light: "#21994229",
        DEFAULT: "#219942a3",
        dark: "#219942",
      },
      secondary: {
        light:"#414141",
        DEFAULT: "#414141",
        dark: "#414141",
        lighter: "#303030"
      },
      tertiary: {
        light:"#00A9FF",
        DEFAULT: "#00A9FF",
        dark: "#00A9FF",
      },
      black: {
        light:"#343434",
        DEFAULT: "#000000",
        dark: "#000000",
      },
      white: {
        light:"#FFFFFF",
        DEFAULT: "#FFFFFF",
        dark: "#FFFFFF",
      },
      gray: {
        light:"#AFAEAE",
        DEFAULT: "#9D9D9D",
        dark: "#9D9D9D",
        lighter:"#7E7D7D"
      },
      green: {
        light:"#29AD17",
        DEFAULT: "#29AD17",
        dark: "#29AD17",
      },
      red: {
        light:'#ED3F3F',
        DEFAULT: "#ED3F3F",
        dark: "#ED3F3F",
      },
      blue: {
        light:'#00A9FF',
        DEFAULT: "#3B5998",
        dark: "#3B5998",
      }
  
    }
    }
  },
  plugins: [], // Add plugins if required
};
