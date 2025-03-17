'use client'
import { Button, Flex, Text, Textarea } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  createComment: (content: string) => void
}

export const NewComment = ({ createComment }: Props) => {
  const t = useTranslations()
  const router = useRouter()
  const [value, setValue] = useState<string>('')
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const onSubmit = () => {
    createComment(value)
    setValue('')
    router.refresh()
  }
  return (
    <>
      <Textarea
        isDisabled={!isAuthenticated}
        mt={8}
        placeholder={t('comments.shareYourThoughts')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Flex mt={4} justify={isAuthenticated ? 'flex-end' : 'space-between'}>
        {!isAuthenticated && (
          <Text color="red" as="b">
            {t('comments.loginToComment')}
          </Text>
        )}
        <Button isDisabled={value === '' || !isAuthenticated} onClick={onSubmit}>
          {t('comments.newComment')}
        </Button>
      </Flex>
    </>
  )
}
