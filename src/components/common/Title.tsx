import Head from 'next/head'

type Props = {
  text?: string
}

export function Title({ text }: Props) {
  return (
    <Head>
      <title>{`Impulzus ${text ? '| ' + text : ''}`}</title>
    </Head>
  )
}
