import { UserEntity } from '@/pages/api/users/dto/UserEntity.dto'
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
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { FaPencilAlt } from 'react-icons/fa'
import { getStatusString } from '../common/editor/editorUtils'

type Props = {
  user?: UserEntity
}

export const EditorshipModalButton = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      Router.reload()
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
      Router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {user ? (
        <IconButton colorScheme="yellow" aria-label="edit" children={<FaPencilAlt />} onClick={() => onOpen()} />
      ) : (
        <Button onClick={() => onOpen()}>Új tag</Button>
      )}

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{user ? user.name + ' módosítása' : 'Új tag'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={!!errors.name} isRequired>
                <FormLabel>Név</FormLabel>
                <Input
                  type="text"
                  {...register('name', {
                    required: { value: true, message: 'A név nem lehet üres!' },
                    maxLength: {
                      value: 200,
                      message: 'Név túl hosszú! ' + getStatusString(watch('name') ?? '', 200)
                    }
                  })}
                  placeholder="Teszt Elek"
                />
                {errors.name && <FormErrorMessage>{errors.name.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl mt={2} isInvalid={!!errors.email} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register('email', {
                    required: { value: true, message: 'Az email nem lehet üres!' },
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Rossz email forma'
                    },
                    maxLength: {
                      value: 200,
                      message: 'Email túl hosszú! ' + getStatusString(watch('email') ?? '', 200)
                    }
                  })}
                  placeholder="elek@gmail.com"
                />
                {errors.email && <FormErrorMessage>{errors.email.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl mt={2} isInvalid={!!errors.titles} isRequired>
                <FormLabel>Posztok</FormLabel>
                <Input
                  type="text"
                  {...register('titles', {
                    required: { value: true, message: 'Legalább 1 poszt kell!' },
                    maxLength: {
                      value: 200,
                      message: 'Posztok túl hosszú! ' + getStatusString(watch('titles'), 200)
                    }
                  })}
                  placeholder="Író, grafikus"
                />
                {errors.titles && <FormErrorMessage>{errors.titles.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl mt={2} isInvalid={!!errors.picture}>
                <FormLabel>Profilkép</FormLabel>
                <Input
                  type="text"
                  {...register('picture', {
                    maxLength: {
                      value: 200,
                      message: 'Kép link túl hosszú! ' + getStatusString(watch('picture'), 200)
                    }
                  })}
                  placeholder="https://image"
                />
                {errors.picture && <FormErrorMessage>{errors.picture.message?.toString()}</FormErrorMessage>}
              </FormControl>

              <FormControl isInvalid={!!errors.picture}>
                <HStack mt={4}>
                  <Checkbox {...register('isBoardMember')}>
                    <Text fontWeight="semibold">Vezetőségi tag</Text>
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
                Mégse
              </Button>
              <Button colorScheme="blue" type="submit" onClick={() => onSubmit()}>
                Mentés
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
