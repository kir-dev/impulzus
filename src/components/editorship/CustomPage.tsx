'use client'
import { Locale } from '@/models/GenericTypes'
import { PATHS } from '@/util/paths'
import { editText } from '@/util/texts/actions'
import { Button, Flex, FormControl, IconButton, Text } from '@chakra-ui/react'
import { Texts } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaPencilAlt } from 'react-icons/fa'
import { BackButton } from '../common/BackButton'
import Markdown from '../common/editor/Markdown'
import { MarkdownEditor } from '../common/editor/MarkdownEditor'

export default function CustomPage({ text, isAdmin, locale }: { text: Texts; isAdmin: boolean; locale: Locale }) {
  const [isEditing, setIsEditing] = useState(false)
  const t = useTranslations()
  const textContent = locale === 'hu' ? text.contentHu || '' : text.contentEn || ''
  const form = useForm<{ content: string }>({
    defaultValues: {
      content: textContent
    }
  })
  const { handleSubmit } = form
  const onSubmit = handleSubmit((data) => {
    editText(data.content, locale, text.id)
    setIsEditing(false)
  })
  if (isEditing) {
    return (
      <>
        <FormProvider {...form}>
          <FormControl isRequired>
            <MarkdownEditor
              formDetails={{
                id: 'content',
                minChar: 5,
                maxChar: 20000 //MAX_DESCRIPTION_LENGTH
              }}
            />
          </FormControl>
        </FormProvider>
        <Flex justify="space-between">
          <BackButton link={PATHS.EDITORSHIP} />
          <Button onClick={onSubmit}>{t('common.save')}</Button>
        </Flex>
      </>
    )
  }
  return (
    <div style={{ position: 'relative' }}>
      {isAdmin && (
        <IconButton colorScheme="yellow" aria-label="edit" onClick={() => setIsEditing(true)} position={'absolute'} top={0} right={0}>
          <FaPencilAlt />
        </IconButton>
      )}
      <Text mb={4} size="md" fontStyle="italic">
        {t('common.updated')}: {text.updatedAt.toLocaleDateString('hu-HU')}
      </Text>
      <Markdown markdown={textContent} />
    </div>
  )
}
