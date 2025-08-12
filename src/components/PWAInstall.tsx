import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile (tablets and phones)
    const checkIsMobile = () => {
      const isMobileDevice = window.matchMedia('(max-width: 1024px)').matches;
      setIsMobile(isMobileDevice);
    };

    // Initial check
    checkIsMobile();

    // Listen for screen size changes
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    mediaQuery.addEventListener('change', checkIsMobile);

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;
    
    if (isStandalone || isIOSStandalone) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install banner after a delay (don't be too aggressive)
      setTimeout(() => {
        setShowInstallBanner(true);
      }, 30000); // 30 seconds
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', checkIsMobile);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const dismissBanner = () => {
    setShowInstallBanner(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed, dismissed this session, or on desktop
  if (isInstalled || !showInstallBanner || !isMobile || sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-background border border-border rounded-lg shadow-ocean p-4 animate-slide-up">
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-3">
            <h3 className="font-semibold text-primary mb-1">
              Install Portfolio App
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add this portfolio to your home screen for quick access and offline viewing.
            </p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                onClick={handleInstallClick}
                className="flex items-center"
              >
                <Download size={16} className="mr-2" />
                Install
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={dismissBanner}
              >
                Not now
              </Button>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={dismissBanner}
            className="p-1"
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstall;