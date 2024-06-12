import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import React, { ReactNode } from 'react'
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'], // useful for optimizing the font loading by including only the necessary charsets.
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})


export const metadata: Metadata = {
  title: "Sky Tutors",
  description: "Sky Tutors is an institute by and for World-Class students.",
  icons: {
    icon: '/icons/logo.svg'
  }
};


const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
     <html className={`${inter.variable} ${ibmPlexSerif.variable}`}>
      <body className = 'main'>
        {children}
      </body>
    </html>
    
  )
}

export default RootLayout;