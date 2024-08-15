'use client';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  user?: any;  // Define the user type based on your data structure
}

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
            className="w-[24px] max-xl:w-[14px]" // Corrected class name
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link> 

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route ||
            pathname.startsWith(`${item.route}`);
          
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'sidebar-link', 
                { 'bg-bank-gradient': isActive }
              )}
            >
              <div className="relative w-6 h-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill={true} // Use fill as a boolean prop
                  className={cn({
                    'brightness-75 invert-0': isActive
                  })}
                />
              </div>
              <p className={cn('sidebar-label',{
                '!text-white' :isActive
              })}>
               {item.label} 
              </p>
            </Link>
          );
        })}

        USER
      </nav>

      FOOTER
    </section>
  );
};

export default Sidebar;
