import { CreateNewsPaperDTO } from '@/models/NewspaperEntity'
import { uploadToS3 } from '@/util/files/upload'
import { createNewspaper } from '@/util/newspapers/actions'
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { FaFile } from 'react-icons/fa'
import { getStatusString } from '../common/editor/editorUtils'
import { FileUpload } from './FileUpload'

async function uploadFile(file: File | undefined): Promise<string> {
  if (file) {
    const res = await fetch('/api/get-upload-url', {
      method: 'POST',
      body: JSON.stringify({ type: file.type.split('/')[1] })
    })
    const response: { url: string; fileName: string } = await res.json()
    await uploadToS3(response.url, file)
    return response.fileName
  }
  throw new Error('No file provided for upload')
}

export const NewspaperModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const t = useTranslations()
  const router = useRouter()
  const methods = useForm<{
    pdf?: FileList
    coverImage?: FileList
    title?: string
    grade?: number
    contents: string | undefined
    isLatest: boolean
  }>()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    const pdf = data.pdf?.[0]
    const coverImage = data.coverImage?.[0]

    const formData: Partial<CreateNewsPaperDTO> = {
      title: data.title,
      grade: Number(data.grade),
      contents: data.contents?.split('\n'),
      isLatest: data.isLatest ?? false
    }
    try {
      formData.coverImage = await uploadFile(coverImage)
      formData.pdf = await uploadFile(pdf)
      if (formData.title && formData.grade && formData.coverImage && formData.pdf) {
        await createNewspaper(formData as CreateNewsPaperDTO)
      }
    } catch (e) {
      console.error(e)
    }
    onClose()
    reset()
    router.refresh()
  })

  return (
    <>
      <Button width="min-content" onClick={() => onOpen()}>
        {t('archive.newPaper')}
      </Button>

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>{t('archive.newPaper')}</ModalHeader>
            <ModalCloseButton onClick={() => reset()} />
            <ModalBody pb={6}>
              <FormProvider {...methods}>
                <FormControl isInvalid={!!errors.title} isRequired>
                  <FormLabel>{t('archive.paperTitle')}</FormLabel>
                  <Input
                    autoFocus
                    type="text"
                    {...register('title', {
                      required: { value: true, message: t('archive.titleCantBeEmpty') },
                      maxLength: {
                        value: 200,
                        message: t('archive.titleTooLong') + ' ' + getStatusString(watch('title'), 200)
                      }
                    })}
                    placeholder="XLIX. évfolyam, 3. szám"
                  />
                  {errors.title && <FormErrorMessage>{errors.title.message?.toString()}</FormErrorMessage>}
                </FormControl>

                <FormControl mt={2} isInvalid={!!errors.grade} isRequired>
                  <FormLabel>{t('archive.grade')}</FormLabel>
                  <Input
                    type="number"
                    {...register('grade', {
                      required: { value: true, message: t('archive.gradeCantBeEmpty') },
                      min: { value: 1, message: t('archive.gradeAtLeast') },
                      maxLength: {
                        value: 200,
                        message: t('archive.gradeTooLong') + ' ' + getStatusString(watch('grade')?.toString(), 200)
                      }
                    })}
                    placeholder="50"
                  />
                  {errors.grade && <FormErrorMessage>{errors.grade.message?.toString()}</FormErrorMessage>}
                </FormControl>

                <FormControl mt={2} isInvalid={!!errors.contents}>
                  <FormLabel>{t('archive.content')}</FormLabel>
                  <Textarea
                    whiteSpace={'pre-wrap'}
                    resize="none"
                    rows={4}
                    {...register('contents', {
                      maxLength: {
                        value: 400,
                        message: t('archive.contentTooLong') + ' ' + getStatusString(watch('contents'), 200)
                      }
                    })}
                    placeholder="A tartalomjegyzék"
                  />
                  {errors.contents && <FormErrorMessage>{errors.contents.message?.toString()}</FormErrorMessage>}
                </FormControl>

                <FileUpload
                  fieldTitle={t('archive.coverImage')}
                  required={true}
                  fieldName="coverImage"
                  buttonIcon={<FaFile />}
                  accept={'.jpg,.jpeg,.png,.webp'}
                  uploadButtonText={t('archive.upload')}
                />
                <FileUpload
                  fieldTitle="PDF"
                  required={true}
                  fieldName="pdf"
                  buttonIcon={<FaFile />}
                  accept={'.pdf'}
                  uploadButtonText={t('archive.upload')}
                />
                <FormControl isInvalid={!!errors.isLatest}>
                  <HStack mt={4}>
                    <Checkbox {...register('isLatest')} isChecked={watch('isLatest')}>
                      <Text fontWeight="semibold">{t('archive.isLatest')}</Text>
                    </Checkbox>
                  </HStack>
                </FormControl>
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
