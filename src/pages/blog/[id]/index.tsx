import { CommentList } from '@/components/comment/CommentList'
import { NewComment } from '@/components/comment/NewComment'
import { BackButton } from '@/components/common/BackButton'
import { ConfirmDialogButton } from '@/components/common/ConfirmDialogButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import Markdown from '@/components/common/editor/Markdown'
import prisma from '@/lib/prisma'
import { CommentEntity } from '@/pages/api/comments/dto/CommentEntity.dto'
import { UserEntity } from '@/pages/api/users/dto/UserEntity.dto'
import { PATHS } from '@/util/paths'
import { Button, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { PostEntity } from '../../api/posts/dto/PostEntity.dto'

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
  console.log(comments)
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
      <Flex justify="space-between">
        <BackButton />
        <Flex>
          <Link href={PATHS.BLOG + `/${post.id}/edit`}>
            <Button mr={2} mb={2}>
              Szerkesztés
            </Button>
          </Link>
          <ConfirmDialogButton
            bodyText="Biztosan törlöd a posztot?"
            confirmAction={() => deleteData(post.id.toString())}
            headerText="Poszt törlése"
            confirmButtonText="Törlés"
          />
        </Flex>
      </Flex>

      <Markdown markdown={post.content} />
      <NewComment postId={post.id} />
      <CommentList comments={comments} />
    </>
  )
}
