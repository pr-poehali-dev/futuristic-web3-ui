import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface DeFiPool {
  name: string;
  apy: number;
  tvl: string;
  risk: 'Low' | 'Medium' | 'High';
  icon: string;
}

interface NFTCollection {
  name: string;
  floorPrice: number;
  volume: string;
  change: number;
  image: string;
}

interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  balance: number;
}

interface DAOProposal {
  id: number;
  title: string;
  status: 'Active' | 'Passed' | 'Failed';
  votes: number;
  endDate: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [walletConnected, setWalletConnected] = useState(false);

  const defiPools: DeFiPool[] = [
    { name: 'ETH-USDC LP', apy: 12.5, tvl: '$2.4B', risk: 'Low', icon: 'Coins' },
    { name: 'AAVE Lending', apy: 8.2, tvl: '$1.8B', risk: 'Low', icon: 'TrendingUp' },
    { name: 'Compound Finance', apy: 15.7, tvl: '$980M', risk: 'Medium', icon: 'BarChart3' },
    { name: 'Yearn Vault', apy: 22.3, tvl: '$650M', risk: 'High', icon: 'Zap' },
  ];

  const nftCollections: NFTCollection[] = [
    { name: 'CyberPunks 2077', floorPrice: 2.5, volume: '1,234 ETH', change: 12.5, image: '🤖' },
    { name: 'Space Odyssey', floorPrice: 1.8, volume: '987 ETH', change: -5.2, image: '🚀' },
    { name: 'Digital Genesis', floorPrice: 3.2, volume: '2,156 ETH', change: 8.7, image: '💎' },
    { name: 'Metaverse Keys', floorPrice: 0.9, volume: '543 ETH', change: 15.3, image: '🗝️' },
  ];

  const cryptoAssets: CryptoAsset[] = [
    { symbol: 'ETH', name: 'Ethereum', price: 2847.32, change: 5.2, balance: 2.5 },
    { symbol: 'BTC', name: 'Bitcoin', price: 43621.18, change: 2.1, balance: 0.15 },
    { symbol: 'MATIC', name: 'Polygon', price: 0.98, change: -1.5, balance: 1250 },
    { symbol: 'UNI', name: 'Uniswap', price: 8.45, change: 7.8, balance: 45 },
  ];

  const daoProposals: DAOProposal[] = [
    { id: 1, title: 'Increase Staking Rewards by 2%', status: 'Active', votes: 15420, endDate: '2024-10-15' },
    { id: 2, title: 'Launch New NFT Marketplace', status: 'Active', votes: 8930, endDate: '2024-10-20' },
    { id: 3, title: 'Treasury Diversification Plan', status: 'Passed', votes: 22150, endDate: '2024-09-28' },
  ];

