import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import DeletePostButton from '@/components/blog/DeletePostButton'
import { CommentList } from '@/components/comment/CommentList'
import { NewComment } from '@/components/comment/NewComment'
import { BackButton } from '@/components/common/BackButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import Markdown from '@/components/common/editor/Markdown'
import prisma from '@/lib/prisma'
import { deletePost } from '@/util/blog/actions'
import { createComment } from '@/util/comment/actions'
import { PATHS } from '@/util/paths'
import { Box, Button, Flex } from '@chakra-ui/react'
import { getServerSession } from 'next-auth/next'
import { getTranslations } from 'next-intl/server'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Blog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
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
  const deleteComment = async (id: number) => {
    'use server'
    await prisma.comment.delete({
      where: {
        id
      }
    })
    revalidatePath('/blog/' + post.id)
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
          <DeletePostButton deleteData={deletePost} postId={post.id} />
        </Flex>
      )}

      <Markdown markdown={post.content} />
      <NewComment createComment={createComment} postId={post.id} />
      <CommentList comments={comments} deleteComment={deleteComment} />
      <Box mt={4}>
        <BackButton link={PATHS.BLOG} />
      </Box>
    </>
  )
}
