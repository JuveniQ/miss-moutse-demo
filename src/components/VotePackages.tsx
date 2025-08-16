import React from 'react';
import { Sparkles, Star, Crown, Zap } from 'lucide-react';

interface VotePackagesProps {
  onPurchase: (credits: number, cost: number) => void;
  user: any;
}

export default function VotePackages({ onPurchase, user }: VotePackagesProps) {
  const packages = [
    {
      id: 1,
      name: 'Starter Pack',
      credits: 10,
      cost: 9.99,
      icon: Sparkles,
      color: 'from-pink-400 to-pink-600',
      popular: true,
      description: 'Perfect for supporting your favorite contestant'
    },
    {
      id: 2,
      name: 'Popular Choice',
      credits: 50,
      cost: 49.99,
      icon: Star,
      color: 'from-rose-400 to-rose-600',
      popular: false,
      description: 'Most chosen package by our users'
    },
    {
      id: 3,
      name: 'Royal Package',
      credits: 100,
      cost: 84.99,
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      popular: false,
      description: 'Maximum support for your favorite'
    },
    {
      id: 4,
      name: 'Mega Boost',
      credits: 150,
      cost: 140.00,
      icon: Zap,
      color: 'from-purple-400 to-purple-600',
      popular: false,
      description: 'Ultimate voting power'
    }
  ];

  const handlePurchase = (credits: number, cost: number) => {
    if (!user) return;
    
    // Simulate payment processing
    setTimeout(() => {
      onPurchase(credits, cost);
    }, 1500);
  };

  return (
    <section id="packages" className="py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Vote Credit Packages
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect package to support your favorite contestants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  pkg.popular ? 'ring-2 ring-pink-400 ring-opacity-50' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${pkg.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                    {pkg.name}
                  </h3>
                  
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-pink-600">
                      {pkg.credits}
                    </span>
                    <span className="text-gray-500 ml-1">credits</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm text-center mb-6 h-10">
                    {pkg.description}
                  </p>
                  
                  <div className="text-center mb-6">
                    <span className="text-2xl font-bold text-gray-800">
                      R{pkg.cost}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handlePurchase(pkg.credits, pkg.cost)}
                    disabled={!user}
                    className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 disabled:from-gray-300 disabled:to-gray-300 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed`}
                  >
                    {user ? `Purchase R${pkg.cost}` : 'Sign In to Buy'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              How Voting Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-pink-600">1</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Purchase Credits</h4>
                <p className="text-gray-600 text-sm">Buy credit packages to get voting power</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-pink-600">2</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Vote for Contestants</h4>
                <p className="text-gray-600 text-sm">Use credits to vote for your favorites (10 credits = 1 vote)</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-pink-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Track Results</h4>
                <p className="text-gray-600 text-sm">Watch the leaderboard update in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}