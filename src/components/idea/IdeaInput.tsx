'use client'
import { createIdea } from '@/util/idea/actions'
import { Button, Center, Heading, Textarea, useToast, VStack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function IdeaInput() {
  const [description, setDescriptioon] = useState<string>('')
  const toast = useToast()
  const t = useTranslations()
  const submitIdea = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    createIdea(description)
    setDescriptioon('')
    toast({
      title: t('idea.createdIdea'),
      description: t('idea.createdIdeaDescription'),
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  }
  return (
    <Center height="100vh">
      <VStack spacing={4} width="300px">
        <Heading>{t('idea.newIdea')}</Heading>
        <Textarea
          placeholder={t('idea.ideaOrSuggestion')}
          size="md"
          value={description}
          onChange={(e) => setDescriptioon(e.target.value)}
        />
        <Button colorScheme="blue" onClick={submitIdea}>
          Submit
        </Button>
      </VStack>
    </Center>
  )
}
