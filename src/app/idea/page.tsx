import IdeaStack from '@/components/idea/IdeaStack'
import prisma from '@/lib/prisma'
import { IdeaEntity } from '../../models/IdeaEntity'

export default async function Idea() {
  const ideas: IdeaEntity[] = await prisma.idea.findMany()
  return <IdeaStack ideas={ideas} />
}
