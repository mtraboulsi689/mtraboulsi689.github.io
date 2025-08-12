import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Maximize, ExternalLink, Calendar, User, BookOpen } from 'lucide-react';

const Spotlight = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    const video = document.getElementById('spotlight-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    const video = document.getElementById('spotlight-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    const video = document.getElementById('spotlight-video') as HTMLVideoElement;
    if (video && video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <section id="spotlight" className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      <div className="container mx-auto px-4">
        {/* Spotlight Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen size={16} />
            <span>Research Spotlight</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            Latest Research
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch an in-depth explanation of our latest coastal modeling research and 
            the development of the LX-ST coupled model for shoreline evolution prediction.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card className="shadow-ocean hover:shadow-coastal transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      id="spotlight-video"
                      className="w-full h-auto"
                      poster="/placeholder.svg"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onVolumeChange={(e) => setIsMuted((e.target as HTMLVideoElement).muted)}
                      controls={false}
                    >
                      <source src="/lxst_explainer.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Custom Video Controls Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center space-x-3">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={handlePlayPause}
                            className="bg-white/90 hover:bg-white text-black"
                          >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleMuteToggle}
                            className="bg-white/90 hover:bg-white text-black"
                          >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={handleFullscreen}
                          className="bg-white/90 hover:bg-white text-black"
                        >
                          <Maximize size={16} />
                        </Button>
                      </div>
                    </div>

                    {/* Play Overlay for Initial State */}
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Button
                          onClick={handlePlayPause}
                          size="lg"
                          className="bg-accent hover:bg-accent-light text-accent-foreground rounded-full w-16 h-16 p-0"
                        >
                          <Play size={24} className="ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Article Information */}
            <div className="space-y-6">
              <Card className="shadow-coastal hover:shadow-ocean transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    LX-ST Coupled Model Development
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Calendar size={16} />
                      <span>December 2024</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <User size={16} />
                      <span>Mohammad Traboulsi</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    This video provides a comprehensive explanation of the LX-ST coupled model 
                    development for simulating long-term shoreline morphological evolution under 
                    climate change scenarios. Learn about the integration of longitudinal and 
                    cross-shore sediment transport mechanisms.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Key Topics Covered:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="text-accent mt-1">•</span>
                        <span>LX-ST model architecture and coupling methodology</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Multi-scenario climate impact simulations (SSP2-4.5, SSP5-8.5)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Application to Lacanau site with sensitivity analysis</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Sediment transport integration and validation results</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Related Actions */}
              <Card className="shadow-coastal">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-primary mb-4">Related Resources</h4>
                  
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <BookOpen size={16} className="mr-2" />
                      View Full Publication
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      See Related Work at BRGM
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Research Impact */}
              <Card className="shadow-coastal bg-gradient-to-br from-accent/5 to-primary/5">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-primary mb-4">Research Impact</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-accent mb-1">5km</div>
                      <div className="text-xs text-muted-foreground">Lacanau Site Coverage</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent mb-1">3</div>
                      <div className="text-xs text-muted-foreground">Climate Scenarios</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent mb-1">2100</div>
                      <div className="text-xs text-muted-foreground">Projection Year</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent mb-1">BRGM</div>
                      <div className="text-xs text-muted-foreground">Research Institution</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;