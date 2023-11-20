import { NewspaperModalButton } from '@/components/archive/NewspaperModalButton'
import { ConfirmDialogButton } from '@/components/common/ConfirmDialogButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { PATHS } from '@/util/paths'
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
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { NewspaperEntity } from '../../models/NewspaperEntity'

export const getServerSideProps: GetServerSideProps = async () => {
  const newspapers = await prisma.newspaper.findMany()

  return {
    props: { newspapers }
  }
}

type Props = {
  newspapers: NewspaperEntity[]
}

export default function Archive({ newspapers }: Props) {
  const latestGraade = Math.max(...newspapers.map((n) => n.grade))
  const [grade, setGrade] = useState<number>(latestGraade)
  const [filteredNewspapers, setFilteredNewspapers] = useState<NewspaperEntity[]>(newspapers)
  const { t } = useTranslation('common')

  const { data } = useSession()
  const isAdmin = data?.user?.isAdmin

  useEffect(() => {
    setFilteredNewspapers(newspapers.filter((n) => n.grade === grade))
  }, [grade, newspapers])

  const deleteData = async (id: number) => {
    try {
      await fetch('/api/newspapers/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      Router.replace(Router.asPath)
    } catch (error) {
      console.error(error)
    }
  }

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
            <Input value={grade} type="number" min={1} max={latestGraade} onChange={(e) => setGrade(Number(e.target.value))} />
          </InputGroup>
          <IconButton aria-label="prev grade" onClick={() => grade < latestGraade && setGrade(grade + 1)}>
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
                <Link style={{ width: '100%' }} href={`${PATHS.ARCHIVE}/${n.id}`}>
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
                    <NewspaperModalButton newspaper={n} />
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
