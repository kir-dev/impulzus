import { CreateNewsPaperDTO, NewspaperEntity } from '@/models/NewspaperEntity'
import { uploadToS3 } from '@/util/files/upload'
import { createNewspaper, editNewspaper } from '@/util/newspapers/actions'
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaFile, FaPencilAlt } from 'react-icons/fa'
import { getStatusString } from '../common/editor/editorUtils'
import { FileUpload } from './FileUpload'

export type Props = {
  newspaper?: NewspaperEntity
}

export const NewspaperModalButton = ({ newspaper }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const t = useTranslations()
  const router = useRouter()
  const methods = useForm<{
    files?: FileList
    title?: string
    grade?: number
    coverImage?: string
    contents: string | undefined
    pdf?: string
    isLatest: boolean
  }>()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = methods
  useEffect(() => {
    if (newspaper) {
      reset({
        title: newspaper.title,
        grade: newspaper.grade,
        coverImage: newspaper.coverImage,
        contents: newspaper.contents?.toString(),
        pdf: newspaper.pdf,
        isLatest: newspaper.isLatest ?? false
      })
    }
  }, [newspaper, reset])

  const onSubmit = handleSubmit(async (data) => {
    const file = data.files?.[0]

    const formData: Partial<CreateNewsPaperDTO> = {
      title: data.title,
      grade: Number(data.grade),
      coverImage: data.coverImage,
      contents: data.contents?.split(','),
      isLatest: data.isLatest ?? false
    }
    let fileName: string | undefined = undefined
    try {
      if (file) {
        const res = await fetch('/api/get-upload-url', {
          method: 'GET'
        })
        const response: { url: string; fileName: string } = await res.json()
        await uploadToS3(response.url, file)
        fileName = response.fileName
      }
      if (newspaper?.id) {
        await editNewspaper(newspaper.id, formData, fileName)
      } else {
        if (formData.title && formData.grade && formData.coverImage && fileName) {
          await createNewspaper(formData as CreateNewsPaperDTO, fileName)
        }
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
      {newspaper ? (
        <IconButton colorScheme="yellow" aria-label="edit" onClick={() => onOpen()}>
          <FaPencilAlt />
        </IconButton>
      ) : (
        <Button width="min-content" onClick={() => onOpen()}>
          {t('archive.newPaper')}
        </Button>
      )}

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>{newspaper ? newspaper.title + ' ' + t('common.editOf') : t('archive.newPaper')}</ModalHeader>
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
                  <Input
                    type="text"
                    {...register('contents', {
                      maxLength: {
                        value: 400,
                        message: t('archive.contentTooLong') + ' ' + getStatusString(watch('contents'), 200)
                      }
                    })}
                    placeholder="Tartalom, tartalom2..."
                  />
                  {errors.contents && <FormErrorMessage>{errors.contents.message?.toString()}</FormErrorMessage>}
                </FormControl>

                <FormControl mt={2} isInvalid={!!errors.coverImage}>
                  <FormLabel>{t('archive.coverUrl')}</FormLabel>
                  <Input
                    type="text"
                    {...register('coverImage', {
                      pattern: {
                        value:
                          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                        message: t('archive.badCoverUrl')
                      },
                      maxLength: {
                        value: 200,
                        message: t('archive.coverUrlTooLong') + ' ' + getStatusString(watch('coverImage') ?? '', 200)
                      }
                    })}
                    placeholder="https://image"
                  />
                  {errors.coverImage && <FormErrorMessage>{errors.coverImage.message?.toString()}</FormErrorMessage>}
                </FormControl>

                <FileUpload
                  fieldTitle="PDF"
                  oldFileName={newspaper?.pdf}
                  required={!newspaper?.pdf}
                  fieldName="files"
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
