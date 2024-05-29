"use client"

import { Poppins } from 'next/font/google';
import HeaderBox from '@/components/HeaderBox';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { LoginButton } from '@/components/auth/LoginButton';

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

const Homepage = () => {
    // const [loggedIn, setLoggedIn ] = useState<{vorname: string; nachname: string } | null>(null);
    
    // useEffect(() => {
    //     // Simulierte data fetching
    //     const fetchData = async () => {
    //         const data = {
    //             vorname: 'Alvin',
    //             nachname: 'Martinez',
    //         };
    //         setLoggedIn(data);
    //     };

    //     fetchData();
    // }, []);

    // const currentPage = Number(searchParams.page as string) || 1;

    // if (!loggedIn) {
    //     return <div>Loading...</div>
    // }

    return (
        // <section className='home'>
        //     <div className='home-content'>
        //         <header className="home-header">
        //         <HeaderBox
        //             type='greeting'
        //             title='Welcome, '
        //             user={loggedIn.vorname || 'Guest'}
        //             subtext="Hi Alvin, don't forget to check your property today"
        //         />
        //         </header>
        //         <Button>Klick mich</Button>
        //     </div>
        // </section>


        <main className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
            <div className="space-y-6 text-center">
                <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",
                    font.className
                )}>
                    🔐 Auth
                </h1>
                <p className="text-white text-lg">
                    PropTrack Authentifizierung
                </p>
                <div>
                    <LoginButton mode="modal">
                        <Button variant="secondary" size="lg">
                            Anmelden
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
  )
}

export default Homepage