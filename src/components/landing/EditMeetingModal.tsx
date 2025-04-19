'use client'

import { MeetingData } from '@/models/MeetingEntity'
import { editMeeting } from '@/util/meeting/actions'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

export const EditMeetingModal = ({ meeting }: { meeting?: MeetingData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const meetingDate = new Date(meeting?.date || Date.now())
  const toast = useToast()
  const t = useTranslations('meeting')
  const [date, setDate] = useState(meetingDate.toISOString().split('T')[0])
  const [time, setTime] = useState(
    meetingDate.toLocaleTimeString('hu-HU', {
      hour: '2-digit',
      minute: '2-digit'
    })
  )
  const [location, setLocation] = useState(meeting?.location || '')

  const handleSave = () => {
    const dateTime = new Date(date)
    const timeParts = time.split(':')
    dateTime.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0, 0)
    editMeeting({
      id: 1,
      date: dateTime,
      location
    })
      .then(() => {
        toast({
          title: t('saved'),
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      })
      .catch((error) => {
        console.error(error)
        toast({
          title: t('error'),
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })

    onClose()
  }

  return (
    <>
      <Button size="md" onClick={onOpen} position={'absolute'} right={5} top={5}>
        <FaPencilAlt />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('editMeeting')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>{t('date')}</FormLabel>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>{t('time')}</FormLabel>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>{t('location')}</FormLabel>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              {t('cancel')}
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              {t('save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
