import NextAuth, { AuthOptions, DefaultSession } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      googleId?: string;
    } & DefaultSession["user"];
  }
}

// Extend the session type to include the
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub, // This is the Google user ID
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.googleId = profile.sub; // Store the Google user ID in the JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.googleId = token.googleId as string; // Pass the Google user ID to the session object
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
