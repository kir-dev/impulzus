type Props = {
  text: string
  onClick?: () => void
}

export const Button = ({ text, onClick }: Props) => {
  return <button onClick={onClick}>{text}</button>
}
