import connectToDB from "@/config/connectToDB";
import { createUser } from "@/services/createUser";
import { findUser } from "@/services/findUser";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      const client = await connectToDB();

      // check for existing user
      const { rows } = await findUser(client, session.user.email);
      if (!rows) return null;

      session.user.userId = rows[0].user_id;
      await client.end();
      return session;
    },
    async signIn({ account, profile }) {
      try {
        const client = await connectToDB();

        // check for existing user
        const user = await findUser(client, profile.email);

        // if user not found, create user
        if (user.rows.length === 0) {
          const userId = uuidv4();

          await createUser(
            client,
            userId,
            profile.email,
            profile.name,
            profile.picture
          );
        }

        await client.end();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
