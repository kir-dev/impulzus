'use client'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { FaTrash } from 'react-icons/fa'

interface ConfirmDialogButtonProps {
  headerText?: string
  bodyText?: string
  buttonText?: string
  buttonColorSchene?: string
  buttonVariant?: string
  confirmButtonText?: string
  refuseButtonText?: string
  buttonWidth?: string
  confirmAction(): void
}

export const ConfirmDialogButton = ({
  headerText,
  bodyText,
  buttonWidth,
  confirmButtonText = 'Igen',
  refuseButtonText = 'Mégse',
  confirmAction
}: ConfirmDialogButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)

  return (
    <>
      <IconButton colorScheme="red" aria-label="delete" onClick={onOpen} width={buttonWidth}>
        <FaTrash />
      </IconButton>
      <AlertDialog
        preserveScrollBarGap={true}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          {headerText && <AlertDialogHeader>{headerText}</AlertDialogHeader>}
          <AlertDialogCloseButton />
          {bodyText && <AlertDialogBody>{bodyText}</AlertDialogBody>}
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {refuseButtonText}
            </Button>
            <Button colorScheme="red" ml={3} onClick={confirmAction}>
              {confirmButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
