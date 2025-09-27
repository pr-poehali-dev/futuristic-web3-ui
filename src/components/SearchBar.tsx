import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SearchResult {
  id: number;
  type: 'music' | 'video' | 'user' | 'nft' | 'dao';
  title: string;
  subtitle: string;
  icon: string;
  verified?: boolean;
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const mockResults: SearchResult[] = [
    { id: 1, type: 'music', title: 'Cyberpunk Dreams', subtitle: 'Neon Synth', icon: 'Music' },
    { id: 2, type: 'video', title: 'Web3 Tutorial', subtitle: '1.2M views', icon: 'Play' },
    { id: 3, type: 'user', title: '@cryptodev', subtitle: '45K followers', icon: 'User', verified: true },
    { id: 4, type: 'nft', title: 'Digital Genesis #123', subtitle: '2.5 ETH', icon: 'Image' },
    { id: 5, type: 'dao', title: 'DeFi Protocol DAO', subtitle: '15K members', icon: 'Users' },
  ];

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setResults(mockResults.filter(item => 
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(value.toLowerCase())
        ));
        setIsSearching(false);
      }, 300);
    } else {
      setResults([]);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'music': return 'text-green-400';
      case 'video': return 'text-red-400';
      case 'user': return 'text-blue-400';
      case 'nft': return 'text-purple-400';
      case 'dao': return 'text-amber-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Input
          placeholder="Search music, videos, users, NFTs..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-glow pl-10 pr-4 bg-card/50 border-border/50 focus:border-neon-violet/50"
        />
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground icon-glow" 
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-neon-violet border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full glass-dark border-border/50 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {results.map((result) => (
              <div
                key={result.id}
                className="p-3 rounded-lg hover:bg-card/50 cursor-pointer transition-all border border-transparent hover:border-neon-violet/30 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-neon-violet to-neon-cyan rounded flex items-center justify-center group-hover:animate-glow">
                    <Icon name={result.icon as any} size={14} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{result.title}</p>
                      {result.verified && (
                        <Icon name="BadgeCheck" size={12} className="text-blue-400" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{result.subtitle}</p>
                  </div>
                  <div className={`text-xs font-medium uppercase ${getTypeColor(result.type)}`}>
                    {result.type}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;