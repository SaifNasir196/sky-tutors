import React, { FC, ReactNode } from 'react'
import './globals.css'
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}


const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <body className = 'main'>
        <div className='navbar'>
          <Link href="/"><h1>SkyTutors</h1></Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        {children}
      </body>
    </html>
    
  )
}

export default Layout;