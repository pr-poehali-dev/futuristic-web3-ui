import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'code' | 'analysis';
}

interface AIAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  description: string;
  status: 'online' | 'busy' | 'offline';
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Web3 AI assistant. I can help with DeFi strategies, NFT analysis, smart contract development, and much more. What would you like to explore today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeAgent, setActiveAgent] = useState<AIAgent | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiAgents: AIAgent[] = [
    {
      id: 'web3-advisor',
      name: 'Web3 Advisor',
      specialty: 'DeFi & Trading',
      avatar: '🤖',
      description: 'Expert in DeFi protocols, yield farming, and trading strategies',
      status: 'online'
    },
    {
      id: 'nft-guru',
      name: 'NFT Guru',
      specialty: 'NFT Analytics',
      avatar: '🎨',
      description: 'Specializes in NFT market analysis and collection insights',
      status: 'online'
    },
    {
      id: 'smart-contract-dev',
      name: 'Smart Contract Dev',
      specialty: 'Development',
      avatar: '⚡',
      description: 'Helps with smart contract development and security',
      status: 'busy'
    },
    {
      id: 'dao-strategist',
      name: 'DAO Strategist',
      specialty: 'Governance',
      avatar: '🏛️',
      description: 'Expert in DAO governance and tokenomics',
      status: 'online'
    },
    {
      id: 'crypto-analyst',
      name: 'Crypto Analyst',
      specialty: 'Market Analysis',
      avatar: '📊',
      description: 'Provides technical analysis and market insights',
      status: 'offline'
    }
  ];

  useEffect(() => {
    if (!activeAgent) {
      setActiveAgent(aiAgents[0]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      let responseType: 'text' | 'code' | 'analysis' = 'text';

      // Simple keyword-based responses
      if (userMessage.toLowerCase().includes('defi') || userMessage.toLowerCase().includes('yield')) {
        response = "Based on current market conditions, here are some high-yield DeFi opportunities:\n\n• Compound USDC: 8.2% APY (Low Risk)\n• Aave ETH: 4.5% APY (Medium Risk)\n• Yearn vaults: 15-25% APY (High Risk)\n\nWould you like me to analyze any specific protocol?";
        responseType = 'analysis';
      } else if (userMessage.toLowerCase().includes('nft')) {
        response = "NFT market analysis shows:\n\n📈 Trending collections:\n• CyberPunks 2077: +12.5% floor price\n• Space Odyssey: -5.2% but high volume\n• Digital Genesis: +8.7% steady growth\n\nThe market is showing recovery signs. Would you like detailed analytics on any collection?";
        responseType = 'analysis';
      } else if (userMessage.toLowerCase().includes('code') || userMessage.toLowerCase().includes('smart contract')) {
        response = "Here's a basic ERC-20 token smart contract:\n\n```solidity\npragma solidity ^0.8.0;\n\ncontract MyToken {\n    mapping(address => uint256) balances;\n    string public name = \"MyToken\";\n    \n    function transfer(address to, uint256 amount) public {\n        require(balances[msg.sender] >= amount);\n        balances[msg.sender] -= amount;\n        balances[to] += amount;\n    }\n}\n```\n\nWould you like me to explain any part or add more functionality?";
        responseType = 'code';
      } else if (userMessage.toLowerCase().includes('dao') || userMessage.toLowerCase().includes('governance')) {
        response = "DAO governance best practices:\n\n🗳️ Voting mechanisms:\n• Token-weighted voting\n• Quadratic voting\n• Delegated voting\n\n📊 Proposal lifecycle:\n1. Discussion phase (7 days)\n2. Voting phase (5 days)\n3. Execution phase (3 days)\n\nCurrent active proposals in your DAOs need your attention!";
        responseType = 'analysis';
      } else {
        response = `I understand you're asking about "${userMessage}". As your Web3 AI assistant, I can help with:\n\n• DeFi strategy optimization\n• NFT market analysis\n• Smart contract development\n• DAO governance insights\n• Crypto trading signals\n\nWhat specific area would you like to dive into?`;
      }

      const aiMessage: Message = {
        id: messages.length + 1,
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        type: responseType
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'busy': return 'bg-amber-400';
      case 'offline': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* AI Agents Sidebar */}
      <Card className="glass-dark border-border/50 lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Bot" size={20} className="text-neon-violet" />
            AI Agents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiAgents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => setActiveAgent(agent)}
              className={`p-3 rounded-lg cursor-pointer transition-all border ${
                activeAgent?.id === agent.id 
                  ? 'bg-card/50 border-neon-violet/50' 
                  : 'border-transparent hover:bg-card/30 hover:border-border/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-2xl">{agent.avatar}</span>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(agent.status)} border-2 border-background`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{agent.name}</p>
                  <p className="text-xs text-neon-cyan">{agent.specialty}</p>
                  <p className="text-xs text-muted-foreground truncate">{agent.description}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="glass-dark border-border/50 lg:col-span-3 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeAgent?.avatar}</span>
              <div>
                <CardTitle className="text-lg">{activeAgent?.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{activeAgent?.specialty}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`${getStatusColor(activeAgent?.status || 'offline')} text-white border-none`}>
                {activeAgent?.status}
              </Badge>
              <Button size="sm" variant="ghost" className="icon-glow">
                <Icon name="Settings" size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-neon-violet to-neon-cyan text-white'
                    : 'bg-card/50 border border-border/30'
                }`}
              >
                {message.type === 'code' ? (
                  <div>
                    <pre className="bg-black/50 p-3 rounded text-xs overflow-x-auto">
                      <code>{message.text}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="whitespace-pre-line text-sm">
                    {message.text}
                  </div>
                )}
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card/50 border border-border/30 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-neon-violet rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-neon-violet rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-neon-violet rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about DeFi, NFTs, smart contracts..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-glow flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-neon-violet to-neon-cyan hover:opacity-90 icon-glow"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Button size="sm" variant="ghost" className="text-xs">
              DeFi Strategy
            </Button>
            <Button size="sm" variant="ghost" className="text-xs">
              NFT Analysis
            </Button>
            <Button size="sm" variant="ghost" className="text-xs">
              Smart Contracts
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;