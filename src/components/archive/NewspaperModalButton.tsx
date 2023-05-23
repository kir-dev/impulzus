import { NewspaperEntity } from '@/pages/api/newspapers/dto/NewspaperEntity.dto'
import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { useForm } from 'react-hook-form'
import { FaPencilAlt } from 'react-icons/fa'
import { getStatusString } from '../common/editor/editorUtils'

type Props = {
  newspaper?: NewspaperEntity
}

export const NewspaperModalButton = ({ newspaper }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: newspaper?.title,
      grade: newspaper?.grade,
      coverImage: newspaper?.coverImage,
      contents: newspaper?.contents?.toString(),
      pdf: newspaper?.pdf
    },
    mode: 'all'
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const formData = {
      title: data.title,
      grade: Number(data.grade),
      coverImage: data.coverImage,
      contents: data.contents?.split(','),
      pdf: data.pdf
    }
    newspaper ? updateData(formData) : submitData(formData)
  })

  const submitData = async (formData: Partial<NewspaperEntity>) => {
    try {
      await fetch('/api/newspapers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      onClose()
      Router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const updateData = async (formData: Partial<NewspaperEntity>) => {
    try {
      await fetch('/api/newspapers/' + newspaper?.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      onClose()
      Router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {newspaper ? (
        <IconButton colorScheme="yellow" aria-label="edit" children={<FaPencilAlt />} onClick={() => onOpen()} />
      ) : (
        <Button onClick={() => onOpen()}>Új cikk</Button>
      )}

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{newspaper ? newspaper.title + ' módosítása' : 'Új cikk'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={!!errors.title} isRequired>
                <FormLabel>Cikk címe</FormLabel>
                <Input
                  autoFocus
                  type="text"
                  {...register('title', {
                    required: { value: true, message: 'A cím nem lehet üres!' },
                    maxLength: {
                      value: 200,
                      message: 'Cím túl hosszú! ' + getStatusString(watch('title'), 200)
                    }
                  })}
                  placeholder="XLIX. évfolyam, 3. szám"
                />
                {errors.title && <FormErrorMessage>{errors.title.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl mt={2} isInvalid={!!errors.grade} isRequired>
                <FormLabel>Évfolyam</FormLabel>
                <Input
                  type="number"
                  {...register('grade', {
                    required: { value: true, message: 'Az évfolyam nem lehet üres!' },
                    min: { value: 1, message: 'Az évfolyam legalább 1!' },
                    maxLength: {
                      value: 200,
                      message: 'Cím túl hosszú! ' + getStatusString(watch('grade')?.toString(), 200)
                    }
                  })}
                  placeholder="50"
                />
                {errors.grade && <FormErrorMessage>{errors.grade.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl mt={2} isInvalid={!!errors.contents}>
                <FormLabel>Tartalom</FormLabel>
                <Input
                  type="text"
                  {...register('contents', {
                    maxLength: {
                      value: 200,
                      message: 'Tartalom túl hosszú! ' + getStatusString(watch('contents'), 200)
                    }
                  })}
                  placeholder="Tartalom, tartalom2..."
                />
                {errors.contents && <FormErrorMessage>{errors.contents.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl mt={2} isInvalid={!!errors.coverImage}>
                <FormLabel>Borítókép url</FormLabel>
                <Input
                  type="text"
                  {...register('coverImage', {
                    pattern: {
                      value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                      message: 'Rossz url'
                    },
                    maxLength: {
                      value: 200,
                      message: 'Url túl hosszú! ' + getStatusString(watch('coverImage') ?? '', 200)
                    }
                  })}
                  placeholder="https://image"
                />
                {errors.coverImage && <FormErrorMessage>{errors.coverImage.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl mt={2} isInvalid={!!errors.pdf}>
                <FormLabel>Pdf név</FormLabel>
                <Input
                  type="text"
                  {...register('pdf', {
                    maxLength: {
                      value: 200,
                      message: 'Url túl hosszú! ' + getStatusString(watch('pdf') ?? '', 200)
                    }
                  })}
                  placeholder="L-2"
                />
                {errors.pdf && <FormErrorMessage>{errors.pdf.message?.toString()}</FormErrorMessage>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  onClose()
                  reset()
                }}
                mr={3}
              >
                Mégse
              </Button>
              <Button colorScheme="blue" type="submit" onClick={() => onSubmit()}>
                Mentés
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
