import React, { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LazyLoadWrapper } from "@/utils/lazyLoad";
import { serviceWorkerManager, useServiceWorkerUpdate } from "@/utils/serviceWorker";
import * as LazyRoutes from "@/routes/lazyRoutes";

// Import only non-lazy components
import { FAQPage } from "@/pages/faq";

// Service Worker Update Notification Component
function ServiceWorkerUpdateNotification() {
  const { updateAvailable, applyUpdate } = useServiceWorkerUpdate();
  
  if (!updateAvailable) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-[#0d0d33] text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-3">
        <div>
          <p className="font-semibold">Update Available</p>
          <p className="text-sm opacity-90">A new version of the app is ready</p>
        </div>
        <button
          onClick={applyUpdate}
          className="bg-white text-[#0d0d33] px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  );
}

function Router() {
  return (
    <LazyLoadWrapper>
      <Switch>
        <Route path="/" component={LazyRoutes.Home} />
        <Route path="/buy" component={LazyRoutes.Buy} />
        <Route path="/sell" component={LazyRoutes.Sell} />
        <Route path="/new-construction" component={LazyRoutes.NewConstruction} />
        <Route path="/first-time-buyers" component={LazyRoutes.FirstTimeBuyers} />
        <Route path="/home-affordability" component={LazyRoutes.HomeAffordability} />
        <Route path="/mortgage-calculator" component={LazyRoutes.MortgageCalculator} />
        <Route path="/savings-calculator" component={LazyRoutes.SavingsCalculator} />
        <Route path="/home-valuation" component={LazyRoutes.HomeValuation} />
        <Route path="/listing-process" component={LazyRoutes.ListingProcess} />
        <Route path="/pricing-strategy" component={LazyRoutes.PricingStrategy} />
        <Route path="/marketing-guide" component={LazyRoutes.MarketingGuide} />
        <Route path="/home-staging" component={LazyRoutes.HomeStaging} />
        <Route path="/market-analysis" component={LazyRoutes.MarketAnalysis} />
        <Route path="/selling-costs" component={LazyRoutes.SellingCosts} />
        <Route path="/fsbo-vs-agent" component={LazyRoutes.FsboVsAgent} />
        <Route path="/city-guides" component={LazyRoutes.CityGuides} />
        
        {/* Dallas County City Guides */}
        <Route path="/allen-city-guide" component={LazyRoutes.AllenCityGuide} />
        <Route path="/plano-city-guide" component={LazyRoutes.PlanoCityGuide} />
        <Route path="/frisco-city-guide" component={LazyRoutes.FriscoCityGuide} />
        <Route path="/mckinney-city-guide" component={LazyRoutes.McKinneyCityGuide} />
        <Route path="/prosper-city-guide" component={LazyRoutes.ProsperCityGuide} />
        <Route path="/celina-city-guide" component={LazyRoutes.CelinaCityGuide} />
        <Route path="/wylie-city-guide" component={LazyRoutes.WylieCityGuide} />
        <Route path="/highland-park-city-guide" component={LazyRoutes.HighlandParkCityGuide} />
        <Route path="/university-park-city-guide" component={LazyRoutes.UniversityParkCityGuide} />
        <Route path="/addison-city-guide" component={LazyRoutes.AddisonCityGuide} />
        <Route path="/richardson-city-guide" component={LazyRoutes.RichardsonCityGuide} />
        <Route path="/garland-city-guide" component={LazyRoutes.GarlandCityGuide} />
        <Route path="/carrollton-city-guide" component={LazyRoutes.CarrolltonCityGuide} />
        <Route path="/city-guides/coppell" component={LazyRoutes.CoppellCityGuide} />
        <Route path="/city-guides/the-colony" component={LazyRoutes.TheColonyCityGuide} />
        
        {/* Denton County City Guides */}
        <Route path="/city-guides/denton" component={LazyRoutes.DentonCityGuide} />
        <Route path="/city-guides/lewisville" component={LazyRoutes.LewisvilleCityGuide} />
        <Route path="/city-guides/flower-mound" component={LazyRoutes.FlowerMoundCityGuide} />
        <Route path="/city-guides/highland-village" component={LazyRoutes.HighlandVillageCityGuide} />
        <Route path="/city-guides/little-elm" component={LazyRoutes.LittleElmCityGuide} />
        <Route path="/city-guides/argyle" component={LazyRoutes.ArgyleCityGuide} />
        <Route path="/city-guides/corinth" component={LazyRoutes.CorinthCityGuide} />
        <Route path="/city-guides/aubrey" component={LazyRoutes.AubreyCityGuide} />
        
        {/* Tarrant County City Guides */}
        <Route path="/city-guides/fort-worth" component={LazyRoutes.FortWorthCityGuide} />
        <Route path="/city-guides/arlington" component={LazyRoutes.ArlingtonCityGuide} />
        <Route path="/city-guides/grapevine" component={LazyRoutes.GrapevineCityGuide} />
        <Route path="/city-guides/southlake" component={LazyRoutes.SouthlakeCityGuide} />
        <Route path="/city-guides/colleyville" component={LazyRoutes.ColleyvilleCityGuide} />
        <Route path="/city-guides/mansfield" component={LazyRoutes.MansfieldCityGuide} />
        <Route path="/city-guides/north-richland-hills" component={LazyRoutes.NorthRichlandHillsCityGuide} />
        <Route path="/city-guides/keller" component={LazyRoutes.KellerCityGuide} />
        
        {/* Other Pages */}
        <Route path="/faq" component={FAQPage} />
        <Route path="/about" component={LazyRoutes.About} />
        <Route path="/contact" component={LazyRoutes.Contact} />
        
        {/* Blog Pages */}
        <Route path="/blog" component={LazyRoutes.Blog} />
        <Route path="/blog/5-signs-time-to-sell-home-north-texas" component={LazyRoutes.BlogSignsToSell} />
        <Route path="/blog/first-time-home-buyer-guide-north-texas" component={LazyRoutes.BlogFirstTimeBuyer} />
        <Route path="/blog/2025-north-texas-housing-market-predictions" component={LazyRoutes.BlogPost2025Predictions} />
        <Route path="/blog/maximizing-rental-property-returns-property-manager-perspective" component={LazyRoutes.BlogRentalProperty} />
        <Route path="/blog/home-staging-secrets-that-actually-work" component={LazyRoutes.BlogHomeStaging} />
        <Route path="/blog/understanding-property-taxes-north-texas" component={LazyRoutes.BlogPropertyTaxes} />
        
        {/* Auth Pages */}
        <Route path="/login" component={LazyRoutes.Login} />
        <Route path="/admin-login" component={LazyRoutes.AdminLogin} />
        
        {/* 404 - Keep as last route */}
        <Route component={LazyRoutes.NotFound} />
      </Switch>
    </LazyLoadWrapper>
  );
}

function App() {
  // Initialize service worker and preload critical routes on mount
  useEffect(() => {
    // Initialize service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      serviceWorkerManager.register();
    }
    
    // Preload critical routes after initial load
    setTimeout(() => {
      LazyRoutes.preloadCriticalRoutes();
    }, 1000);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ServiceWorkerUpdateNotification />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
