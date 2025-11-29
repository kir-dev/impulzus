import { Badge, Box, Flex, Heading, HStack, Image, Link, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'

type NewspaperEntity = {
  id: number
  title: string
  contents: string[]
  coverImage: string
  grade: number
  pdf: string
  isLatest: boolean
}

type NewspaperCardProps = {
  newspaper: NewspaperEntity
}

export const LatestNewspaperCard = ({ newspaper }: NewspaperCardProps) => {
  const t = useTranslations()
  return (
    <Flex borderWidth={1} borderRadius="lg" p={2} gap={5} alignItems="center" placeItems={'start'} mt={5}>
      <Box flex="1 1 250px" maxW="300px">
        <a href={newspaper.pdf} target="_blank" rel="noopener noreferrer">
          <Image src={newspaper.coverImage} alt={`${newspaper.title} cover`} borderRadius="lg" objectFit="cover" width="100%" />
        </a>
      </Box>

      <Flex
        p={2}
        gap={5}
        direction={'column'}
        alignItems="start"
        width="fit-content"
        justifyContent={'space-between'}
        grow={[1, 1]}
        flex="1"
      >
        <VStack align="start" spacing={2} mb="auto">
          <HStack>
            <Badge colorScheme="green">{t('archive.latestPaper')}</Badge>
            <Badge colorScheme="blue">{`${t('archive.grade')} : ${newspaper.grade} `}</Badge>
          </HStack>
          <Heading size="lg">{newspaper.title} </Heading>
          <UnorderedList margin={0}>
            {newspaper.contents.map((c) => (
              <ListItem ml={5} key={c}>
                {c}
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>

        <VStack align="start" spacing={2} mt="auto">
          <Link href={newspaper.pdf} color="blue.300" isExternal fontWeight="bold">
            {t('archive.openPdf')}
          </Link>
        </VStack>
      </Flex>
    </Flex>
  )
}
