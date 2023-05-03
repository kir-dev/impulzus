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
  _id?: number
  _titile?: string
  _grade?: number
  _contents?: string[]
  _coverImage?: string
}

export const NewspaperModalButton = ({ _id, _titile, _grade, _contents, _coverImage }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>()
  const [grade, setGrade] = useState<number>()
  const [coverImage, setCoverImage] = useState<string>()
  const [contents, setContents] = useState<string>()
  const contentsList = contents?.split(',')

  useEffect(() => {
    setTitle(_titile)
    setGrade(_grade)
    setCoverImage(_coverImage)
    setContents(_contents?.toString())
  }, [])

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(contentsList)
    try {
      const body = { title, grade, coverImage, ISSUU_Link: ' ', contents: contentsList }
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

  const updateData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, grade, coverImage, ISSUU_Link: ' ', contents: contentsList }
      await fetch('/api/newspapers/' + _id, {
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
        <Button onClick={() => onOpen()}>Új cikk</Button>
      )}

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{_titile ? _titile + ' módosítása' : 'Új cikk'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Cikk címe</FormLabel>
                <Input autoFocus placeholder="XLIX. évfolyam, 3. szám" value={title} onChange={(e) => setTitle(e.target.value)} />
                <FormLabel>Évfolyam</FormLabel>
                <Input type="number" placeholder="15" value={grade} onChange={(e) => setGrade(Number(e.target.value))} />
                <FormLabel>Tartalom jegyzék</FormLabel>
                <Input type="string" placeholder="tartalom, tartalom2" value={contents} onChange={(e) => setContents(e.target.value)} />
                <FormLabel>Borítókép</FormLabel>
                <Input type="string" placeholder="https://image" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
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
