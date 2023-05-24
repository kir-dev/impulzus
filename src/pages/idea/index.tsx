import { ConfirmDialogButton } from '@/components/common/ConfirmDialogButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { IdeaModalButton } from '@/components/idea/IdeaModalButton'
import prisma from '@/lib/prisma'
import { Flex, HStack, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { FaRegLightbulb } from 'react-icons/fa'
import { IdeaEntity } from '../api/ideas/dto/IdeaEntity.dto'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const ideas = await prisma.idea.findMany()

  return {
    props: { ideas }
  }
}

type Props = {
  ideas: IdeaEntity[]
}

export default function Idea({ ideas }: Props) {
  const { data } = useSession()
  const isAdmin = data?.user?.isAdmin

  const deleteData = async (id: number) => {
    try {
      await fetch('/api/ideas/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      Router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Title text="Ötletdoboz" />
      <PageHeading text="Ötletdoboz" />
      <Flex justify="flex-end">
        <IdeaModalButton />
      </Flex>
      {ideas.map((idea) => (
        <HStack m={4} p={3} key={idea.id} borderWidth={1} borderRadius={5} justify="space-between">
          <HStack spacing={3}>
            <FaRegLightbulb size={30} />
            <Text>{idea.description}</Text>
          </HStack>
          {isAdmin && (
            <ConfirmDialogButton
              bodyText="Biztosan törlöd az ötletet?"
              confirmAction={() => deleteData(idea.id)}
              headerText="Ötlet törlése"
              confirmButtonText="Törlés"
            />
          )}
        </HStack>
      ))}
    </>
  )
}
