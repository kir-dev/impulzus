import { NewspaperModalButton } from '@/components/archive/NewspaperModalButton'
import { ConfirmDialogButton } from '@/components/common/ConfirmDialogButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import prisma from '@/lib/prisma'
import { PATHS } from '@/util/paths'
import {
  Flex,
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
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { NewspaperEntity } from '../api/newspapers/dto/NewspaperEntity.dto'

export const getStaticProps: GetStaticProps = async () => {
  const newspapers = await prisma.newspaper.findMany()

  return {
    props: { newspapers },
    revalidate: 10
  }
}

type Props = {
  newspapers: NewspaperEntity[]
}

export default function Archive({ newspapers }: Props) {
  const latestGraade = Math.max(...newspapers.map((n) => n.grade))
  const [grade, setGrade] = useState<number>(latestGraade)
  const [filteredNewspapers, setFilteredNewspapers] = useState<NewspaperEntity[]>(newspapers)

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
      Router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Title text="Archívum" />
      <PageHeading text="Archívum" />
      <HStack justify="space-between">
        <HStack>
          <Text>Évfolyam: </Text>
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
      </HStack>
      {filteredNewspapers.length < 1 ? (
        <Text mt={5}>Nem található semmi</Text>
      ) : (
        <SimpleGrid my={5} columns={{ base: 1, '2xl': 2 }} spacing={10}>
          {filteredNewspapers.map((n) => (
            <GridItem key={n.id} borderWidth={1} borderRadius={5} p={2}>
              <Flex justify="space-between">
                <Link href={`${PATHS.ARCHIVE}/${n.id}`}>
                  <Stack align={{ base: 'center', md: 'flex-start' }} direction={{ base: 'column', md: 'row' }}>
                    <Image
                      src={!n.coverImage || n.coverImage === '' ? '/img/impulzus_logo_light.png' : n.coverImage}
                      height={100}
                      width={200}
                      alt="Borítókép"
                    />

                    <VStack p={3} pt={0} align="flex-start">
                      <Text fontSize="2xl">{n.title}</Text>
                      {n.contents.length > 0 && n.contents[0] != '' && (
                        <>
                          <Text>Tartalomjegyzék:</Text>
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
                  <VStack justifySelf="flex-start">
                    <NewspaperModalButton newspaper={n} />
                    <ConfirmDialogButton
                      bodyText="Biztosan törlöd az újságot?"
                      confirmAction={() => deleteData(n.id)}
                      headerText="Újság törlése"
                      confirmButtonText="Törlés"
                    />
                  </VStack>
                )}
              </Flex>
            </GridItem>
          ))}
        </SimpleGrid>
      )}
    </>
  )
}
