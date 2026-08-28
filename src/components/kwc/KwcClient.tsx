'use client'

import { ConfirmDialogButton } from '@/components/common/ConfirmDialogButton'
import { PageHeading } from '@/components/common/PageHeading'
import { Title } from '@/components/common/Title'
import { SolutionEntity } from '@/models/SolutionEntity'
import { deleteSolution } from '@/util/solutions/actions'
import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { SolutionModalButton } from './SolutionModalButton'

export default function KwcClient({ solutions, isAdmin }: { solutions: SolutionEntity[]; isAdmin: boolean }) {
  const t = useTranslations()

  return (
    <>
      <Title text={t('kwc.title')} />
      <PageHeading text={t('kwc.title')} />
      <Stack direction={['column', 'row']} justify="flex-end" mb={5}>
        {isAdmin && <SolutionModalButton />}
      </Stack>
      {solutions.length === 0 ? (
        <Box textAlign="center">
          <Text>{t('kwc.empty')}</Text>
        </Box>
      ) : (
        <SimpleGrid maxW="1000px" mx="auto" width="100%" columns={{ base: 1, md: 2 }} spacing={6}>
          {solutions.map((solution) => (
            <Box key={solution.id} height="400px" borderWidth={1} borderRadius={5} overflow="hidden" display="flex" flexDirection="column">
              <Link href={`/kwc/${solution.id}`} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                {solution.image && (
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    width={800}
                    height={450}
                    unoptimized
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  />
                )}
                <Box p={4} overflow="hidden">
                  <Text fontSize="xl" fontWeight="semibold">
                    {solution.title}
                  </Text>
                  <Text mt={2} noOfLines={4} whiteSpace="pre-wrap">
                    {solution.content}
                  </Text>
                </Box>
              </Link>
              {isAdmin && (
                <Stack p={4} pt={0} align="flex-end">
                  <ConfirmDialogButton
                    bodyText={t('kwc.deleteQuestion')}
                    confirmAction={() => deleteSolution(solution.id)}
                    headerText={t('kwc.delete')}
                    confirmButtonText={t('common.delete')}
                    refuseButtonText={t('common.cancel')}
                  />
                </Stack>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  )
}
