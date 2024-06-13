'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Sidebar = () => {
    const pathName = usePathname();
  return (
    <section className='siderbar'>
        <nav className='flex flex-col gap-4'>
            <Link href = "/" className = "flex mb-12 cursor-pointer items-center gap-2" >
                <Image src="/icons/logo.svg" width={34} height={34} alt="Sky Tutors logo" className='size-[24px] max-xl:size-14' />
                <h1 className='sidebar-logo'>Sky Tutors</h1>
            </Link>

            {sidebarLinks.map(item => {
                const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                console.log(`Link: ${item.label}, Active: ${isActive}`);
                return (
                    <Link href={item.route} key={item.label} className={cn('sidebar-link', {'bg-bank-gradient': isActive})} >
                        <div className='relative size-6'>
                            <Image src={item.imgURL} alt={item.label} fill className={ cn({'brightness-[3] invert-0': isActive})}/>
                        </div>
                        <p className={cn('sidebar-label', {'!text-white': isActive})}>
                            {item.label}
                        </p> 
                    </Link>
                )
            })}


            {/* User */}

        </nav>

        {/* Footer */}

    </section>
  )
}

export default Sidebar