import type { Metadata } from "next";
import { Inter } from "next/font/google";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className="text-2xl">Profile</h1>
            <p className='text-4xl'>

                {children}

            </p>
            <hr />
        </div>
    );
}