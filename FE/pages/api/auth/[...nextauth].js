import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api/auth/login`;

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials_login',
            async authorize(credentials) {
                const res = await fetch(
                    `${baseUrl}?email=${credentials.email}&password=${credentials.password}`,
                    {
                        method: 'POST',
                        body: `email=${credentials.email}&password=${credentials.password}`,
                        headers: { Accept: 'application/json' }
                    }
                );
                const resp = await res.json();
                console.log('Respose data', resp.data);
                if (resp.data.success) {
                    return {
                        email: credentials.email,
                        name: resp.data.token,
                        token: resp.data.token
                    };
                }

                throw `/auth/signin?message=Wrong eail or password`;
                // return null
            }
        })
    ],
    events: {
        async signIn(message) {
            /* on successful sign in */
            // registration/login via provider
            if (message.account?.provider) {
                const dataUser = message.user;
                dataUser.provider = message.account.provider;
                dataUser.providerId = message.account.id;
                await fetch(`${baseUrl}/provider`, {
                    method: 'POST',
                    body: JSON.stringify(dataUser),
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }
    },
    debug: true
});
