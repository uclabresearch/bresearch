import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account.provider === 'google') {
        return (
          profile.email_verified &&
          (profile.email.endsWith('@ucla.edu') || profile.email.endsWith('.ucla.edu'))
        );
      }
      return false; // Do different verification for other providers that don't have `email_verified`
    },
  },
};
export default NextAuth(authOptions);