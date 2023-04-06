import { PageHeading } from '@/components/common/PageHeading'
import prisma from '@/lib/prisma'
import { Flex, Image, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
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
  console.log(newspapers)
  return (
    <>
      <PageHeading text="Archívum" />
      <Wrap mb={5} justify="center">
        {newspapers.map((n) => (
          <WrapItem key={n.id} border="2px" borderRadius="md">
            <Link href={`/archive/${n.id}`}>
              <Flex align="center">
                <Image
                  src="https://bit.ly/dan-abramov"
                  h="15rem"
                  //fallbackSrc={useColorModeValue('/img/kirdev.svg', '/img/kirdev-white-alt.svg')}
                />
                <VStack p={3} align="flex-start">
                  <Text fontSize="2xl">{n.title}</Text>
                  <Text>Tartalomjegyzék:</Text>
                  {n.contents.map((c) => (
                    <Text key={c}>{c}</Text>
                  ))}
                </VStack>
              </Flex>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}
