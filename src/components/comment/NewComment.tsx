import { Button, Flex, Text, Textarea } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { useState } from 'react'

type Props = {
  postId: number
}

export const NewComment = ({ postId }: Props) => {
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
      Router.reload()
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
            Jelenkezz be, hogy tudjál kommentelni!
          </Text>
        )}
        <Button isDisabled={value === '' || !isAuthenticated} onClick={() => submitData()}>
          Új komment
        </Button>
      </Flex>
    </>
  )
}
