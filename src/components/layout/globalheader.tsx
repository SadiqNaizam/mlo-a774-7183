import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Music, Search, UserCircle, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const GlobalHeader: React.FC = () => {
  console.log('GlobalHeader loaded');
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background backdrop-blur-xl border-[hsla(var(--border)/0.1)] supports-[backdrop-filter]:bg-background/80 px-4 md:px-6">
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Bell className="h-6 w-6 text-blue-600" /> {/* Doraemon's Bell */}
        <span className="font-bold text-xl text-primary">DoraMusic</span>
      </Link>
      <div className="flex-1">
        <form className="relative ml-auto flex-1 sm:flex-initial">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search songs, artists, albums..."
            // bg-input is now transparent via tailwind.config.ts. Add blur and border to input itself for better effect if needed
            // For now, relies on header's backdrop-blur.
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-input focus:bg-card border border-[hsla(var(--border)/0.1)] backdrop-blur-sm" 
          />
        </form>
      </div>
      {/* DropdownMenu will use bg-popover, which is now transparent + blurred by parent */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                <UserCircle className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="backdrop-blur-md border-[hsla(var(--border)/0.15)]">
          {/* Added backdrop-blur to DropdownMenuContent itself */}
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default GlobalHeader;