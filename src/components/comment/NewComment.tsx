import { Button, Flex, Textarea } from '@chakra-ui/react'
import Router from 'next/router'
import { useState } from 'react'

type Props = {
  postId: number
}

export const NewComment = ({ postId }: Props) => {
  const [value, setValue] = useState<string>('')

  const submitData = async () => {
    try {
      const body = { content: value, postId, userId: 'clhxrc2lo0000i0o8bdkrdyyg' }
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
      <Textarea mt={8} placeholder="Oszdd meg a véleményedet!" value={value} onChange={(e) => setValue(e.target.value)} />
      <Flex mt={4} justify="flex-end">
        <Button isDisabled={value === ''} onClick={() => submitData()}>
          Új komment
        </Button>
      </Flex>
    </>
  )
}
