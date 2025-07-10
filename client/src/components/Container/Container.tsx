import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

function Container({ children }: Props) {
  return (
    <>
      <div className="max-w-screen-md mx-auto px-5">{children}</div>
    </>
  )
}

export default Container
