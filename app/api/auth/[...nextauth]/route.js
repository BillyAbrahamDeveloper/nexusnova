import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import { connectDB } from '@/lib/db';
import { signJwtToken } from '@/lib/jwt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials;

        try {
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error('User not found!');
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error(`Password didn't match!`);
          } else {
            const { password, ...currentuser } = user._doc;
            const accessToken = signJwtToken(currentuser, { expiresIn: '7d' });
            return {
              ...currentuser,
              accessToken,
            };
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,

  useCallback: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
