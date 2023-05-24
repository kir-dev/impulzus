import { getUserInfo } from '@/components/auth/getUserInfo'
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: 'authsch',
      name: 'AuthSch',
      type: 'oauth',
      authorization: {
        url: 'https://auth.sch.bme.hu/site/login',
        params: {
          scope: 'basic givenName displayName mail eduPersonEntitlement'
        }
      },
      token: {
        url: 'https://auth.sch.bme.hu/oauth2/token'
      },
      userinfo: {
        url: 'https://auth.sch.bme.hu/api/profile',
        async request(context) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return await getUserInfo(context.tokens.access_token!)
        }
      },
      clientId: process.env.AUTHSCH_CLIENT_ID,
      clientSecret: process.env.AUTHSCH_CLIENT_SECRET,
      profile(profile) {
        //TODO
        //const impulzusTitles = profile.eduPersonEntitlement.map((e: any) => e.name === 'Impulzus')[0].title
        return {
          id: '1',
          authSchId: profile.internal_id,
          email: profile.mail,
          name: profile.displayName,
          emailVerified: profile.emailVerified,
          titles: profile.eduPersonEntitlement[0].title,
          isAdmin: false,
          isBoardMember: false,
          picture: ''
        }
      }
    }
  ],
  secret: process.env.NEXTAUTH_SECRET,
  /*events: {
    async signIn(message) {
      //console.log('Message: ' + message)
      // on successful sign in
    }
  },
 logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      //console.warn(code)
    },
    debug(code, metadata) {
      //console.debug(code, metadata)
    }
  },*/
  debug: true,

  callbacks: {
    async session({ session, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = user

      const userDetails = await prisma.user.findUnique({
        where: {
          id: user.id
        }
      })

      session.user = userDetails || undefined

      return session
    }
  }

  /*callbacks: {
    async jwt({ token, user }) {
      // Step 1: update the token based on the user object
      if (user) {
        token.isAdmin = user.isAdmin
        token.isBoardMember = user.isBoardMember
        console.log(token)
      }
      return token
    },
    async session({ session, user, token }) {
      // Step 2: update the session.user based on the token object
      if (token && session.user) {
        session.user.isAdmin = token.isAdmin
        session.user.isBoardMember = token.isBoardMember
      }
      return session
    }
  }*/

  /*session: {
    strategy: 'jwt'
  }*/

  /*theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code
    logo: '', // Absolute URL to image
    buttonText: '' // Hex color code
  }*/
}

export default NextAuth(authOptions)
