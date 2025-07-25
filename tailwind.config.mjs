/** @type {import('tailwindcss').Config} */

// variables
const primaryColor = "#1E6FD9";
const primaryColor2 = "#4A9DFF";
const primaryColorLight = "#0C1420";
const seondaryColor = "#0A2D5A";
const bodyColor = "#dddddd";
const bodyColor2 = "#7A7A7A";
const whiteColor = "#ffffff";
const blackColor = "#050709";
const blackColor2 = "#0b0410";
const grayColor = "#636363";
const grayColor2 = "#747779";
const grayColor3 = "#22272c";
const borderColor = "#d9d9d9";
const creamLightColor = "#f6f3fc";
const darkColor = "#0f0715";
const bgColor = "#10171c";
const bgColor2 = "#FFFFFF1A";
const bgColor3 = "#d9d9d980";
module.exports = {
  content: [
    "./demo/index.html",
    "./demo/**/*.{html,js}",
    "./src/**/*.{html,js}",
  ],
  darkMode: "class",

  theme: {
    // breakpoints
    screens: {
      xs: "0px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
      "3xl": "1601px",
      "4xl": "1701px",
    },
    extend: {
      colors: {
        "primary-color": primaryColor,
        "primary-color-2": primaryColor2,
        "primary-color-light": primaryColorLight,
        "seondary-color": seondaryColor,
        "body-color": bodyColor,
        "body-color-2": bodyColor2,
        "white-color": whiteColor,
        "black-color": blackColor,
        "black-color-2": blackColor2,
        "gray-color": grayColor,
        "gray-color-2": grayColor2,
        "gray-color-3": grayColor3,
        "dark-color": darkColor,
        "border-color": borderColor,
        "cream-light-color": creamLightColor,
        "dark-color": darkColor,
        "bg-color": bgColor,
        "bg-color-2": bgColor2,
        "bg-color-3": bgColor3,
      },
      // area and spacing
      width: {
        "1px": "1px",
        "13px": "13px",
        15: "3.75rem",
        30: "7.5rem",
        "30px": "30px",
        "35px": "35px",
        "43px": "43px",
        "50px": "3.125rem",
        "55px": "55px",
        "57px": "57px",
        "60px": "60px",
        "70px": "70px",
        "75px": "75px",
        "85px": "85px",
        "90px": "90px",
        "220px": "13.75rem",
        "322px": "20.125rem",
        dropdown: "13.75rem",
        "5000px": "5000px",
      },
      maxWidth: {
        15: "3.75rem",
        "50px": "3.125rem",
        "180px": "180px",
        "380px": "380px",
        "945px": "945px",
        "1120px": "1120px",
        400: "25rem",
        dropdown: "13.75rem",
        "120px": "120px",
        "100px": "100px",
        "265px": "265px",
        "330px": "330px",
        "355px": "355px",
        "438px": "438px",
        "480px": "480px",
        "526px": "526px",
        "536px": "33.5rem",
        "540px": "33.75rem",
        "600px": "600px",

        "700px": "43.75rem",
        "1080px": "1080px",
        "1132px": "1132px",
        "68%": "68%",
      },
      height: {
        "1px": "1px",
        "13px": "13px",
        15: "3.75rem",
        "30px": "30px",
        "35px": "35px",
        "43px": "43px",
        "50px": "3.125rem",
        "55px": "55px",
        "57px": "57px",
        "70px": "70px",
        "75px": "75px",
        "85px": "85px",
        "120px": "7.5rem",

        "220px": "13.75rem",
        "280px": "280px",
        "308px": "19.25rem",
        "348px": "348px",
      },
      minHeight: {
        "1px": "1px",
        15: "3.75rem",
        "120px": "7.5rem",
        "screen-90": "90vh",
      },
      padding: {
        "5px": "5px",
        "7px": "7px",
        "10px": ".625rem",
        "11px": "11px",
        "14px": ".875rem",
        "15px": ".9375rem",
        "17px": "17px",
        "18px": "1.125rem",
        "21px": "21px",
        "25px": "1.5625rem",
        "30px": "1.875rem",
        "35px": "2.1875rem",
        "44px": "44px",
        "45px": "2.8125rem",
        "50px": "3.125rem",
        "55px": "3.4375rem",
        "60px": "3.75rem",
        "65px": "4.0625rem",
        "70px": "4.375rem",
        "75px": "4.6875rem",
        "85px": "85px",
        "90px": "90px",
        "95px": "95px",
        "100px": "6.25rem",

        30: "7.5rem",
        "130px": "8.125rem",
        "135px": "8.4375rem",
        "140px": "8.75rem",
        "150px": "9.375rem",
        "160px": "10rem",
        "200px": "12.5rem",
        "230px": "14.375rem",
      },
      margin: {
        "10px": ".625rem",
        "15px": ".9375rem",
        "17px": "17px",
        "25px": "1.5625rem",
        "30px": "1.875rem",
        "35px": "2.1875rem",
        "45px": "2.8125rem",
        "50px": "3.125rem",
        "55px": "3.4375rem",
        "60px": "3.75rem",
        "70px": "4.375rem",
        "75px": "4.6875rem",
        "-5%": "-5%",
        "90px": "90px",
        "100px": "100px",
        30: "7.5rem",
        "135px": "8.4375rem",
      },
      gap: {
        "10px": "10px",
        "15px": "15px",
        "25px": "1.5625rem",
        "30px": "1.875rem",
        "35px": "35px",
        "45px": "2.8125rem",
        "50px": "3.125rem",
        "60px": "3.75rem",
      },

      // typography
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        fontawesome: `"Font Awesome 6 Pro"`,
        helvetica: `"Helvetica Neue", sans-serif`,
      },
      fontSize: {
        "size-13": ".8125rem",
        "size-15": ".9375rem",
        "size-17": "17px",
        "size-22": "1.375rem",
        "size-23": "1.4375rem",
        "size-25": "1.5625rem",
        "size-32": "2rem",
        "size-35": "2.1875rem",
        "size-38": "2.375rem",
        "size-40": "2.5rem",
        "size-45": "2.8125rem",
        "size-50": "3.125rem",
        "size-55": "3.4375rem",
        "size-58": "3.625rem",
        "size-64": "4rem",
        "size-65": "4.0625rem",

        "size-82": "5.125rem",
        "size-110": "6.875rem",
        "size-128": "8rem",
      },

      lineHeight: {
        1: "1",
        1.2: "1.2",
        1.4: "1.4",
        1.5: "1.5",
      },

      letterSpacing: {
        "1px": "1px",
      },
      zIndex: {
        1: "1",
        "3xl": 9999999,
        "4xl": 999999999,
      },
      translate: {
        "150%": "150%",
      },
      // border
      borderRadius: {
        "5px": "5px",
        "10px": "10px",
        "15px": "15px",
        "20px": "20px",
        "25px": "25px",
        "38px": "38px",
        "50px": "50px",
        "125px": "125px",
        "50%": "50%",
        "100%": "100%",
      },
      // gradient
      backgroundImage: {
        "gradient-primary": `linear-gradient(260deg,	${seondaryColor} 0%, ${primaryColor} 100%)`,
        "gradient-secondary": `linear-gradient( to right, ${primaryColor} 0%, ${seondaryColor} 51%, ${primaryColor} 100%)`,
        "gradient-secondary-2": `linear-gradient(90deg, ${primaryColor} 0%, ${seondaryColor} 110.61%)`,
        "gradient-text": `linear-gradient(to right, ${primaryColor} 0%, ${whiteColor} 100%)`,
        "gradient-text-light": `linear-gradient(to right, ${primaryColor} 0%, ${seondaryColor} 100%)`,
        "gradient-circle": `linear-gradient(260deg, ${primaryColor} 0%, rgba(115, 67, 210, 0) 100%)`,
        "gradient-primary-2": `linear-gradient(161deg, ${seondaryColor} 0%, ${primaryColor} 100%)`,
        "gradient-primary-3": `linear-gradient(to right, ${primaryColor} 0, ${primaryColor} 100%)`,
        "gradient-primary-4": `linear-gradient(-45deg, ${seondaryColor} 11.52%, ${primaryColor} 91.55%)`,
      },
      backgroundSize: {
        100: "100%",
        200: "200%",
      },

      // animations
      keyframes: {
        "animate-pulse": {
          "0%": {
            boxShadow: `0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 0 rgba(255, 255, 255, 0.7)`,
          },
          "40%": {
            boxShadow: `0 0 0 50px rgba(255, 255, 255, 0), 0 0 0 0 rgba(255, 255, 255, 0.7)`,
          },
          "80%": {
            boxShadow: `0 0 0 50px rgba(255, 255, 255, 0), 0 0 0 30px rgba(255, 255, 255, 0)`,
          },
          "100%": {
            boxShadow: `0 0 0 0 rgba(255, 255, 255, 0), 0 0 0 30px rgba(255, 255, 255, 0)`,
          },
        },
        rotateImg: {
          "0%": {
            transform: `rotate(0deg)`,
          },

          "100%": {
            transform: `rotate(360deg)`,
          },
        },
        rotateImgReverse: {
          "0%": {
            transform: `rotate(0deg)`,
          },

          "100%": {
            transform: `rotate(-360deg)`,
          },
        },
      },
      animation: {
        "animate-pulse": "animate-pulse 3s linear infinite",
        "animate-spin": "rotateImg 6s infinite linear",
        "animate-spin-reverse": "rotateImgReverse 6s infinite linear",
      },
      // shadow
      boxShadow: {
        "boxShadow-1": "0 16px 40px rgba(135, 80, 247, 0.1)",
      },
      // animain
    },

    // container
    container: {
      center: true,
      margin: "0 auto",
      padding: "12px",

      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
