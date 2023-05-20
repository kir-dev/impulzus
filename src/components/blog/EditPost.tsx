import { PostEntity } from '@/pages/api/posts/dto/PostEntity.dto'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select, VStack } from '@chakra-ui/react'
import Router from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { PageHeading } from '../common/PageHeading'
import { Title } from '../common/Title'
import { MarkdownEditor } from '../common/editor/MarkdownEditor'
import { getStatusString } from '../common/editor/editorUtils'
import { POST_CATEGORIS } from './postCategories'

type Props = {
  post?: PostEntity
}

export const EditPost = ({ post }: Props) => {
  const submitData = async (body: any) => {
    try {
      await fetch(post ? `/api/posts/${post.id}` : '/api/posts', {
        method: post ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      Router.replace('/blog')
    } catch (error) {
      console.error(error)
    }
  }

  const form = useForm({
    defaultValues: {
      title: post?.title,
      previewContent: post?.previewContent,
      content: post?.content,
      category: post?.type
    },

    mode: 'all'
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = form

  const onSubmit = handleSubmit((data) => {
    const formData = {
      title: data.title,
      previewContent: data.previewContent,
      content: data.content,
      type: data.category,
      userId: 'clh7uh41t0006i0jca5y1ymt6' //TODO
    }
    submitData(formData)
  })
  return (
    <>
      <Title text={post ? `${post.title} szerkesztése` : 'Új poszt'} />
      <PageHeading text={post ? `${post.title} szerkesztése` : 'Új poszt'} />
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

        <FormControl isInvalid={!!errors.previewContent} isRequired>
          <FormLabel>Kategória</FormLabel>
          <Select
            placeholder="Válassz kategóriát..."
            {...register('category', {
              required: 'Válassz kategóriát!'

              //required: { value: true, message: 'Válassz kategóriát!' },
            })}
          >
            {POST_CATEGORIS.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </Select>
          {errors.category && <FormErrorMessage>{errors.category.message?.toString()}</FormErrorMessage>}
        </FormControl>

        <FormProvider {...form}>
          <FormControl isRequired>
            <FormLabel>Leírás</FormLabel>
            <MarkdownEditor
              formDetails={{
                id: 'content',
                promptText: '',
                minChar: 5,
                maxChar: 2000 //MAX_DESCRIPTION_LENGTH
              }}
              textAreaHeight="30rem"
              previewHeight="30rem"
            />
          </FormControl>
        </FormProvider>
      </VStack>
      <Button onClick={onSubmit}>{post ? 'Mentés' : 'Létrehozás'}</Button>
    </>
  )
}
