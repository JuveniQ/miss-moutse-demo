import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContestantCard from './components/ContestantCard';
import VotingModal from './components/VotingModal';
import AuthModal from './components/AuthModal';
import Leaderboard from './components/Leaderboard';
import VotePackages from './components/VotePackages';
import { mockContestants } from './data/mockData';
import { Crown, Star, Heart } from 'lucide-react';

interface Contestant {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  votes: number;
  description: string;
}

function App() {
  const [contestants, setContestants] = useState<Contestant[]>(mockContestants);
  const [user, setUser] = useState<any>(null);
  const [selectedContestant, setSelectedContestant] = useState<Contestant | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Initialize user with some credits when they log in
  const handleLogin = (userData: any) => {
    setUser(userData);
    setUserCredits(500); // Give new users 500 credits to start
  };

  const handleLogout = () => {
    setUser(null);
    setUserCredits(0);
  };

  const handleVoteClick = (contestant: Contestant) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setSelectedContestant(contestant);
    setShowVotingModal(true);
  };

  const handleVotePurchase = (contestant: Contestant, voteCount: number) => {
    const totalCost = voteCount * 10; // 10 credits per vote
    
    if (totalCost <= userCredits) {
      setUserCredits(prev => prev - totalCost);
      setContestants(prev => 
        prev.map(c => 
          c.id === contestant.id 
            ? { ...c, votes: c.votes + voteCount }
            : c
        )
      );
      
      // Show success animation or notification
      setTimeout(() => {
        alert(`Successfully voted ${voteCount} time(s) for ${contestant.name}!`);
      }, 100);
    }
  };

  const handleCreditPurchase = (credits: number, cost: number) => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setUserCredits(prev => prev + credits);
      setIsProcessingPayment(false);
      alert(`Successfully purchased ${credits} credits for R${cost}!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50">
      <Header
        user={user}
        onAuthClick={() => user ? handleLogout() : setShowAuthModal(true)}
        credits={userCredits}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="h-16 w-16 text-yellow-300 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Miss Moutse 2025
          </h1>
          <p className="text-xl text-pink-100 mb-8 max-w-3xl mx-auto">
            Vote for your favorite contestants and help crown the next Miss Moutse. 
            Celebrating the beauty, intelligence, and spirit of Moutse women!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-white">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-300" />
              <span className="text-lg font-semibold">{contestants.length} Amazing Contestants</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-300" />
              <span className="text-lg font-semibold">
                {contestants.reduce((total, c) => total + c.votes, 0)} Total Votes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contestants Section */}
      <section id="contestants" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Moutse Contestants
            </h2>
            <p className="text-xl text-gray-600">
              Get to know the amazing Moutse women competing for the crown
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contestants.map((contestant) => (
              <ContestantCard
                key={contestant.id}
                contestant={contestant}
                onVote={handleVoteClick}
                user={user}
              />
            ))}
          </div>
        </div>
      </section>

      <Leaderboard contestants={contestants} />
      <VotePackages onPurchase={handleCreditPurchase} user={user} />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-500" />
              <h3 className="text-2xl font-bold">Miss Moutse</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering Moutse women, celebrating excellence, and crowning champions.
            </p>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-sm text-gray-500">
                © 2025 Miss Moutse Platform. This is a demonstration prototype with simulated data and payments.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      {selectedContestant && (
        <VotingModal
          contestant={selectedContestant}
          isOpen={showVotingModal}
          onClose={() => {
            setShowVotingModal(false);
            setSelectedContestant(null);
          }}
          onPurchase={handleVotePurchase}
          userCredits={userCredits}
        />
      )}

      {/* Payment Processing Overlay */}
      {isProcessingPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h3>
            <p className="text-gray-600">Please wait while we process your transaction...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;