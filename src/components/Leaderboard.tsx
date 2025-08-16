import React from 'react';
import { Crown, Trophy, Medal, Award } from 'lucide-react';

interface Contestant {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  votes: number;
  description: string;
}

interface LeaderboardProps {
  contestants: Contestant[];
}

export default function Leaderboard({ contestants }: LeaderboardProps) {
  const sortedContestants = [...contestants].sort((a, b) => b.votes - a.votes);
  
  const getIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-8 w-8 text-yellow-500" />;
      case 2:
        return <Trophy className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Medal className="h-8 w-8 text-amber-600" />;
      default:
        return <Award className="h-8 w-8 text-pink-400" />;
    }
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-amber-100 to-amber-200 border-2 border-amber-300';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  return (
    <section id="leaderboard" className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Current Leaderboard
          </h2>
          <p className="text-xl text-gray-600">
            See who's leading the competition
          </p>
        </div>

        <div className="space-y-4">
          {sortedContestants.map((contestant, index) => {
            const position = index + 1;
            return (
              <div
                key={contestant.id}
                className={`${getPositionStyle(position)} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-4">
                    {getIcon(position)}
                    <span className={`text-3xl font-bold ${
                      position <= 3 ? 'text-gray-800' : 'text-pink-600'
                    }`}>
                      #{position}
                    </span>
                  </div>
                  
                  <img
                    src={contestant.image}
                    alt={contestant.name}
                    className="w-16 h-16 object-cover rounded-full border-4 border-white shadow-md"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {contestant.name}
                    </h3>
                    <p className="text-pink-600 font-medium">
                      {contestant.age} years • {contestant.location}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${
                      position === 1 ? 'text-yellow-600' : 
                      position === 2 ? 'text-gray-600' :
                      position === 3 ? 'text-amber-600' : 'text-pink-600'
                    }`}>
                      {contestant.votes}
                    </div>
                    <div className="text-sm text-gray-500">votes</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}