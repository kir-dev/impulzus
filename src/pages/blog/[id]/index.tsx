import { BackButton } from '@/components/common/BackButton'
import { ConfirmDialogButton } from '@/components/common/ConfirmDialogButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import Markdown from '@/components/common/editor/Markdown'
import prisma from '@/lib/prisma'
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

  return {
    props: { post: JSON.parse(JSON.stringify(post)) }
  }
}

type Props = {
  post: PostEntity
}

export default function Blog({ post }: Props) {
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
    </>
  )
}
