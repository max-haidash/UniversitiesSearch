require('tailwindcss/colors');
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        fontFamily: {
            montserrat: ['Montserrat'],
            sans: ['"Montserrat"']
        },
        fontSize: {
            xsd: [
                '13px',
                {
                    lineHeight: '14px',
                    letterSpacing: '0.004em'
                }
            ],
            xs: [
                '12px',
                {
                    lineHeight: '17px',
                    letterSpacing: '0.004em'
                }
            ],
            sm: [
                '14px',
                {
                    lineHeight: '23px',
                    letterSpacing: '0.004em'
                }
            ],
            tiny: '.875rem',
            base: [
                '16px',
                {
                    lineHeight: '28px',
                    letterSpacing: '0.004em'
                }
            ],
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
            '8xl': '5rem'
        },
        extend: {
            colors: {
                social: {
                    facebook: '#3680FB',
                    twitter: '#00ACEE'
                },
                blue: {
                    550: '#141A3C',
                    450: '#435B8C',
                    350: '#99ABCE'
                },
                gray: {
                    25: '#E2E4E9',
                    50: '#A8AFBD',
                    75: '#EEF1F7',
                    100: '#F8F8F8',
                    200: '#C5CAD3',
                    150: '#ECEFF1',
                    180: '#CFD8DC',
                    250: '#FAFAFA',
                    350: '#4F5B84',
                    450: '#90A4AE',
                    500: '#8C94A6',
                    550: '#667085',
                    600: '#4F5B84'
                },
                orange: {
                    450: '#EE5342'
                },
                purple: {
                    250: '#cb55ac'
                },
                yellow: {
                    450: '#EFBB58'
                },
                green: {
                    250: '#00C868'
                },
                muted: {
                    400: '#869FAC'
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [require('@tailwindcss/forms')]
};
