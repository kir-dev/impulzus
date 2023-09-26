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
import Router from 'next/router'
import { useState } from 'react'

export const IdeaModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [description, setDescriptioon] = useState<string>()

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
      <Button onClick={() => onOpen()}>Új ötlet</Button>
      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{'Új ötlet'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Leírás</FormLabel>
                <Textarea
                  autoFocus
                  placeholder="Ötlet, gondolat...."
                  value={description}
                  onChange={(e) => setDescriptioon(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Mégse
              </Button>
              <Button colorScheme="blue" type="submit" onClick={(e) => submitData(e)}>
                Mentés
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
