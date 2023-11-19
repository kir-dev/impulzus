import { Button, Flex, Text, Textarea } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'
import { useState } from 'react'

type Props = {
  postId: number
}

export const NewComment = ({ postId }: Props) => {
  const { t } = useTranslation('common')
  const [value, setValue] = useState<string>('')
  const { data, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  const submitData = async () => {
    try {
      const body = { content: value, postId, userId: data?.user?.id }
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      Router.replace(Router.asPath)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Textarea
        isDisabled={!isAuthenticated}
        mt={8}
        placeholder="Oszdd meg a véleményedet!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Flex mt={4} justify={isAuthenticated ? 'flex-end' : 'space-between'}>
        {!isAuthenticated && (
          <Text color="red" as="b">
            {t('comments.loginToComment')}
          </Text>
        )}
        <Button isDisabled={value === '' || !isAuthenticated} onClick={() => submitData()}>
          {t('comments.newComment')}
        </Button>
      </Flex>
    </>
  )
}
