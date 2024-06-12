import { ReactNode } from 'react'


const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      {/* Sidebar */}

      {children}
    </main>
  )
}

export default RootLayout;