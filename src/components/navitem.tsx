import Link from 'next/link'

type Props = {
  text: string
  href: string
}

export const NavItem = ({ text, href }: Props) => {
  return <Link href={href}>{text}</Link>
}
