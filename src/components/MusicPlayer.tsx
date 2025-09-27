import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  isPlaying?: boolean;
  waveform: number[];
}

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([80]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const testTracks: Track[] = [
    {
      id: 1,
      title: 'Cyberpunk Dreams',
      artist: 'Neon Synth',
      duration: '3:45',
      genre: 'Synthwave',
      waveform: Array.from({length: 50}, () => Math.random() * 100)
    },
    {
      id: 2,
      title: 'Digital Horizon',
      artist: 'Future Bass Collective',
      duration: '4:12',
      genre: 'Future Bass',
      waveform: Array.from({length: 50}, () => Math.random() * 100)
    },
    {
      id: 3,
      title: 'Blockchain Beats',
      artist: 'Crypto Waves',
      duration: '3:28',
      genre: 'Electronic',
      waveform: Array.from({length: 50}, () => Math.random() * 100)
    },
    {
      id: 4,
      title: 'Virtual Reality',
      artist: 'Meta Sounds',
      duration: '5:03',
      genre: 'Ambient',
      waveform: Array.from({length: 50}, () => Math.random() * 100)
    },
    {
      id: 5,
      title: 'Web3 Anthem',
      artist: 'Decentralized Orchestra',
      duration: '4:35',
      genre: 'Tech House',
      waveform: Array.from({length: 50}, () => Math.random() * 100)
    }
  ];

  useEffect(() => {
    if (!currentTrack) {
      setCurrentTrack(testTracks[0]);
    }
  }, []);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = testTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % testTracks.length;
    setCurrentTrack(testTracks[nextIndex]);
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = testTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? testTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(testTracks[prevIndex]);
  };

  // Simulate time progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const duration = 240; // 4 minutes in seconds
          if (prev >= duration) {
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Main Player */}
      <Card className="glass-dark border-border/50 glow-on-hover">
        <CardContent className="p-6">
          {currentTrack && (
            <div className="space-y-4">
              {/* Track Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-neon-violet to-neon-cyan rounded-lg flex items-center justify-center animate-glow">
                  <Icon name="Music" size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gradient">{currentTrack.title}</h3>
                  <p className="text-muted-foreground">{currentTrack.artist}</p>
                  <p className="text-xs text-neon-cyan">{currentTrack.genre}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {formatTime(currentTime)} / {currentTrack.duration}
                  </p>
                </div>
              </div>

              {/* Waveform Visualization */}
              <div className="flex items-center gap-1 h-12 py-2">
                {currentTrack.waveform.map((height, index) => (
                  <div
                    key={index}
                    className={`w-1 bg-gradient-to-t transition-all ${
                      index < (currentTime / 240) * 50 
                        ? 'from-neon-violet to-neon-cyan' 
                        : 'from-muted/30 to-muted/50'
                    }`}
                    style={{ height: `${Math.max(height * 0.4, 8)}px` }}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <Progress value={(currentTime / 240) * 100} className="h-1" />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`icon-glow ${isShuffled ? 'text-neon-cyan' : ''}`}
                >
                  <Icon name="Shuffle" size={16} />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={prevTrack}
                  className="icon-glow"
                >
                  <Icon name="SkipBack" size={20} />
                </Button>
                
                <Button
                  size="lg"
                  onClick={togglePlay}
                  className="bg-gradient-to-r from-neon-violet to-neon-cyan hover:opacity-90 shadow-neon icon-glow w-12 h-12 rounded-full"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={nextTrack}
                  className="icon-glow"
                >
                  <Icon name="SkipForward" size={20} />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setRepeatMode(
                    repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off'
                  )}
                  className={`icon-glow ${repeatMode !== 'off' ? 'text-neon-cyan' : ''}`}
                >
                  <Icon name={repeatMode === 'one' ? "Repeat1" : "Repeat"} size={16} />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <Icon name="Volume2" size={16} className="text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8">{volume[0]}%</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Playlist */}
      <Card className="glass-dark border-border/50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="ListMusic" size={20} className="text-neon-violet" />
            Now Playing Queue
          </h3>
          <div className="space-y-2">
            {testTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => playTrack(track)}
                className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-card/50 border border-transparent hover:border-neon-violet/30 ${
                  currentTrack?.id === track.id ? 'bg-card/50 border-neon-violet/50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-neon-violet to-neon-cyan rounded flex items-center justify-center">
                      {currentTrack?.id === track.id && isPlaying ? (
                        <div className="music-wave w-3 h-3 rounded-full" />
                      ) : (
                        <Icon name="Music" size={12} className="text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{track.title}</p>
                      <p className="text-xs text-muted-foreground">{track.artist}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{track.duration}</p>
                    <p className="text-xs text-neon-cyan">{track.genre}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MusicPlayer;