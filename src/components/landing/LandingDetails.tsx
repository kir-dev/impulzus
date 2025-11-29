'use client'
import { Locale, TextType } from '@/models/GenericTypes'
import { editText } from '@/util/texts/actions'
import {
  Button,
  FormControl,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaPencilAlt } from 'react-icons/fa'
import { useTranslations } from 'use-intl'
import { PageHeading } from '../common/PageHeading'
import Markdown from '../common/editor/Markdown'
import { MarkdownEditor } from '../common/editor/MarkdownEditor'

export default function LandingDetails({ content, isAdmin, locale }: { content: string; isAdmin: boolean; locale: Locale }) {
  const t = useTranslations()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const form = useForm({
    defaultValues: {
      content: content
    },

    mode: 'all'
  })
  useEffect(() => {
    form.reset({ content: content })
  }, [content])

  const { handleSubmit } = form
  const onSubmit = handleSubmit((data) => {
    if (data.content !== content) {
      editText(data.content, locale, TextType.WelcomeDescription)
    }
    onClose()
  })
  return (
    <>
      <GridItem position={'relative'}>
        <PageHeading text={t('title')} />
        <div style={{ position: 'relative' }}>
          {isAdmin && (
            <Button size="md" onClick={onOpen} position={'absolute'} right={5} top={0}>
              <FaPencilAlt />
            </Button>
          )}
          <Markdown markdown={content} />
        </div>
      </GridItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...form}>
              <FormControl isRequired>
                <MarkdownEditor
                  formDetails={{
                    id: 'content',
                    minChar: 5,
                    maxChar: 20000 //MAX_DESCRIPTION_LENGTH
                  }}
                  textAreaHeight="30rem"
                  previewHeight="30rem"
                />
              </FormControl>
            </FormProvider>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              {t('common.cancel')}
            </Button>
            <Button colorScheme="blue" onClick={onSubmit}>
              {t('common.save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
