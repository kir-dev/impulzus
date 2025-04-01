import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import Markdown from './Markdown'
import { getStatusString } from './editorUtils'

type Props = {
  formDetails: {
    id: string
    minChar?: number
    maxChar: number
  }
  defaultValue?: string
  textAreaHeight?: string | number
  previewHeight?: string | number
}

export const MarkdownEditor = ({ textAreaHeight = '22rem', previewHeight = '26rem', defaultValue, formDetails }: Props) => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext()
  const t = useTranslations()

  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>{t('common.edit')}</Tab>
        <Tab>{t('blog.preview')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FormControl isInvalid={!!errors[formDetails.id]}>
            <FormLabel htmlFor={formDetails.id}>
              <Link href="https://www.markdownguide.org/cheat-sheet/" isExternal>
                {t('blog.markdownGuide')}
              </Link>
            </FormLabel>
            <Textarea
              id={formDetails.id}
              placeholder={t('blog.markdownPlaceholder')}
              height={textAreaHeight}
              defaultValue={defaultValue}
              {...register(formDetails.id, {
                minLength: formDetails.minChar ? { value: formDetails.minChar, message: t('blog.markdownRequired') } : undefined,
                maxLength: { value: formDetails.maxChar, message: t('blog.markdownTooLong') }
              })}
              isInvalid={!!errors[formDetails.id]}
            />
            <Flex justifyContent="flex-end">
              {errors[formDetails.id] ? (
                <FormErrorMessage>
                  {errors[formDetails.id]?.message?.toString()} {getStatusString(watch(formDetails.id), formDetails.maxChar)}
                </FormErrorMessage>
              ) : (
                <FormHelperText>{getStatusString(watch(formDetails.id), formDetails.maxChar)}</FormHelperText>
              )}
            </Flex>
          </FormControl>
        </TabPanel>
        <TabPanel>
          <Box maxHeight={previewHeight} overflowY="scroll">
            <Markdown markdown={watch(formDetails.id)} />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
