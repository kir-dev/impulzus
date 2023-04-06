import NextAuth, { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    /*GithubProvider({
      clientId: process.env.GITHUB_ID || 'ASD',
      clientSecret: process.env.GITHUB_SECRET || 'ASD'
    }),*/
    {
      id: 'authSch',
      name: 'AuthSch',
      type: 'oauth',
      authorization: {
        url: 'https://auth.sch.bme.hu/site/login',
        params: {
          scope: 'mail'
        }
      },
      token: 'https://auth.sch.bme.hu/oauth2/token',
      clientId: process.env.AUTHSCH_CLIENT_ID,
      clientSecret: process.env.AUTHSCH_CLIENT_SECRET,
      profile(profile) {
        return profile
      }
    }
  ],
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  }
}

export default NextAuth(authOptions)
