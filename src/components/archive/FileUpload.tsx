import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import { ReactElement, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'

type Props = {
  fieldName: string
  fieldTitle?: string
  uploadButtonText?: string
  helper?: JSX.Element
  accept?: string
  required?: boolean
  maxFileSizeMB?: number
  buttonIcon: ReactElement
  oldFileName?: string | null
}

export const FileUpload = ({
  fieldName,
  fieldTitle,
  uploadButtonText = 'Feltöltés',
  helper,
  accept = '.pdf',
  required = false,
  maxFileSizeMB = 10,
  buttonIcon,
  oldFileName
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext()
  const [oldFile, setOldFile] = useState<string>(oldFileName ?? '')
  const [isReuired, setIsRequired] = useState(required)
  const { t } = useTranslation('common')

  const validateFiles = (value: FileList | undefined) => {
    if (!isReuired) {
      return true
    }
    if (!value) {
      return t('archive.fileRequired')
    }
    if (isReuired && value.length < 1) {
      return t('archive.fileRequired')
    }
    if (value.length > 1) {
      return t('archive.maxOneFile')
    }
    const fsMb = value[0].size / (1024 * 1024)
    if (fsMb > maxFileSizeMB) {
      return `${t('archive.maxAllowedSize')}: ${maxFileSizeMB} MB`
    }
    return true
  }

  const registerProps = { ...register(fieldName, { validate: validateFiles }) }
  const onUploadPressed = () => {
    setIsRequired(true)
    setOldFile('')
    inputRef.current?.click()
  }
  const onRemovePressed = () => {
    setIsRequired(true)
    setOldFile('')
    setValue(fieldName, undefined)
  }

  return (
    <FormControl mt={2} isRequired={isReuired} isInvalid={!!errors[fieldName]}>
      {fieldTitle && <FormLabel htmlFor={fieldName}>{fieldTitle}</FormLabel>}
      <InputGroup>
        <input
          type="file"
          hidden
          accept={accept}
          {...registerProps}
          ref={(e) => {
            registerProps.ref(e)
            inputRef.current = e
          }}
        />
        <InputLeftAddon as={Button} leftIcon={buttonIcon} onClick={onUploadPressed}>
          {uploadButtonText}
        </InputLeftAddon>
        <Input
          value={oldFile || watch(fieldName)?.item(0)?.name || t('archive.noFileSelected')}
          readOnly
          onClick={onUploadPressed}
          cursor="pointer"
        />
        <InputRightAddon as={IconButton} aria-label="Választott fájl visszavonása" icon={<FaTimes />} onClick={onRemovePressed} />
      </InputGroup>
      {errors?.[fieldName] ? (
        <FormErrorMessage>{errors[fieldName]?.message?.toString()}</FormErrorMessage>
      ) : (
        helper && <FormHelperText>{helper}</FormHelperText>
      )}
    </FormControl>
  )
}
