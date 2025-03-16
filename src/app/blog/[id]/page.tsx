import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import DeletePostButton from '@/components/blog/DeletePostButton'
import { CommentList } from '@/components/comment/CommentList'
import { NewComment } from '@/components/comment/NewComment'
import { BackButton } from '@/components/common/BackButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import Markdown from '@/components/common/editor/Markdown'
import prisma from '@/lib/prisma'
import { PATHS } from '@/util/paths'
import { Box, Button, Flex } from '@chakra-ui/react'
import { getServerSession } from 'next-auth/next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Blog({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id)
    }
  })
  if (!post) {
    redirect('/blog')
  }
  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id
    },
    include: {
      user: true
    }
  })
  if (!post) {
    redirect('/blog')
  }
  const session = await getServerSession(authOptions)
  const t = await getTranslations()
  const isAdmin = session?.user?.isAdmin
  const isCreater = session?.user?.id === post.userId

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
          <DeletePostButton postId={post.id.toString()} />
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
