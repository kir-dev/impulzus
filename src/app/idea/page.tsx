import IdeaStack from '@/components/idea/IdeaStack'
import prisma from '@/lib/prisma'
import { IdeaEntity } from '../../models/IdeaEntity'

export default async function Idea() {
  const ideas: IdeaEntity[] = await prisma.idea.findMany()
  const deleteData = async (id: number) => {
    'use server'
    await prisma.idea.delete({
      where: {
        id
      }
    })
  }
  return <IdeaStack ideas={ideas} deleteData={deleteData} />
}
