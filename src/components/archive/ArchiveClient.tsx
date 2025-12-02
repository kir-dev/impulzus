'use client'
import { NewspaperModalButton } from '@/components/archive/NewspaperModalButton'
import { ConfirmDialogButton } from '@/components/common/ConfirmDialogButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { NewspaperEntity } from '@/models/NewspaperEntity'
import {
  Box,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  VStack
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export default function ArchiveClient({
  newspapers,
  isAdmin,
  deleteData
}: {
  newspapers: NewspaperEntity[]
  isAdmin: boolean
  deleteData: (id: number) => void
}) {
  const latestGrade = Math.max(...newspapers.map((n) => n.grade))
  const [grade, setGrade] = useState<number>(latestGrade)
  const [filteredNewspapers, setFilteredNewspapers] = useState<NewspaperEntity[]>(newspapers)
  const t = useTranslations()
  useEffect(() => {
    setFilteredNewspapers(newspapers.filter((n) => n.grade === grade))
  }, [grade, newspapers])

  return (
    <>
      <Title text={t('archive.title')} />
      <PageHeading text={t('archive.title')} />
      <Stack justify="space-between" direction={['column', 'row']} alignItems="flex-end">
        <HStack>
          <Text>{t('archive.grade')}</Text>
          <IconButton aria-label="next grade" onClick={() => grade > 1 && setGrade(grade - 1)}>
            <FaArrowLeft />
          </IconButton>
          <InputGroup width="5rem">
            <Input value={grade} type="number" min={1} max={latestGrade} onChange={(e) => setGrade(Number(e.target.value))} />
          </InputGroup>
          <IconButton aria-label="prev grade" onClick={() => grade < latestGrade && setGrade(grade + 1)}>
            <FaArrowRight />
          </IconButton>
        </HStack>
        {isAdmin && <NewspaperModalButton />}
      </Stack>
      {filteredNewspapers.length < 1 ? (
        <Box textAlign="center">
          <Text mt={5}>{t('archive.paperCantbeFound')}</Text>
        </Box>
      ) : (
        <SimpleGrid my={5} columns={{ base: 1, '2xl': 2 }} spacing={10}>
          {filteredNewspapers.map((n) => (
            <GridItem key={n.id} borderWidth={1} borderRadius={5} p={2}>
              <Stack justify="space-between" direction={['column', 'row']} alignItems={['center', 'flex-start']}>
                <Link style={{ width: '100%' }} href={n.pdf} target="_blank" rel="noopener noreferrer">
                  <Stack minWidth="100%" align={{ base: 'center', md: 'flex-start' }} direction={{ base: 'column', md: 'row' }}>
                    <Image
                      src={!n.coverImage || n.coverImage === '' ? '/img/impulzus_logo_light.png' : n.coverImage}
                      height={100}
                      width={200}
                      alt="Borítókép"
                    />
                    <VStack p={3} pt={0} align="flex-start" alignSelf="flex-start">
                      <Text fontSize="2xl">{n.title}</Text>
                      {n.contents.length > 0 && n.contents[0] != '' && (
                        <>
                          <Text>{t('archive.contents')}</Text>
                          <UnorderedList>
                            {n.contents.map((c) => (
                              <ListItem ml={5} key={c}>
                                {c}
                              </ListItem>
                            ))}
                          </UnorderedList>
                        </>
                      )}
                    </VStack>
                  </Stack>
                </Link>
                {isAdmin && (
                  <Stack justifySelf="flex-start" direction={['row', 'column']}>
                    <ConfirmDialogButton
                      bodyText={t('archive.deletePaperQuestion')}
                      confirmAction={() => deleteData(n.id)}
                      headerText={t('archive.deletePaper')}
                      confirmButtonText={t('common.delete')}
                      refuseButtonText={t('common.cancel')}
                    />
                  </Stack>
                )}
              </Stack>
            </GridItem>
          ))}
        </SimpleGrid>
      )}
    </>
  )
}
