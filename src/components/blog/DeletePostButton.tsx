'use client'
import { ConfirmDialogButton } from '../common/ConfirmDialogButton'

export default function DeletePostButton({ deleteData, postId }: { postId: number; deleteData: (data: number) => void }) {
  return (
    <ConfirmDialogButton
      bodyText="Biztosan törlöd a posztot?"
      confirmAction={() => deleteData(postId)}
      headerText="Poszt törlése"
      confirmButtonText="Törlés"
    />
  )
}
