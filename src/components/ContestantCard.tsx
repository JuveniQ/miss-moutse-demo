import React from 'react';
import { Heart, Vote } from 'lucide-react';

interface Contestant {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  votes: number;
  description: string;
}

interface ContestantCardProps {
  contestant: Contestant;
  onVote: (contestant: Contestant) => void;
  user: any;
}

export default function ContestantCard({ contestant, onVote, user }: ContestantCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={contestant.image}
          alt={contestant.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          #{contestant.id}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{contestant.name}</h3>
            <p className="text-pink-600 text-sm font-medium">{contestant.age} years • {contestant.location}</p>
          </div>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Heart className="h-5 w-5 fill-current" />
            <span className="font-bold text-lg">{contestant.votes}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{contestant.description}</p>
        
        <button
          onClick={() => onVote(contestant)}
          disabled={!user}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-300 disabled:to-gray-300 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
        >
          <Vote className="h-5 w-5" />
          <span>{user ? 'Vote Now' : 'Sign In to Vote'}</span>
        </button>
      </div>
    </div>
  );
}