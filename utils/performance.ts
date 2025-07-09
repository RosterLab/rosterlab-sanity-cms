/**
 * Performance utilities for optimizing third-party script loading
 */

/**
 * Load a script with requestIdleCallback for better performance
 */
export function loadScriptWhenIdle(src: string, options?: {
  timeout?: number;
  async?: boolean;
  defer?: boolean;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = options?.async ?? true;
    script.defer = options?.defer ?? true;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    const loadScript = () => {
      document.body.appendChild(script);
    };
    
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadScript, {
        timeout: options?.timeout ?? 2000
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(loadScript, 100);
    }
  });
}

/**
 * Preconnect to a domain for faster resource loading
 */
export function preconnectToDomain(domain: string): void {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = domain;
  document.head.appendChild(link);
}

/**
 * Preload a resource with specific type
 */
export function preloadResource(href: string, as: string, type?: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  if (as === 'font') link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

/**
 * Check if element is in viewport with custom margin
 */
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '100px',
    threshold: 0.01,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}