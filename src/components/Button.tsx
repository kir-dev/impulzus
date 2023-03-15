type Props = {
  text: string
  onClick?: () => void
}

export const Button = ({ text, onClick }: Props) => {
  return (
    <button onClick={onClick} className="text-white bg-sky-400 rounded hover:bg-sky-500 skew-x-6 p-2">
      {text}
    </button>
  )
}
