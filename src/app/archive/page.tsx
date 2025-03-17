import ArchiveClient from '@/components/archive/ArchiveClient'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export default async function Archive() {
  const newspapers = await prisma.newspaper.findMany()
  const session = await getServerSession(authOptions)
  const isAdmin = !!session?.user?.isAdmin
  const deleteData = async (id: number) => {
    'use server'
    prisma.newspaper.delete({ where: { id } })
  }
  return <ArchiveClient newspapers={newspapers} isAdmin={isAdmin} deleteData={deleteData} />
}
