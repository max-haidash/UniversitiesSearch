/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['links.papareact.com', 'images.unsplash.com']
    },
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
        localeDetection: false
    },
    publicRuntimeConfig: {
        apiUrl: process.env.API_URL,
        siteUrl: process.env.API_SITE_URL,
        stripeKey: process.env.API_STRIPE,
        facebookClientId: process.env.FACEBOOK_CLIENT_ID
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
};
