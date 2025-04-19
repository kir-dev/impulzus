'use client'

import { MeetingData } from '@/models/MeetingEntity'
import { CalendarIcon, InfoIcon, TimeIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, Icon, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { useLocale, useTranslations } from 'next-intl'
import { EditMeetingModal } from './EditMeetingModal'

type Props = {
  meeting?: MeetingData
}

export const NextMeetingBox = ({ meeting }: Props) => {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const t = useTranslations('meeting')
  const locale = useLocale()
  console.log('locale', locale)
  const localeStringFormat = locale === 'hu' ? 'hu-HU' : 'en-US'
  if (!meeting) return <EditMeetingModal meeting={meeting} />
  const date = new Date(meeting.date)
  const formattedDate = date.toLocaleDateString(localeStringFormat, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Box p={5} borderRadius="lg" boxShadow="md" w="full" bg={bg} position={'relative'}>
      <Heading size="md" mb={3}>
        {t('nextMeeting')}
      </Heading>
      <VStack align="start" spacing={2}>
        <HStack>
          <Icon as={CalendarIcon} color="gray.600" />
          <Text>{formattedDate}</Text>
        </HStack>
        <HStack>
          <Icon as={TimeIcon} color="gray.600" />
          <Text>
            {date.toLocaleTimeString(localeStringFormat, {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </HStack>
        <HStack>
          <Icon as={InfoIcon} color="gray.600" />
          <Text>{meeting.location}</Text>
        </HStack>
      </VStack>
      <EditMeetingModal meeting={meeting} />
    </Box>
  )
}
