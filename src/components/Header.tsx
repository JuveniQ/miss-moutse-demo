import React from 'react';
import { Crown, User, LogOut } from 'lucide-react';

interface HeaderProps {
  user: any;
  onAuthClick: () => void;
  credits: number;
}

export default function Header({ user, onAuthClick, credits }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-yellow-300" />
            <h1 className="text-2xl font-bold text-white">Miss Moutse</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#contestants" className="text-white hover:text-yellow-200 transition-colors duration-200">
              Contestants
            </a>
            <a href="#leaderboard" className="text-white hover:text-yellow-200 transition-colors duration-200">
              Leaderboard
            </a>
            <a href="#packages" className="text-white hover:text-yellow-200 transition-colors duration-200">
              Vote Packages
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-white text-sm">
                <span className="bg-yellow-500 text-black px-2 py-1 rounded-full font-semibold">
                  {credits} credits
                </span>
              </div>
            )}
            
            <button
              onClick={onAuthClick}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              {user ? (
                <>
                  <span className="text-sm font-medium">{user.name}</span>
                  <LogOut className="h-4 w-4" />
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">Sign In</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}