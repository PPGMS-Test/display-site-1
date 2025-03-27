import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // './public/index.html',
    // "./src/**/*.{js,jsx,ts,tsx}"



    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", // for sidebar layout. adds grid-cols-sidebar class
      },
      gridTemplateRows: {
        header: "64px auto", // for the navbar layout. adds grid-rows-header class
      },
    },
  },
  plugins: [],
}
export default config
