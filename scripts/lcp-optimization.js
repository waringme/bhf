// LCP Optimization for Content Fragment Images - COMMENTED OUT TO MATCH SKYDOTCOM APPROACH
/*
export class LCPOptimizer {
    constructor() {
        this.criticalImages = new Set();
        this.preloadedImages = new Set();
    }

    // Extract image URL from background-image style
    extractImageUrl(styleString) {
        if (!styleString) return null;
        const urlMatch = styleString.match(/url\(["']?([^"']+)["']?\)/);
        return urlMatch ? urlMatch[1] : null;
    }

    // Check if an element is likely to be the LCP element
    isLikelyLCP(element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Check if element is above the fold and reasonably large
        return rect.top < viewportHeight * 0.75 && 
               rect.width > viewportWidth * 0.5 && 
               rect.height > viewportHeight * 0.3;
    }

    // Preload critical images
    preloadImage(url, priority = 'high') {
        if (this.preloadedImages.has(url)) return;
        
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        link.setAttribute('fetchpriority', priority);
        
        // Add error handling
        link.addEventListener('error', () => {
            console.warn(`Failed to preload image: ${url}`);
        });
        
        document.head.appendChild(link);
        this.preloadedImages.add(url);
        
        console.log(`Preloaded critical image: ${url}`);
    }

    // Optimize content fragment for LCP
    optimizeContentFragment(block) {
        const bannerDetail = block.querySelector('.banner-detail');
        if (!bannerDetail) return;

        const backgroundImage = bannerDetail.style.backgroundImage;
        const imageUrl = this.extractImageUrl(backgroundImage);
        
        if (!imageUrl) return;

        // Check if this is likely to be the LCP element
        if (this.isLikelyLCP(bannerDetail)) {
            // Add to critical images set
            this.criticalImages.add(imageUrl);
            
            // Preload with high priority
            this.preloadImage(imageUrl, 'high');
            
            // Add fetchpriority attribute to the element
            bannerDetail.setAttribute('data-fetchpriority', 'high');
            bannerDetail.classList.add('lcp-optimized');
            
            console.log(`LCP optimization applied to: ${imageUrl}`);
        } else {
            // Preload with low priority for non-critical images
            this.preloadImage(imageUrl, 'low');
        }
    }

    // Optimize all content fragments on the page
    optimizeAllContentFragments() {
        const contentFragments = document.querySelectorAll('.content-fragment');
        
        contentFragments.forEach((block, index) => {
            // First content fragment is most likely to be LCP
            if (index === 0) {
                // Add a small delay to ensure DOM is ready
                setTimeout(() => {
                    this.optimizeContentFragment(block);
                }, 10);
            } else {
                this.optimizeContentFragment(block);
            }
        });
    }

    // Monitor for dynamically added content fragments
    observeContentFragments() {
        const observer = new MutationObserver((mutations) => {
            // Skip if Target is not ready to prevent interference
            if (!document.body.classList.contains('target-ready')) {
                return;
            }
            
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the added node is a content fragment
                        if (node.classList && node.classList.contains('content-fragment')) {
                            this.optimizeContentFragment(node);
                        }
                        
                        // Check for content fragments within the added node
                        const contentFragments = node.querySelectorAll && node.querySelectorAll('.content-fragment');
                        if (contentFragments) {
                            contentFragments.forEach(fragment => {
                                this.optimizeContentFragment(fragment);
                            });
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize LCP optimization
    init() {
        // Run immediately if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.optimizeAllContentFragments();
                this.observeContentFragments();
            });
        } else {
            this.optimizeAllContentFragments();
            this.observeContentFragments();
        }

        // Also run after a short delay to catch dynamically loaded content
        setTimeout(() => {
            this.optimizeAllContentFragments();
        }, 100);
    }

    // Get optimization statistics
    getStats() {
        return {
            criticalImages: this.criticalImages.size,
            preloadedImages: this.preloadedImages.size,
            criticalImageUrls: Array.from(this.criticalImages),
            preloadedImageUrls: Array.from(this.preloadedImages)
        };
    }
}

// Initialize LCP optimization
export function initLCPOptimization() {
    const lcpOptimizer = new LCPOptimizer();
    lcpOptimizer.init();
    
    // Make it available globally for debugging
    window.lcpOptimizer = lcpOptimizer;
    
    return lcpOptimizer;
}
*/

