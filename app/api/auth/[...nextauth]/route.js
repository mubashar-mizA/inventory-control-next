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
      credentials: {},
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
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// App Router: Export NextAuth handler for GET and POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
