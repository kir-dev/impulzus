'use client'
import { UserEntity } from '@/models/UserEntity'
import { updateUser } from '@/util/users/actions'
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaPencilAlt } from 'react-icons/fa'
import { getStatusString } from '../common/editor/editorUtils'

type Props = {
  userProp?: UserEntity
  users: UserEntity[]
}

export const EditorshipModalButton = ({ userProp, users }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const t = useTranslations()
  const router = useRouter()
  const [user, setUser] = useState<UserEntity | undefined>(userProp)
  console.log('user', user)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      titles: user?.titles?.toString(),
      picture: user?.picture ?? '',
      isMember: user?.isMember,
      isBoardMember: user?.isBoardMember,
      isAdmin: user?.isAdmin
    },
    mode: 'all'
  })

  const onSubmit = handleSubmit((data) => {
    const formData = {
      name: data.name,
      email: data.email,
      titles: data.titles?.split(','),
      picture: data.picture === '' ? undefined : data.picture,
      isBoardMember: data.isBoardMember,
      isMember: data.isMember,
      isAdmin: data.isAdmin
    }
    if (!user?.id) {
      return
    }
    updateData(user?.id, formData)
    setUser(undefined)
    reset()
  })

  const updateData = async (id: string, formData: Partial<UserEntity>) => {
    await updateUser(id, formData)
    onClose()
    router.refresh()
  }
  if (!users) return null
  const selectUser: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedUser = users.find((u) => u.id === event.target.value)
    setUser(selectedUser)
    setValue('name', selectedUser?.name)
    setValue('email', selectedUser?.email)
    setValue('titles', selectedUser?.titles?.toString())
    setValue('picture', selectedUser?.picture ?? '')
    setValue('isBoardMember', selectedUser?.isBoardMember)
    setValue('isMember', selectedUser?.isMember)
    setValue('isAdmin', selectedUser?.isAdmin)
  }
  return (
    <>
      <IconButton colorScheme="yellow" aria-label="edit" onClick={() => onOpen()}>
        <FaPencilAlt />
      </IconButton>

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{t('common.editMembers')}</ModalHeader>
            <ModalCloseButton onClick={() => reset()} />
            <ModalBody p={6}>
              <FormControl isInvalid={!!errors.name}>
                <Select
                  placeholder="Select user"
                  onChange={selectUser}
                  options={users.map((c) => ({ value: c.id, label: c.name + ' -- ' + c.email }))}
                ></Select>
              </FormControl>
              <FormControl mt={2} isInvalid={!!errors.name} isRequired>
                <FormLabel>{t('editorship.name')}</FormLabel>
                <Input
                  type="text"
                  {...register('name', {
                    required: { value: true, message: t('editorship.nameError') },
                    maxLength: {
                      value: 200,
                      message: t('editorship.emailTooLong') + ' ' + getStatusString(watch('name') ?? '', 200)
                    }
                  })}
                  placeholder="Teszt Elek"
                />
                {errors.name && <FormErrorMessage>{errors.name.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl mt={2} isInvalid={!!errors.email} isRequired>
                <FormLabel>{t('editorship.email')}</FormLabel>
                <Input
                  type="email"
                  {...register('email', {
                    required: { value: true, message: t('editorship.emailError') },
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: t('editorship.badEmail')
                    },
                    maxLength: {
                      value: 200,
                      message: t('editorship.emailTooLong') + ' ' + getStatusString(watch('email') ?? '', 200)
                    }
                  })}
                  placeholder="elek@gmail.com"
                />
                {errors.email && <FormErrorMessage>{errors.email.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl mt={2} isInvalid={!!errors.titles} isRequired>
                <FormLabel>{t('editorship.roles')}</FormLabel>
                <Input
                  type="text"
                  {...register('titles', {
                    required: { value: true, message: t('editorship.roleError') },
                    maxLength: {
                      value: 200,
                      message: t('editorship.rolesTooLong') + ' ' + getStatusString(watch('titles'), 200)
                    }
                  })}
                  placeholder={t('editorship.writerEditor')}
                />
                {errors.titles && <FormErrorMessage>{errors.titles.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl mt={2} isInvalid={!!errors.picture}>
                <FormLabel>{t('editorship.profilePicture')}</FormLabel>
                <Input
                  type="text"
                  {...register('picture', {
                    maxLength: {
                      value: 200,
                      message: t('editorship.pictureTooLong') + ' ' + getStatusString(watch('picture'), 200)
                    }
                  })}
                  placeholder="https://image"
                />
                {errors.picture && <FormErrorMessage>{errors.picture.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl isInvalid={!!errors.picture}>
                <HStack mt={4}>
                  <Checkbox {...register('isBoardMember')} isChecked={watch('isBoardMember')}>
                    <Text fontWeight="semibold">{t('editorship.isLeadershipMember')}</Text>
                  </Checkbox>
                </HStack>
              </FormControl>
              <FormControl isInvalid={!!errors.picture}>
                <HStack mt={4}>
                  <Checkbox {...register('isMember')} isChecked={watch('isMember')}>
                    <Text fontWeight="semibold">{t('editorship.isMember')}</Text>
                  </Checkbox>
                </HStack>
              </FormControl>
              <FormControl isInvalid={!!errors.picture}>
                <HStack mt={4}>
                  <Checkbox {...register('isAdmin')} isChecked={watch('isAdmin')}>
                    <Text fontWeight="semibold">{t('editorship.isAdmin')}</Text>
                  </Checkbox>
                </HStack>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  onClose()
                  reset()
                }}
                mr={3}
              >
                {t('common.cancel')}
              </Button>
              <Button colorScheme="blue" type="submit" onClick={onSubmit}>
                {t('common.save')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
