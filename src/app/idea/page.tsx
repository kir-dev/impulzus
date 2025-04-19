import IdeaInput from '@/components/idea/IdeaInput'
import IdeaStack from '@/components/idea/IdeaStack'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { IdeaEntity } from '../../models/IdeaEntity'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export default async function Idea() {
  const ideas: IdeaEntity[] = await prisma.idea.findMany()
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (user?.isAdmin) {
    return <IdeaStack ideas={ideas} />
  }
  return <IdeaInput />
}