  const totalPortfolioValue = cryptoAssets.reduce((total, asset) => total + (asset.price * asset.balance), 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="glass-dark border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan flex items-center justify-center animate-glow">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient">CyberSpace</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {['Dashboard', 'DeFi', 'NFT', 'DAO', 'Wallet'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === item.toLowerCase()
                      ? 'bg-primary text-primary-foreground shadow-neon'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-neon-cyan/50 text-neon-cyan">
                {walletConnected ? '0x1234...5678' : 'Not Connected'}
              </Badge>
              <Button
                onClick={() => setWalletConnected(!walletConnected)}
                className={`transition-all ${
                  walletConnected 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gradient-to-r from-neon-violet to-neon-cyan hover:opacity-90 shadow-neon'
                }`}
              >
                <Icon name="Wallet" size={16} className="mr-2" />
                {walletConnected ? 'Connected' : 'Connect Wallet'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 glass-dark">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="defi">DeFi</TabsTrigger>
            <TabsTrigger value="nft">NFT</TabsTrigger>
            <TabsTrigger value="dao">DAO</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6 mt-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-dark border-border/50 hover:border-neon-violet/50 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="TrendingUp" size={16} className="text-green-400" />
                    Portfolio Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gradient">
                    ${totalPortfolioValue.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-400 mt-1">+12.5% (24h)</p>
                </CardContent>
              </Card>

              <Card className="glass-dark border-border/50 hover:border-neon-cyan/50 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="Coins" size={16} className="text-neon-cyan" />
                    DeFi Yield
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neon-cyan">14.7% APY</div>
                  <p className="text-xs text-muted-foreground mt-1">Avg. across pools</p>
                </CardContent>
              </Card>

              <Card className="glass-dark border-border/50 hover:border-neon-violet/50 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="Image" size={16} className="text-neon-violet" />
                    NFT Holdings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neon-violet">127</div>
                  <p className="text-xs text-green-400 mt-1">+8 this week</p>
                </CardContent>
              </Card>

              <Card className="glass-dark border-border/50 hover:border-amber-400/50 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="Users" size={16} className="text-amber-400" />
                    DAO Votes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-400">45</div>
                  <p className="text-xs text-muted-foreground mt-1">Governance power</p>
                </CardContent>
              </Card>
            </div>

            {/* Featured Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-dark border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} className="text-neon-cyan" />
                    Top DeFi Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {defiPools.slice(0, 3).map((pool, index) => (
                      <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/30 hover:border-neon-violet/50 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon name={pool.icon as any} size={16} className="text-neon-violet" />
                            <span className="font-medium text-sm">{pool.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-neon-cyan">{pool.apy}%</div>
                            <Badge variant="outline" className="text-xs h-5">
                              {pool.risk}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Image" size={20} className="text-neon-violet" />
                    Trending NFTs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nftCollections.slice(0, 3).map((collection, index) => (
                      <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/30 hover:border-neon-violet/50 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{collection.image}</span>
                            <span className="font-medium text-sm">{collection.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-neon-cyan">{collection.floorPrice} ETH</div>
                            <div className={`text-xs ${collection.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {collection.change >= 0 ? '+' : ''}{collection.change}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* DeFi Tab */}
          <TabsContent value="defi" className="space-y-6 mt-6 animate-fade-in">
            <Card className="glass-dark border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Coins" size={20} className="text-neon-cyan" />
                  DeFi Protocols & Yield Farming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {defiPools.map((pool, index) => (
                    <div key={index} className="p-4 rounded-lg bg-card/50 border border-border/30 hover:border-neon-violet/50 transition-all group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan flex items-center justify-center group-hover:animate-glow">
                            <Icon name={pool.icon as any} size={20} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{pool.name}</h3>
                            <p className="text-sm text-muted-foreground">TVL: {pool.tvl}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-neon-cyan">{pool.apy}% APY</div>
                          <Badge variant={pool.risk === 'Low' ? 'default' : pool.risk === 'Medium' ? 'secondary' : 'destructive'}>
                            {pool.risk} Risk
                          </Badge>
                        </div>
                        <Button className="bg-gradient-to-r from-neon-violet to-neon-cyan hover:opacity-90 shadow-neon">
                          Stake Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NFT Tab */}
          <TabsContent value="nft" className="space-y-6 mt-6 animate-fade-in">
            <Card className="glass-dark border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Image" size={20} className="text-neon-violet" />
                  NFT Marketplace & Collections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {nftCollections.map((collection, index) => (
                    <div key={index} className="p-4 rounded-lg bg-card/50 border border-border/30 hover:border-neon-violet/50 transition-all group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl group-hover:animate-float">{collection.image}</div>
                        <div>
                          <h3 className="font-semibold">{collection.name}</h3>
                          <p className="text-sm text-muted-foreground">Volume: {collection.volume}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Floor Price</p>
                          <p className="font-bold text-neon-cyan">{collection.floorPrice} ETH</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm ${collection.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {collection.change >= 0 ? '+' : ''}{collection.change}%
                          </p>
                          <Button size="sm" className="mt-1 bg-gradient-to-r from-neon-violet to-neon-cyan hover:opacity-90">
                            View Collection
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DAO Tab */}
          <TabsContent value="dao" className="space-y-6 mt-6 animate-fade-in">
            <Card className="glass-dark border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={20} className="text-amber-400" />
                  DAO Governance & Proposals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {daoProposals.map((proposal) => (
                    <div key={proposal.id} className="p-4 rounded-lg bg-card/50 border border-border/30 hover:border-amber-400/50 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{proposal.title}</h3>
                        <Badge variant={proposal.status === 'Active' ? 'default' : proposal.status === 'Passed' ? 'secondary' : 'destructive'}>
                          {proposal.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            Votes: {proposal.votes.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Ends: {proposal.endDate}
                          </span>
                        </div>
                        {proposal.status === 'Active' && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black">
                              Vote Yes
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-black">
                              Vote No
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6 mt-6 animate-fade-in">
            <Card className="glass-dark border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Wallet" size={20} className="text-green-400" />
                  Crypto Wallet & Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cryptoAssets.map((asset, index) => (
                    <div key={index} className="p-4 rounded-lg bg-card/50 border border-border/30 hover:border-green-400/50 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                            <span className="font-bold text-white text-xs">{asset.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{asset.name}</h3>
                            <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${asset.price.toLocaleString()}</div>
                          <div className={`text-sm ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {asset.change >= 0 ? '+' : ''}{asset.change}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{asset.balance} {asset.symbol}</div>
                          <div className="text-sm text-muted-foreground">
                            ${(asset.price * asset.balance).toLocaleString()}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-green-400/50 hover:bg-green-400 hover:text-black">
                          Trade
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;