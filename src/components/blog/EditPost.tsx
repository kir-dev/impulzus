import { PostEntity } from '@/pages/api/posts/dto/PostEntity.dto'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { BackButton } from '../common/BackButton'
import { PageHeading } from '../common/PageHeading'
import { Title } from '../common/Title'
import { MarkdownEditor } from '../common/editor/MarkdownEditor'
import { getStatusString } from '../common/editor/editorUtils'
import { POST_CATEGORIS } from './postCategories'

type Props = {
  post?: PostEntity
}

export const EditPost = ({ post }: Props) => {
  const { data } = useSession()
  const userId = data?.user?.id

  useEffect(() => {
    if (!userId) {
      Router.push('/login')
    }
  }, [])

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
      categories: post?.categories.map((t) => ({ label: t, value: t }))
    },

    mode: 'all'
  })

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = form

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const formData = {
      title: data.title,
      previewContent: data.previewContent,
      content: data.content,
      categories: data.categories?.map((c) => c.value),
      userId: userId
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
                message: 'Cím túl hosszú! ' + getStatusString(watch('title'), 200)
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
                message: 'Leírás túl hosszú! ' + getStatusString(watch('previewContent'), 1000)
              }
            })}
            placeholder="Poszt a dínókról"
          />
          {errors.previewContent && <FormErrorMessage>{errors.previewContent.message?.toString()}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.categories} isRequired>
          <FormLabel>Kategória</FormLabel>
          <Controller
            control={control}
            name="categories"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <ReactSelect
                options={POST_CATEGORIS.map((c) => ({ label: c, value: c }))}
                onChange={onChange}
                isMulti={true}
                onBlur={onBlur}
                value={value}
                name={name}
                ref={ref}
              />
            )}
          />
        </FormControl>

        <FormProvider {...form}>
          <FormControl isRequired>
            <FormLabel>Leírás</FormLabel>
            <MarkdownEditor
              formDetails={{
                id: 'content',
                promptText: '',
                minChar: 5,
                maxChar: 20000 //MAX_DESCRIPTION_LENGTH
              }}
              textAreaHeight="30rem"
              previewHeight="30rem"
            />
          </FormControl>
        </FormProvider>
      </VStack>
      <Flex justify="space-between">
        <BackButton />
        <Button onClick={onSubmit}>{post ? 'Mentés' : 'Létrehozás'}</Button>
      </Flex>
    </>
  )
}
