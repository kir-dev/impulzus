import { CommentEntity } from '@/models/CommentEntity'
import { UserEntity } from '@/models/UserEntity'
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'
import { ConfirmDialogButton } from '../common/ConfirmDialogButton'

type Props = {
  comments: (CommentEntity & { user: UserEntity })[]
}

export const CommentList = ({ comments }: Props) => {
  const { t } = useTranslation('common')
  const { data } = useSession()
  const isAdmin = data?.user?.isAdmin

  const bgColor = useColorModeValue('gray.50', 'gray.900')

  const deleteData = async (id: number) => {
    try {
      await fetch('/api/comments/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      Router.replace(Router.asPath)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {comments.map((c) => (
        <Flex justify="space-between" key={c.id} mt={4} borderWidth={1} borderRadius={5} bg={bgColor} p={2}>
          <Box mr={5}>
            <Text as="b">{c.user.name}</Text>
            <Box mt={2}>
              <Text>{c.content} </Text>
            </Box>
          </Box>
          {(isAdmin || data?.user?.id === c.userId) && (
            <ConfirmDialogButton
              bodyText={t('comments.deleteCommentQuestion')}
              confirmAction={() => deleteData(c.id)}
              headerText={t('comments.deleteComment')}
              confirmButtonText={t('common.delete')}
              refuseButtonText={t('common.cancel')}
            />
          )}
        </Flex>
      ))}
    </>
  )
}
