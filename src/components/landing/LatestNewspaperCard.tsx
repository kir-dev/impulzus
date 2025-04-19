import { Badge, Box, Flex, Heading, Image, Link, List, ListItem, Text, VStack } from '@chakra-ui/react'
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
    <Flex borderWidth={1} borderRadius={5} p={2} gap={5} alignItems="center" placeItems={'start'} mt={5}>
      <Box flex="1 1 250px" maxW="300px">
        <Image src={newspaper.coverImage} alt={`${newspaper.title} cover`} borderRadius="lg" objectFit="cover" width="100%" />
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
          <Badge colorScheme="blue">{`${t('archive.grade')} : ${newspaper.grade} `}</Badge>
          <Heading size="lg">{newspaper.title} </Heading>

          <Text fontSize="md">{t('archive.contents')}</Text>
          <List spacing={1}>
            {newspaper.contents.map((item, i) => (
              <ListItem
                key={i}
                pl={2}
                position="relative"
                _before={{
                  content: '"•"',
                  position: 'absolute',
                  left: 0,
                  color: 'blue.400'
                }}
              >
                {item}
              </ListItem>
            ))}
          </List>
        </VStack>

        <VStack align="start" spacing={2} mt="auto">
          <Link href={newspaper.pdf} color="blue.300" isExternal fontWeight="bold">
            {t('archive.openPdf')}
          </Link>

          {newspaper.isLatest && (
            <Badge colorScheme="green" mt={2}>
              {t('archive.latestPaper')}
            </Badge>
          )}
        </VStack>
      </Flex>
    </Flex>
  )
}
