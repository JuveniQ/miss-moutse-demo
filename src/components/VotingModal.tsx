import React, { useState } from 'react';
import { X, Plus, Minus, Crown } from 'lucide-react';

interface Contestant {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  votes: number;
  description: string;
}

interface VotingModalProps {
  contestant: Contestant;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (contestant: Contestant, votes: number) => void;
  userCredits: number;
}

export default function VotingModal({ contestant, isOpen, onClose, onPurchase, userCredits }: VotingModalProps) {
  const [voteCount, setVoteCount] = useState(1);
  const votePrice = 10; // 10 credits per vote

  if (!isOpen) return null;

  const totalCost = voteCount * votePrice;
  const canAfford = totalCost <= userCredits;

  const handlePurchase = () => {
    if (canAfford) {
      onPurchase(contestant, voteCount);
      onClose();
      setVoteCount(1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <span>Vote for {contestant.name}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={contestant.image}
              alt={contestant.name}
              className="w-16 h-16 object-cover rounded-full border-2 border-pink-300"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{contestant.name}</h3>
              <p className="text-pink-600 text-sm">{contestant.age} years • {contestant.location}</p>
              <p className="text-gray-500 text-sm">Current votes: {contestant.votes}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-medium">Number of votes:</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setVoteCount(Math.max(1, voteCount - 1))}
                  className="p-1 hover:bg-white rounded-full transition-colors duration-200"
                >
                  <Minus className="h-5 w-5 text-pink-600" />
                </button>
                <span className="text-xl font-bold text-pink-700 min-w-[3rem] text-center">{voteCount}</span>
                <button
                  onClick={() => setVoteCount(voteCount + 1)}
                  className="p-1 hover:bg-white rounded-full transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 text-pink-600" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>Price per vote:</span>
              <span className="font-semibold">{votePrice} credits</span>
            </div>
            
            <div className="flex justify-between items-center text-lg font-bold border-t border-pink-200 pt-2">
              <span className="text-gray-800">Total cost:</span>
              <span className={`${canAfford ? 'text-pink-600' : 'text-red-500'}`}>
                {totalCost} credits
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Your credits:</span>
            <span className={`font-bold ${userCredits >= totalCost ? 'text-green-600' : 'text-red-500'}`}>
              {userCredits} credits
            </span>
          </div>

          {!canAfford && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-700 text-sm text-center">
                Insufficient credits. Please purchase more credits to continue.
              </p>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handlePurchase}
              disabled={!canAfford}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-300 disabled:to-gray-300 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed"
            >
              Purchase Votes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}