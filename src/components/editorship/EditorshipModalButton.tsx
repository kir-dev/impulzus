import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
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
import { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

type Props = {
  _id?: string
  _name?: string
  _email?: string
  _titles?: string[]
  _picture?: string
}

export const EditorshipModalButton = ({ _id, _name, _email, _titles, _picture }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fullName, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [picture, setPicture] = useState<string>()
  const [titles, setTitles] = useState<string>()
  const titleList = titles?.split(',')

  useEffect(() => {
    setName(_name)
    setEmail(_email)
    setTitles(_titles?.toString())
    setPicture(_picture)
  }, [])

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { fullName, email, picture, titles: titleList }
      await fetch('/api/users', {
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

  const updateData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { fullName, email, picture, titles: titleList }
      await fetch('/api/users/' + _id, {
        method: 'PATCH',
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
      {_id ? (
        <IconButton bg="blue.100" aria-label="edit" children={<FaPencilAlt />} onClick={() => onOpen()} />
      ) : (
        <Button onClick={() => onOpen()}>Új tag</Button>
      )}

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{_name ? _name + ' módosítása' : 'Új tag'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Név</FormLabel>
                <Input autoFocus placeholder="Teszt Elek" value={fullName} onChange={(e) => setName(e.target.value)} />
                <FormLabel>Email</FormLabel>
                <Input type="string" placeholder="valami@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <FormLabel>Posztok</FormLabel>
                <Input type="string" placeholder="Író, grafikus" value={titles} onChange={(e) => setTitles(e.target.value)} />
                <FormLabel>Profilkép</FormLabel>
                <Input type="string" placeholder="https://image" value={picture} onChange={(e) => setPicture(e.target.value)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Mégse
              </Button>
              <Button type="submit" onClick={(e) => (_id ? updateData(e) : submitData(e))}>
                Mentés
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
