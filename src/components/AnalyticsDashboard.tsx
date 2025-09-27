import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface AnalyticsData {
  metric: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

const AnalyticsDashboard = () => {
  const analyticsData: AnalyticsData[] = [
    { metric: 'Total Views', value: '2.4M', change: 12.5, icon: 'Eye', color: 'text-blue-400' },
    { metric: 'Music Streams', value: '890K', change: 8.3, icon: 'Music', color: 'text-green-400' },
    { metric: 'NFT Sales', value: '156 ETH', change: 23.7, icon: 'Image', color: 'text-purple-400' },
    { metric: 'DAO Revenue', value: '$45.2K', change: -2.1, icon: 'DollarSign', color: 'text-amber-400' },
    { metric: 'Active Users', value: '127K', change: 15.8, icon: 'Users', color: 'text-cyan-400' },
    { metric: 'Engagement Rate', value: '34.6%', change: 5.2, icon: 'Heart', color: 'text-red-400' },
  ];

  const topContent = [
    { title: 'Cyberpunk Dreams', type: 'Music', plays: '45.2K', revenue: '2.3 ETH' },
    { title: 'Web3 Masterclass', type: 'Video', views: '123K', revenue: '1.8 ETH' },
    { title: 'Digital Art #001', type: 'NFT', sales: '12', revenue: '15.6 ETH' },
    { title: 'DeFi Strategy Guide', type: 'Post', likes: '8.9K', revenue: '0.9 ETH' },
  ];

  const generateChartData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      views: Math.floor(Math.random() * 1000) + 500,
      revenue: Math.floor(Math.random() * 100) + 50,
    }));
  };

  const chartData = generateChartData();

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyticsData.map((data, index) => (
          <Card key={index} className="glass-dark border-border/50 hover:border-neon-violet/50 transition-all glow-on-hover">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{data.metric}</p>
                  <p className="text-2xl font-bold">{data.value}</p>
                  <p className={`text-xs ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {data.change >= 0 ? '+' : ''}{data.change}% vs last month
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan flex items-center justify-center animate-glow`}>
                  <Icon name={data.icon as any} size={20} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <Card className="glass-dark border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={20} className="text-blue-400" />
              Daily Views (30 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-1">
              {chartData.map((day, index) => (
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-blue-500/20 to-blue-500/60 rounded-t hover:from-blue-500/40 hover:to-blue-500/80 transition-all cursor-pointer"
                  style={{ height: `${(day.views / 1500) * 100}%` }}
                  title={`Day ${day.day}: ${day.views} views`}
                />
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">Hover over bars for details</p>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="glass-dark border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="DollarSign" size={20} className="text-green-400" />
              Daily Revenue (30 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-1">
              {chartData.map((day, index) => (
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-green-500/20 to-green-500/60 rounded-t hover:from-green-500/40 hover:to-green-500/80 transition-all cursor-pointer"
                  style={{ height: `${(day.revenue / 150) * 100}%` }}
                  title={`Day ${day.day}: $${day.revenue}`}
                />
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">Revenue in USD equivalent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Content */}
      <Card className="glass-dark border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Star" size={20} className="text-amber-400" />
            Top Performing Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topContent.map((content, index) => (
              <div key={index} className="p-4 rounded-lg bg-card/30 border border-border/30 hover:border-neon-violet/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-neon-violet to-neon-cyan rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{content.title}</h3>
                      <p className="text-sm text-muted-foreground">{content.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neon-cyan">{content.revenue}</p>
                    <p className="text-xs text-muted-foreground">
                      {content.type === 'Music' && `${content.plays} plays`}
                      {content.type === 'Video' && `${content.views} views`}
                      {content.type === 'NFT' && `${content.sales} sales`}
                      {content.type === 'Post' && `${content.likes} likes`}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={Math.random() * 100} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-dark border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="PieChart" size={20} className="text-purple-400" />
              Revenue Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: 'Music Streaming', percentage: 35, color: 'from-green-400 to-emerald-500' },
                { source: 'NFT Sales', percentage: 28, color: 'from-purple-400 to-violet-500' },
                { source: 'Video Monetization', percentage: 22, color: 'from-red-400 to-pink-500' },
                { source: 'DAO Governance', percentage: 15, color: 'from-amber-400 to-orange-500' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{item.source}</span>
                    <span className="text-sm font-medium">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-dark border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Target" size={20} className="text-cyan-400" />
              Monthly Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { goal: 'Reach 3M Views', current: 2400000, target: 3000000 },
                { goal: '1M Music Streams', current: 890000, target: 1000000 },
                { goal: '200 ETH Revenue', current: 156, target: 200 },
                { goal: '150K Active Users', current: 127000, target: 150000 },
              ].map((item, index) => {
                const percentage = (item.current / item.target) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{item.goal}</span>
                      <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {typeof item.current === 'number' && item.current > 1000000 
                        ? `${(item.current / 1000000).toFixed(1)}M` 
                        : item.current.toLocaleString()
                      } / {typeof item.target === 'number' && item.target > 1000000 
                        ? `${(item.target / 1000000).toFixed(1)}M` 
                        : item.target.toLocaleString()
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;