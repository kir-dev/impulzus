'use client'
import { UserEntity } from '@/models/UserEntity'
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
import { useTranslations } from 'next-intl'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { FaPencilAlt } from 'react-icons/fa'
import { getStatusString } from '../common/editor/editorUtils'

type Props = {
  user?: UserEntity
}

export const EditorshipModalButton = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const t = useTranslations()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      titles: user?.titles?.toString(),
      picture: user?.picture ?? '',
      isBoardMember: user?.isBoardMember
    },
    mode: 'all'
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const formData = {
      name: data.name,
      email: data.email,
      titles: data.titles?.split(','),
      picture: data.picture === '' ? undefined : data.picture,
      isBoardMember: data.isBoardMember
    }
    user ? updateData(formData) : submitData(formData)
  })

  const submitData = async (formData: Partial<UserEntity>) => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      onClose()
      Router.replace(Router.asPath)
    } catch (error) {
      console.error(error)
    }
  }

  const updateData = async (formData: Partial<UserEntity>) => {
    try {
      await fetch('/api/users/' + user?.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      onClose()
      Router.replace(Router.asPath)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {user ? (
        <IconButton colorScheme="yellow" aria-label="edit" onClick={() => onOpen()}>
          <FaPencilAlt />
        </IconButton>
      ) : (
        <Button onClick={() => onOpen()}>{t('editorship.newMember')}</Button>
      )}

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{user ? user.name + ' ' + t('common.editOf') : t('editorship.newMember')}</ModalHeader>
            <ModalCloseButton onClick={() => reset()} />
            <ModalBody pb={6}>
              <FormControl isInvalid={!!errors.name} isRequired>
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
                  <Checkbox {...register('isBoardMember')}>
                    <Text fontWeight="semibold">{t('editorship.isLeadershipMember')}</Text>
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
              <Button colorScheme="blue" type="submit" onClick={() => onSubmit()}>
                {t('common.save')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
