import { CommentList } from '@/components/comment/CommentList'
import { NewComment } from '@/components/comment/NewComment'
import { BackButton } from '@/components/common/BackButton'
import { ConfirmDialogButton } from '@/components/common/ConfirmDialogButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import Markdown from '@/components/common/editor/Markdown'
import prisma from '@/lib/prisma'
import { CommentEntity } from '@/models/CommentEntity'
import { UserEntity } from '@/models/UserEntity'
import { PATHS } from '@/util/paths'
import { Box, Button, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import Router from 'next/router'
import { PostEntity } from '../../../models/PostEntity'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id)
    }
  })

  if (!post) {
    return {
      notFound: true
    }
  }

  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id
    },
    include: {
      user: true
    }
  })

  return {
    props: { post: JSON.parse(JSON.stringify(post)), comments }
  }
}

type Props = {
  post: PostEntity
  comments: (CommentEntity & { user: UserEntity })[]
}

export default function Blog({ post, comments }: Props) {
  const { data } = useSession()
  const { t } = useTranslation('common')
  const isAdmin = data?.user?.isAdmin
  const isCreater = data?.user?.id === post.userId

  const deleteData = async (id: string) => {
    try {
      await fetch('/api/posts/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      Router.replace('/blog')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Title text={post.title} />
      <PageHeading text={post.title} />
      {(isAdmin || isCreater) && (
        <Flex justify="flex-end">
          <Link href={PATHS.BLOG + `/${post.id}/edit`}>
            <Button mr={2} mb={2}>
              {t('common.edit')}
            </Button>
          </Link>
          <ConfirmDialogButton
            bodyText="Biztosan törlöd a posztot?"
            confirmAction={() => deleteData(post.id.toString())}
            headerText="Poszt törlése"
            confirmButtonText="Törlés"
          />
        </Flex>
      )}

      <Markdown markdown={post.content} />
      <NewComment postId={post.id} />
      <CommentList comments={comments} />
      <Box mt={4}>
        <BackButton link={PATHS.BLOG} />
      </Box>
    </>
  )
}
