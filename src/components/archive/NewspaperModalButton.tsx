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
  useDisclosure
} from '@chakra-ui/react'
import Router from 'next/router'
import { useState } from 'react'

export const NewspaperModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>()
  const [grade, setGrade] = useState<number>()

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, grade, ISSUU_Link: ' ' }
      await fetch('/api/newspapers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      onClose()
      Router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          onOpen()
        }}
      >
        Új cikk
      </Button>

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Új cikk</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Cikk címe</FormLabel>
                <Input autoFocus placeholder="Cikk címe" value={title} onChange={(e) => setTitle(e.target.value)} />
                <FormLabel>Évfolyam</FormLabel>
                <Input type="number" placeholder="Évfolyam" value={grade} onChange={(e) => setGrade(Number(e.target.value))} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Mégse
              </Button>
              <Button type="submit" onClick={(e) => submitData(e)}>
                Mentés
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
