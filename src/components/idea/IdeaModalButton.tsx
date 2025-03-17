'use client'
import { createIdea } from '@/util/idea/actions'
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export const IdeaModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [description, setDescriptioon] = useState<string>('')
  const t = useTranslations()
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    createIdea(description)
    onClose()
    setDescriptioon('')
  }

  return (
    <>
      <Button onClick={() => onOpen()}>{t('idea.newIdea')}</Button>
      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{t('idea.newIdea')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>{t('common.description')}</FormLabel>
                <Textarea
                  autoFocus
                  placeholder={t('idea.ideaOrSuggestion')}
                  value={description}
                  onChange={(e) => setDescriptioon(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={close} mr={3}>
                {t('common.cancel')}
              </Button>
              <Button colorScheme="blue" type="submit" onClick={(e) => submitData(e)}>
                {t('common.save')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
