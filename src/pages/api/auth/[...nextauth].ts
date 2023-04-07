import { getUserInfo } from '@/components/auth/getUserInfo'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || 'ASD',
      clientSecret: process.env.GITHUB_SECRET || 'ASD'
    }),
    {
      id: 'authsch',
      name: 'AuthSch',
      type: 'oauth',
      authorization: {
        url: 'https://auth.sch.bme.hu/site/login',
        params: {
          scope: 'basic givenName displayName mail'
        }
      },
      token: {
        url: 'https://auth.sch.bme.hu/oauth2/token'
      },
      //accessTokenUrl: 'https://auth.sch.bme.hu/oauth2/token',
      userinfo: {
        url: 'https://auth.sch.bme.hu/api/profile',
        async request(context) {
          console.log(context)
          return await getUserInfo(context.tokens.access_token!!)
        }
      },

      clientId: process.env.AUTHSCH_CLIENT_ID,
      clientSecret: process.env.AUTHSCH_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.internal_id,
          email: profile.mail,
          fullName: profile.displayName
        }
      }
    }
  ],
  events: {
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
  },
  debug: true
  /*session: {
    strategy: 'jwt'
  }*
  /*,
  callbacks: {
    async signIn({ profile }) {
      return true
    }
  },

  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code
    logo: '', // Absolute URL to image
    buttonText: '' // Hex color code
  }*/
}

export default NextAuth(authOptions)
