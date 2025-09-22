import { createLazyRoute, preloadComponent } from '@/utils/lazyLoad';

// Main pages - high priority
export const Home = createLazyRoute(() => import('@/pages/home'));
export const About = createLazyRoute(() => import('@/pages/about'));
export const Contact = createLazyRoute(() => import('@/pages/contact'));

// Service pages - medium priority
export const Buy = createLazyRoute(() => import('@/pages/buy'));
export const Sell = createLazyRoute(() => import('@/pages/sell'));
export const NewConstruction = createLazyRoute(() => import('@/pages/new-construction'));
export const CityGuides = createLazyRoute(() => import('@/pages/city-guides'));

// City guide pages - lazy loaded on demand
export const AllenCityGuide = createLazyRoute(() => import('@/pages/allen-city-guide'));
export const PlanoCityGuide = createLazyRoute(() => import('@/pages/plano-city-guide'));
export const FriscoCityGuide = createLazyRoute(() => import('@/pages/frisco-city-guide'));
export const McKinneyCityGuide = createLazyRoute(() => import('@/pages/mckinney-city-guide'));
export const RichardsonCityGuide = createLazyRoute(() => import('@/pages/richardson-city-guide'));
export const CarrolltonCityGuide = createLazyRoute(() => import('@/pages/carrollton-city-guide'));
export const ProsperCityGuide = createLazyRoute(() => import('@/pages/prosper-city-guide'));
export const CelinaCityGuide = createLazyRoute(() => import('@/pages/celina-city-guide'));
export const WylieCityGuide = createLazyRoute(() => import('@/pages/wylie-city-guide'));
export const HighlandParkCityGuide = createLazyRoute(() => import('@/pages/highland-park-city-guide'));
export const UniversityParkCityGuide = createLazyRoute(() => import('@/pages/university-park-city-guide'));
export const AddisonCityGuide = createLazyRoute(() => import('@/pages/addison-city-guide'));
export const GarlandCityGuide = createLazyRoute(() => import('@/pages/garland-city-guide'));

// Denton County city guides
export const DentonCityGuide = createLazyRoute(() => import('@/pages/city-guides/denton'));
export const LewisvilleCityGuide = createLazyRoute(() => import('@/pages/city-guides/lewisville'));
export const FlowerMoundCityGuide = createLazyRoute(() => import('@/pages/city-guides/flower-mound'));
export const HighlandVillageCityGuide = createLazyRoute(() => import('@/pages/city-guides/highland-village'));
export const LittleElmCityGuide = createLazyRoute(() => import('@/pages/city-guides/little-elm'));
export const ArgyleCityGuide = createLazyRoute(() => import('@/pages/city-guides/argyle'));
export const CorinthCityGuide = createLazyRoute(() => import('@/pages/city-guides/corinth'));
export const AubreyCityGuide = createLazyRoute(() => import('@/pages/city-guides/aubrey'));

// Tarrant County city guides
export const FortWorthCityGuide = createLazyRoute(() => import('@/pages/city-guides/fort-worth'));
export const ArlingtonCityGuide = createLazyRoute(() => import('@/pages/city-guides/arlington'));
export const GrapevineCityGuide = createLazyRoute(() => import('@/pages/city-guides/grapevine'));
export const SouthlakeCityGuide = createLazyRoute(() => import('@/pages/city-guides/southlake'));
export const ColleyvilleCityGuide = createLazyRoute(() => import('@/pages/city-guides/colleyville'));
export const MansfieldCityGuide = createLazyRoute(() => import('@/pages/city-guides/mansfield'));
export const NorthRichlandHillsCityGuide = createLazyRoute(() => import('@/pages/city-guides/north-richland-hills'));
export const KellerCityGuide = createLazyRoute(() => import('@/pages/city-guides/keller'));

// Dallas County additional
export const CoppellCityGuide = createLazyRoute(() => import('@/pages/city-guides/coppell'));
export const TheColonyCityGuide = createLazyRoute(() => import('@/pages/city-guides/the-colony'));

