import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, Library, Music2, ListMusic, Bell } from 'lucide-react'; // Using Bell for logo again for consistency

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
      isActive ? 'bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-100' : 'text-muted-foreground hover:text-blue-600'
    }`;

  return (
    <NavLink to={to} className={navLinkClasses}>
      <Icon className="h-5 w-5" />
      {label}
    </NavLink>
  );
};

const NavigationSidebar: React.FC = () => {
  console.log('NavigationSidebar loaded');

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex pt-20"> {/* pt-16 to account for header height, +4 for some spacing */}
      <nav className="flex flex-col gap-2 px-4 py-4">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/search" icon={Search} label="Search" />
        <NavItem to="/library" icon={Library} label="Your Library" />
      </nav>
      <div className="mt-auto p-4">
        {/* Placeholder for potential extra items or settings in sidebar footer */}
        {/* Example: <Button variant="outline" size="sm" className="w-full">Settings</Button> */}
      </div>
    </aside>
  );
};

export default NavigationSidebar;