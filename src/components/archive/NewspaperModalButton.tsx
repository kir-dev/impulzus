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
import axios from 'axios'
import Router from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { FaFile, FaPencilAlt } from 'react-icons/fa'
import { getStatusString } from '../common/editor/editorUtils'
import { FileUpload } from './FileUpload'

type Props = {
  newspaper?: NewspaperEntity
}

export const NewspaperModalButton = ({ newspaper }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const methods = useForm<{
    files?: FileList
    title?: string
    grade?: number
    coverImage?: string | null
    contents: string | undefined
    pdf?: string | null
  }>({
    defaultValues: {
      title: newspaper?.title,
      grade: newspaper?.grade,
      coverImage: newspaper?.coverImage,
      contents: newspaper?.contents?.toString(),
      pdf: newspaper?.pdf
    },
    mode: 'all'
  })

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    const file = data.files?.[0]

    if (!file) {
      console.log('File missing')
      return
    }

    const formData = {
      title: data.title,
      grade: Number(data.grade),
      coverImage: data.coverImage,
      contents: data.contents?.split(','),
      pdf: file.name
    }

    try {
      const formData = new FormData()
      formData.append('pdf', file)
      await axios.post('/api/file', formData)
    } catch (e) {
      console.log(e)
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
      Router.replace(Router.asPath)
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
      Router.replace(Router.asPath)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {newspaper ? (
        <IconButton colorScheme="yellow" aria-label="edit" onClick={() => onOpen()}>
          <FaPencilAlt />
        </IconButton>
      ) : (
        <Button onClick={() => onOpen()}>Új lap</Button>
      )}

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>{newspaper ? newspaper.title + ' módosítása' : 'Új lap'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormProvider {...methods}>
                <FormControl isInvalid={!!errors.title} isRequired>
                  <FormLabel>Lap címe</FormLabel>
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
                  <FormLabel>Borítókép URL</FormLabel>
                  <Input
                    type="text"
                    {...register('coverImage', {
                      pattern: {
                        value:
                          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                        message: 'Rossz URL'
                      },
                      maxLength: {
                        value: 200,
                        message: 'URL túl hosszú! ' + getStatusString(watch('coverImage') ?? '', 200)
                      }
                    })}
                    placeholder="https://image"
                  />
                  {errors.coverImage && <FormErrorMessage>{errors.coverImage.message?.toString()}</FormErrorMessage>}
                </FormControl>

                <FileUpload
                  fieldTitle="PDF"
                  oldFileName={newspaper?.pdf}
                  required
                  fieldName="files"
                  buttonIcon={<FaFile />}
                  accept={'.pdf'}
                />
              </FormProvider>
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
              <Button colorScheme="blue" type="submit">
                Mentés
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
