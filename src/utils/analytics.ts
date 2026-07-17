// Privacy-focused analytics utility
// Uses simple, cookieless tracking with no personal data collection

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

interface PageView {
  path: string;
  title: string;
  referrer?: string;
}

// Legacy, non-standard Do Not Track properties not present in lib.dom.d.ts
interface LegacyDNT {
  doNotTrack?: string | null;
  msDoNotTrack?: string | null;
}

class Analytics {
  private isEnabled: boolean = false;
  private sessionId: string;
  
  constructor() {
    // Generate a simple session ID (not personally identifiable)
    this.sessionId = this.generateSessionId();
    
    // Check if analytics should be enabled (respect DNT header)
    this.isEnabled = !this.isDNTEnabled() && this.isProductionEnvironment();
  }

  private isDNTEnabled(): boolean {
    return navigator.doNotTrack === '1' ||
           (window as unknown as LegacyDNT).doNotTrack === '1' ||
           (navigator as LegacyDNT).msDoNotTrack === '1';
  }

  private isProductionEnvironment(): boolean {
    return window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1';
  }

  private generateSessionId(): string {
    // Simple random string, not tied to user identity
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  private async sendEvent(eventData: Record<string, unknown>): Promise<void> {
    if (!this.isEnabled) return;

    try {
      // Use a simple pixel tracking approach or fetch to a privacy-focused service
      // For now, we'll just log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', eventData);
      }
      
      // In production, you could send to a privacy-focused analytics service like:
      // - Simple Analytics
      // - Plausible
      // - Fathom
      // - Self-hosted solution
      
      // Example for a hypothetical privacy-focused endpoint:
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(eventData)
      // });
      
    } catch (error) {
      // Silently fail - analytics should never break the user experience
      console.debug('Analytics error:', error);
    }
  }

  // Track page views
  public trackPageView(pageData: PageView): void {
    this.sendEvent({
      type: 'pageview',
      session: this.sessionId,
      timestamp: new Date().toISOString(),
      page: {
        path: pageData.path,
        title: pageData.title,
        referrer: pageData.referrer || document.referrer,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`
      }
    });
  }

  // Track custom events
  public trackEvent(event: AnalyticsEvent): void {
    this.sendEvent({
      type: 'event',
      session: this.sessionId,
      timestamp: new Date().toISOString(),
      event: {
        name: event.name,
        properties: event.properties || {}
      }
    });
  }

  // Track interactions
  public trackInteraction(element: string, action: string, value?: string | number): void {
    this.trackEvent({
      name: 'interaction',
      properties: {
        element,
        action,
        value: value?.toString() || ''
      }
    });
  }

  // Track form submissions
  public trackFormSubmission(formName: string, success: boolean): void {
    this.trackEvent({
      name: 'form_submission',
      properties: {
        form: formName,
        success
      }
    });
  }

  // Track external link clicks
  public trackExternalLink(url: string, context?: string): void {
    this.trackEvent({
      name: 'external_link_click',
      properties: {
        url,
        context: context || 'unknown'
      }
    });
  }

  // Track publication interactions
  public trackPublicationView(publicationId: string, publicationTitle: string): void {
    this.trackEvent({
      name: 'publication_view',
      properties: {
        publication_id: publicationId,
        publication_title: publicationTitle
      }
    });
  }

  // Track video interactions
  public trackVideoInteraction(videoId: string, action: 'play' | 'pause' | 'complete'): void {
    this.trackEvent({
      name: 'video_interaction',
      properties: {
        video_id: videoId,
        action
      }
    });
  }
}

// Create singleton instance
const analytics = new Analytics();

// Export ready-to-use functions
export const trackPageView = (path: string, title: string, referrer?: string) => {
  analytics.trackPageView({ path, title, referrer });
};

export const trackEvent = (name: string, properties?: Record<string, string | number | boolean>) => {
  analytics.trackEvent({ name, properties });
};

export const trackInteraction = (element: string, action: string, value?: string | number) => {
  analytics.trackInteraction(element, action, value);
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  analytics.trackFormSubmission(formName, success);
};

export const trackExternalLink = (url: string, context?: string) => {
  analytics.trackExternalLink(url, context);
};

export const trackPublicationView = (publicationId: string, publicationTitle: string) => {
  analytics.trackPublicationView(publicationId, publicationTitle);
};

export const trackVideoInteraction = (videoId: string, action: 'play' | 'pause' | 'complete') => {
  analytics.trackVideoInteraction(videoId, action);
};

export default analytics;