// Blog pages - lowest priority
export const Blog = createLazyRoute(() => import('@/pages/blog'));
export const BlogPost2025Predictions = createLazyRoute(() => import('@/pages/blog/2025-north-texas-housing-market-predictions'));
export const BlogFirstTimeBuyer = createLazyRoute(() => import('@/pages/blog/first-time-home-buyer-guide-north-texas'));
export const BlogRentalProperty = createLazyRoute(() => import('@/pages/blog/maximizing-rental-property-returns-property-manager-perspective'));
export const BlogPropertyTaxes = createLazyRoute(() => import('@/pages/blog/understanding-property-taxes-north-texas'));
export const BlogHomeStaging = createLazyRoute(() => import('@/pages/blog/home-staging-secrets-that-actually-work'));
export const BlogSignsToSell = createLazyRoute(() => import('@/pages/blog/5-signs-time-to-sell-home-north-texas'));

// Admin pages - secure and lazy
export const AdminLogin = createLazyRoute(() => import('@/pages/admin-login'));
export const Login = createLazyRoute(() => import('@/pages/login'));

// Special pages
export const HomeValuation = createLazyRoute(() => import('@/pages/home-valuation'));
export const ListingProcess = createLazyRoute(() => import('@/pages/listing-process'));
export const PricingStrategy = createLazyRoute(() => import('@/pages/pricing-strategy'));
export const MarketingGuide = createLazyRoute(() => import('@/pages/marketing-guide'));
export const HomeStaging = createLazyRoute(() => import('@/pages/home-staging'));
export const MarketAnalysis = createLazyRoute(() => import('@/pages/market-analysis'));
export const SellingCosts = createLazyRoute(() => import('@/pages/selling-costs'));
export const FsboVsAgent = createLazyRoute(() => import('@/pages/fsbo-vs-agent'));
export const PropertyManagement = createLazyRoute(() => import('@/pages/property-management'));
export const FirstTimeBuyers = createLazyRoute(() => import('@/pages/first-time-buyers'));
export const HomeAffordability = createLazyRoute(() => import('@/pages/home-affordability'));
export const MortgageCalculator = createLazyRoute(() => import('@/pages/mortgage-calculator'));
export const SavingsCalculator = createLazyRoute(() => import('@/pages/savings-calculator'));
export const NotFound = createLazyRoute(() => import('@/pages/404'));

// Preload critical routes on app initialization
export function preloadCriticalRoutes() {
  // Preload most commonly accessed pages
  preloadComponent(() => import('@/pages/home'));
  preloadComponent(() => import('@/pages/city-guides'));
  
  // Preload popular city guides based on user behavior
  setTimeout(() => {
    preloadComponent(() => import('@/pages/allen-city-guide'));
    preloadComponent(() => import('@/pages/plano-city-guide'));
    preloadComponent(() => import('@/pages/frisco-city-guide'));
  }, 2000);
}

// Smart preloading based on user interaction
export function preloadOnHover(routeName: string) {
  const preloadMap: Record<string, () => Promise<any>> = {
    'allen': () => import('@/pages/allen-city-guide'),
    'plano': () => import('@/pages/plano-city-guide'),
    'frisco': () => import('@/pages/frisco-city-guide'),
    'mckinney': () => import('@/pages/mckinney-city-guide'),
    'richardson': () => import('@/pages/richardson-city-guide'),
    'blog': () => import('@/pages/blog'),
    'about': () => import('@/pages/about'),
    'contact': () => import('@/pages/contact'),
    'buy': () => import('@/pages/buy'),
    'sell': () => import('@/pages/sell'),
    'new-construction': () => import('@/pages/new-construction'),
  };

  const preloadFunc = preloadMap[routeName];
  if (preloadFunc) {
    preloadComponent(preloadFunc);
  }
}