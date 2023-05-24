import { Link } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGemoji from 'remark-gemoji'
import remarkGfm from 'remark-gfm'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const theme: any = {
  a: (props: { href: string; children: ReactNode }) => {
    const { href, children } = props
    return (
      <Link textColor="brand.200" textDecoration="underline" isExternal href={href}>
        {children}
      </Link>
    )
  }
}

const Markdown = ({ markdown }: { markdown?: string }) => {
  // eslint-disable-next-line react/no-children-prop
  return <ReactMarkdown components={ChakraUIRenderer(theme)} children={markdown || ''} remarkPlugins={[remarkGfm, remarkGemoji]} />
}

export default Markdown
