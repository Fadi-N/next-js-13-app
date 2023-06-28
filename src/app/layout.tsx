import {Nunito} from "next/font/google"
import './globals.css'
import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/Modal/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

//Google font optimisation in next.js
//https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
const font = Nunito({
    subsets: ["latin"]
})

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={font.className}>
        <ToasterProvider/>
        <RegisterModal/>
        <Navbar/>
        {children}
        </body>
        </html>
    )
}
