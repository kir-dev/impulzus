'use client'
import { ConfirmDialogButton } from '@/components/common/ConfirmDialogButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { IdeaModalButton } from '@/components/idea/IdeaModalButton'
import { Flex, HStack, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { FaRegLightbulb } from 'react-icons/fa'
import { IdeaEntity } from '../../models/IdeaEntity'

export default function IdeaStack({ ideas, deleteData }: { ideas: IdeaEntity[]; deleteData: (id: number) => void }) {
  const session = useSession()
  const t = useTranslations()
  console.log(session)
  const { data } = session
  const isAdmin = data?.user?.isAdmin
  return (
    <>
      <Title text={t('idea.title')} />
      <PageHeading text={t('idea.title')} />
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
              bodyText={t('idea.deleteIdeaQuestion')}
              confirmAction={() => deleteData(idea.id)}
              headerText={t('idea.deleteIdea')}
              confirmButtonText={t('common.delete')}
              refuseButtonText={t('common.cancel')}
            />
          )}
        </HStack>
      ))}
    </>
  )
}
