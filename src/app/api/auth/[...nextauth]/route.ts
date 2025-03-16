import { getUserInfo } from '@/components/auth/getUserInfo'
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'

type Entitlement = {
  id: number
  name: string
  title: string[]
  status: string
  start: Date
  end: string | null
}

type AuthSchProfile = {
  internal_id: string
  displayName: string
  givenName: string
  mail: string
  eduPersonEntitlement: Entitlement[]
}

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
      profile(profile: AuthSchProfile) {
        const impulzusEntitlements = profile.eduPersonEntitlement?.filter((e) => e.name === 'Impulzus')[0]
        const titles = impulzusEntitlements ? impulzusEntitlements.title : []

        return {
          id: profile.internal_id,
          authSchId: profile.internal_id,
          email: profile.mail,
          name: profile.displayName,
          emailVerified: true,
          titles: titles,
          isAdmin: false,
          isBoardMember: false,
          picture: ''
        }
      }
    }
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async session({ session, user }) {
      session.user = user
      return session
    }
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
