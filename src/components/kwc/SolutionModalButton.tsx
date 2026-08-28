'use client'

import { CreateSolutionDTO } from '@/models/SolutionEntity'
import { uploadToS3 } from '@/util/files/upload'
import { createSolution } from '@/util/solutions/actions'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { FaFile } from 'react-icons/fa'
import { FileUpload } from '../archive/FileUpload'
import { getStatusString } from '../common/editor/editorUtils'

async function uploadFile(file: File): Promise<string> {
  const response = await fetch('/api/get-upload-url', {
    method: 'POST',
    body: JSON.stringify({ type: file.type.split('/')[1] })
  })
  const upload = (await response.json()) as { url: string; fileName: string }
  await uploadToS3(upload.url, file)
  return upload.fileName
}

type FormValues = { title: string; content?: string; image?: FileList }

export const SolutionModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const t = useTranslations()
  const router = useRouter()
  const methods = useForm<FormValues>()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      const image = data.image?.[0] ? await uploadFile(data.image[0]) : undefined
      await createSolution({ title: data.title, content: data.content, image } as CreateSolutionDTO)
      onClose()
      reset()
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <>
      <Button onClick={onOpen}>{t('kwc.newSolution')}</Button>
      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>{t('kwc.newSolution')}</ModalHeader>
            <ModalCloseButton onClick={() => reset()} />
            <ModalBody pb={6}>
              <FormProvider {...methods}>
                <FormControl isRequired isInvalid={!!errors.title}>
                  <FormLabel>{t('kwc.solutionTitle')}</FormLabel>
                  <Input
                    autoFocus
                    {...register('title', {
                      required: t('kwc.titleRequired'),
                      maxLength: { value: 200, message: `${t('kwc.tooLong')} ${getStatusString(watch('title'), 200)}` }
                    })}
                    placeholder="1. hét"
                  />
                  {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
                </FormControl>
                <FormControl mt={3} isInvalid={!!errors.content}>
                  <FormLabel>{t('kwc.content')}</FormLabel>
                  <Textarea
                    rows={8}
                    resize="vertical"
                    {...register('content', { maxLength: { value: 20000, message: t('kwc.tooLong') } })}
                    placeholder="Szókereső: alma, barack, citrom"
                  />
                  {errors.content && <FormErrorMessage>{errors.content.message}</FormErrorMessage>}
                </FormControl>
                <FileUpload
                  fieldTitle={t('kwc.image')}
                  fieldName="image"
                  buttonIcon={<FaFile />}
                  accept=".jpg,.jpeg,.png,.webp"
                  uploadButtonText={t('kwc.upload')}
                  maxFileSizeMB={10}
                />
              </FormProvider>
            </ModalBody>
            <ModalFooter>
              <Button
                mr={3}
                onClick={() => {
                  onClose()
                  reset()
                }}
              >
                {t('common.cancel')}
              </Button>
              <Button colorScheme="blue" type="submit">
                {t('common.save')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
