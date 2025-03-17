'use client'
import { PostEntity } from '@/models/PostEntity'
import { createPost, editPost } from '@/util/blog/actions'
import { PATHS } from '@/util/paths'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
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
  const t = useTranslations()
  const userId = data?.user?.id
  const router = useRouter()
  useEffect(() => {
    if (!userId) {
      router.push('/login')
    }
  }, [userId])

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
    if (post) {
      editPost({ ...formData })
    } else {
      if (formData.title !== undefined && formData.content !== undefined && formData.previewContent !== undefined) {
        createPost({ ...formData, tag: [] })
      }
    }
  })

  return (
    <>
      <Title text={post ? `${post.title} ${t('common.editOf2')}` : t('blog.newPost')} />
      <PageHeading text={post ? `${post.title} ${t('common.editOf2')}` : t('blog.newPost')} />
      <VStack alignItems="flex-start">
        <FormControl isInvalid={!!errors.title} isRequired>
          <FormLabel>{t('blog.postTitle')}</FormLabel>
          <Input
            type="text"
            {...register('title', {
              required: { value: true, message: t('blog.titleRequired') },
              maxLength: {
                value: 200,
                message: t('blog.titleTooLong') + ' ' + getStatusString(watch('title'), 200)
              }
            })}
            placeholder={t('blog.postTitle')}
          />
          {errors.title && <FormErrorMessage>{errors.title.message?.toString()}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.previewContent} isRequired>
          <FormLabel>{t('blog.smallDescription')}</FormLabel>
          <Input
            type="text"
            {...register('previewContent', {
              required: { value: true, message: t('blog.smallDescriptionRequired') },
              maxLength: {
                value: 200,
                message: t('blog.smallDescriptionTooLong') + ' ' + getStatusString(watch('previewContent'), 1000)
              }
            })}
            placeholder={t('blog.smallDescriptionPlaceholder')}
          />
          {errors.previewContent && <FormErrorMessage>{errors.previewContent.message?.toString()}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.categories} isRequired>
          <FormLabel>{t('blog.category')}</FormLabel>
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
                instanceId={name}
              />
            )}
          />
        </FormControl>

        <FormProvider {...form}>
          <FormControl isRequired>
            <FormLabel>{t('blog.description')}</FormLabel>
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
      </VStack>
      <Flex justify="space-between">
        <BackButton link={PATHS.BLOG} />
        <Button onClick={onSubmit}>{post ? t('common.save') : t('common.create')}</Button>
      </Flex>
    </>
  )
}
