'use client'
import { redirect } from 'next/navigation'
import { ConfirmDialogButton } from '../common/ConfirmDialogButton'

export default function DeletePostButton({ postId }: { postId: string }) {
  const deleteData = async (id: string) => {
    try {
      await fetch('/api/posts/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      redirect('/blog')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <ConfirmDialogButton
      bodyText="Biztosan törlöd a posztot?"
      confirmAction={() => deleteData(postId)}
      headerText="Poszt törlése"
      confirmButtonText="Törlés"
    />
  )
}
