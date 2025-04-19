'use server'

import prisma from '@/lib/prisma'
import { MeetingData } from '@/models/MeetingEntity'
import { revalidatePath } from 'next/cache'

export const editMeeting = async (data: MeetingData) => {
  await prisma.meeting.upsert({
    where: { id: 1 },
    update: {
      date: new Date(data.date),
      location: data.location
    },
    create: {
      date: new Date(data.date),
      location: data.location
    }
  })
  revalidatePath('/')
}
export const getMeeting = async (): Promise<MeetingData> => {
  const meeting = await prisma.meeting.findFirst({
    where: { id: 1 }
  })
  if (!meeting)
    return {
      id: 1,
      date: new Date(),
      location: ''
    } as MeetingData
  return meeting
}
