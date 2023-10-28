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
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'
import { useState } from 'react'

export const IdeaModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [description, setDescriptioon] = useState<string>()
  const { t } = useTranslation('common')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { description }
      await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      onClose()
      Router.replace(Router.asPath)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button onClick={() => onOpen()}>{t('idea.newIdea')}</Button>
      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
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
              <Button onClick={onClose} mr={3}>
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
