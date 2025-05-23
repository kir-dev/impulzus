'use client'
import { UserEntity } from '@/models/UserEntity'
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { Comment } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { ConfirmDialogButton } from '../common/ConfirmDialogButton'

type Props = {
  comments: (Comment & { user: UserEntity })[]
  deleteComment: (id: number) => void
}

export const CommentList = ({ comments, deleteComment }: Props) => {
  const t = useTranslations()
  const { data } = useSession()
  const isAdmin = data?.user?.isAdmin

  const bgColor = useColorModeValue('gray.50', 'gray.900')

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
              confirmAction={() => deleteComment(c.id)}
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
