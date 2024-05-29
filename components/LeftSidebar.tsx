"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const LeftSidebar = ({ user }: SidebarProps) => {
  const [loggedIn, setLoggedIn ] = useState<{vorname: string; nachname: string } | null>(null);
    
  useEffect(() => {
      // Simulierte data fetching
      const fetchData = async () => {
          const user = {
              vorname: 'Alvin',
              nachname: 'Martinez',
          };
          setLoggedIn(user);
      };

      fetchData();
  }, []);

  const pathname = usePathname();

  return (
    <section className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <Link href="/" className="flex mb-12 cursor-pointer items-center gap-2">
          <LayoutDashboard
            width={34}
            height={34}
            className="size-[24px] max-xl:size-14"
          />
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn('sidebar-link', {'bg-bank-gradient': isActive})}
            >
              <div className="relative size-6">
                <Image
                  src={item.icon}
                  alt={item.label}
                  fill
                  className={cn({
                    'brightness-[3] invert-0': isActive
                  })}
                />
              </div>
              <p className={cn(
                'sidebar-label', {
                '!text-white' : isActive
              })}>
                {item.label}
              </p>
            </Link>
          )
        })}
      </nav>
    </section>
  )
}

export default LeftSidebar

//<a href="block px-4 py-2 rounded hover:bg-gray-700"></a>