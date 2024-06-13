import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import Image from 'next/image'
import MobileNav from '@/components/MobileNav'


const RootLayout = ({ children }: { children: ReactNode }) => {
  const user = { firstName: "Saif", lastName: "Nasir" }

  return (
     <main className='flex h-screen w-full font-inter'>
      <Sidebar />
      
      <div className='flex size-full flex-col'>
        <div className='root-layout'>
          <Image src="/icons/logo.svg" width={30} height={30} alt='menu icon'/>
          <div>
            <MobileNav user={user}/>
          </div>

        </div>

        {children}
      </div>


    </main>
  )
}

export default RootLayout;