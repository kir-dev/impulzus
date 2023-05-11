import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { MarkdownEditor } from '@/components/common/editor/MarkdownEditor'
import { getStatusString } from '@/components/common/editor/editorUtils'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react'
import Router from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'

export default function Blog() {
  const submitData = async (body: any) => {
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      Router.replace('/blog')
    } catch (error) {
      console.error(error)
    }
  }

  const form = useForm({
    /*defaultValues:
       {
          title: ,
        }
      */
    mode: 'all'
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors, isValid, isSubmitted }
  } = form

  const onSubmit = handleSubmit((data) => {
    const formData = {
      title: data.title,
      previewContent: data.previewContent,
      content: data.content,
      userId: 'clh7uh41t0006i0jca5y1ymt6' //TODO
    }
    submitData(formData)
  })

  return (
    <>
      <Title text="Új Poszt" />
      <PageHeading text="Új Poszt" />
      <VStack alignItems="flex-start">
        <FormControl isInvalid={!!errors.title} isRequired>
          <FormLabel>Poszt címe</FormLabel>
          <Input
            type="text"
            {...register('title', {
              required: { value: true, message: 'A cím nem lehet üres!' },
              maxLength: {
                value: 200,
                message: 'Név túl hosszú! ' + getStatusString(watch('title'), 200)
              }
            })}
            placeholder="Post cím"
          />
          {errors.title && <FormErrorMessage>{errors.title.message?.toString()}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.previewContent} isRequired>
          <FormLabel>Rövid leírása</FormLabel>
          <Input
            type="text"
            {...register('previewContent', {
              required: { value: true, message: 'A leírás nem lehet üres!' },
              maxLength: {
                value: 200,
                message: 'Leírás túl hosszú! ' + getStatusString(watch('previewContent'), 200)
              }
            })}
            placeholder="Poszt a dínókról"
          />
          {errors.previewContent && <FormErrorMessage>{errors.previewContent.message?.toString()}</FormErrorMessage>}
        </FormControl>

        <FormProvider {...form}>
          <FormControl isRequired>
            <FormLabel>Leírás</FormLabel>
            <MarkdownEditor
              formDetails={{
                id: 'content',
                promptText: '',
                maxChar: 2000 //MAX_DESCRIPTION_LENGTH
              }}
              textAreaHeight="30rem"
              previewHeight="30rem"
            />
          </FormControl>
        </FormProvider>
      </VStack>
      <Button onClick={onSubmit}>Létrehoz</Button>
    </>
  )
}
