'use client'
import { editImpressum } from '@/util/impressum/actions'
import { PATHS } from '@/util/paths'
import { Button, Flex, FormControl, IconButton, Text } from '@chakra-ui/react'
import { Impressum as ImpressumEntity } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaPencilAlt } from 'react-icons/fa'
import { BackButton } from '../common/BackButton'
import Markdown from '../common/editor/Markdown'
import { MarkdownEditor } from '../common/editor/MarkdownEditor'

export default function Impressum({ impressum, isAdmin }: { impressum: ImpressumEntity; isAdmin: boolean }) {
  const [isEditing, setIsEditing] = useState(false)
  const t = useTranslations()
  const form = useForm<{ content: string }>({
    defaultValues: {
      content: impressum.details
    }
  })
  const { handleSubmit } = form
  const onSubmit = handleSubmit((data) => {
    editImpressum(data.content)
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
          <BackButton link={PATHS.EDITORSHIP} onClick={() => setIsEditing(false)} />
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
        {t('common.updated')}: {impressum.updatedAt.toLocaleDateString('hu-HU')}
      </Text>
      <Markdown markdown={impressum.details} />
    </div>
  )
}
