import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { CONNECT_DB } from "@/app/configs/db_config";
import { userModel } from "@/app/models/user_model";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" }, // ✅ Optional: for clarity
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await CONNECT_DB();
          const { email, password } = credentials;
          if (!email || !password) return null;

          const user = await userModel.findOne({ email });
          if (!user) return null;

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return null;

          return {
            id: user._id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.log("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // ❌ WAS EMPTY: Fixed to point to your custom signin route
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id; // ✅ FIXED: previously was assigning to itself
        token.userName = user.name; // ❌ WAS: token.userName = token.userName;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.userName = token.userName;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
