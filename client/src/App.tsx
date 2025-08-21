import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Buy from "@/pages/buy";
import Sell from "@/pages/sell";
import PropertyManagement from "@/pages/property-management";
import HomeValuation from "@/pages/home-valuation";
import CityGuides from "@/pages/city-guides";
import AllenCityGuide from "@/pages/allen-city-guide";
import PlanoCityGuide from "@/pages/plano-city-guide";
import FriscoCityGuide from "@/pages/frisco-city-guide";
import McKinneyCityGuide from "@/pages/mckinney-city-guide";
import ProsperCityGuide from "@/pages/prosper-city-guide";
import CelinaCityGuide from "@/pages/celina-city-guide";
import WylieCityGuide from "@/pages/wylie-city-guide";
import HighlandParkCityGuide from "@/pages/highland-park-city-guide";
import UniversityParkCityGuide from "@/pages/university-park-city-guide";
import AddisonCityGuide from "@/pages/addison-city-guide";
import RichardsonCityGuide from "@/pages/richardson-city-guide";
import GarlandCityGuide from "@/pages/garland-city-guide";
import CarrolltonCityGuide from "@/pages/carrollton-city-guide";
import DentonCityGuide from "@/pages/city-guides/denton";
import LewisvilleCityGuide from "@/pages/city-guides/lewisville";
import FlowerMoundCityGuide from "@/pages/city-guides/flower-mound";
import HighlandVillageCityGuide from "@/pages/city-guides/highland-village";
import LittleElmCityGuide from "@/pages/city-guides/little-elm";
import ArgyleCityGuide from "@/pages/city-guides/argyle";
import CorinthCityGuide from "@/pages/city-guides/corinth";
import AubreyCityGuide from "@/pages/city-guides/aubrey";
import FortWorthCityGuide from "@/pages/city-guides/fort-worth";
import ArlingtonCityGuide from "@/pages/city-guides/arlington";
import GrapevineCityGuide from "@/pages/city-guides/grapevine";
import SouthlakeCityGuide from "@/pages/city-guides/southlake";
import ColleyvilleCityGuide from "@/pages/city-guides/colleyville";
import MansfieldCityGuide from "@/pages/city-guides/mansfield";
import NorthRichlandHillsCityGuide from "@/pages/city-guides/north-richland-hills";
import KellerCityGuide from "@/pages/city-guides/keller";
import CoppellCityGuide from "@/pages/city-guides/coppell";
import TheColonyCityGuide from "@/pages/city-guides/the-colony";
import { FAQPage } from "@/pages/faq";
import About from "@/pages/about";
import ContactPage from "@/pages/contact";
import BlogPage from "@/pages/blog";
import FiveSignsTimeToSellBlogPost from "@/pages/blog/5-signs-time-to-sell-home-north-texas";
import { FirstTimeBuyerGuide } from "@/pages/blog/first-time-home-buyer-guide-north-texas";
import { NorthTexasMarketPredictions2025 } from "@/pages/blog/2025-north-texas-housing-market-predictions";
import { MaximizingRentalPropertyReturns } from "@/pages/blog/maximizing-rental-property-returns-property-manager-perspective";
import { HomeStagingSecrets } from "@/pages/blog/home-staging-secrets-that-actually-work";
import { UnderstandingPropertyTaxesNorthTexas } from "@/pages/blog/understanding-property-taxes-north-texas";
import Login from "@/pages/login";
import AdminLogin from "@/pages/admin-login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/buy" component={Buy} />
      <Route path="/sell" component={Sell} />
      <Route path="/property-management" component={PropertyManagement} />
      <Route path="/home-valuation" component={HomeValuation} />
      <Route path="/city-guides" component={CityGuides} />
      <Route path="/allen-city-guide" component={AllenCityGuide} />
      <Route path="/plano-city-guide" component={PlanoCityGuide} />
      <Route path="/frisco-city-guide" component={FriscoCityGuide} />
      <Route path="/mckinney-city-guide" component={McKinneyCityGuide} />
      <Route path="/prosper-city-guide" component={ProsperCityGuide} />
      <Route path="/celina-city-guide" component={CelinaCityGuide} />
      <Route path="/wylie-city-guide" component={WylieCityGuide} />
      <Route path="/highland-park-city-guide" component={HighlandParkCityGuide} />
      <Route path="/university-park-city-guide" component={UniversityParkCityGuide} />
      <Route path="/addison-city-guide" component={AddisonCityGuide} />
      <Route path="/richardson-city-guide" component={RichardsonCityGuide} />
      <Route path="/garland-city-guide" component={GarlandCityGuide} />
      <Route path="/carrollton-city-guide" component={CarrolltonCityGuide} />
      <Route path="/city-guides/denton" component={DentonCityGuide} />
      <Route path="/city-guides/lewisville" component={LewisvilleCityGuide} />
      <Route path="/city-guides/flower-mound" component={FlowerMoundCityGuide} />
      <Route path="/city-guides/highland-village" component={HighlandVillageCityGuide} />
      <Route path="/city-guides/little-elm" component={LittleElmCityGuide} />
      <Route path="/city-guides/argyle" component={ArgyleCityGuide} />
      <Route path="/city-guides/corinth" component={CorinthCityGuide} />
      <Route path="/city-guides/aubrey" component={AubreyCityGuide} />
      <Route path="/city-guides/fort-worth" component={FortWorthCityGuide} />
      <Route path="/city-guides/arlington" component={ArlingtonCityGuide} />
      <Route path="/city-guides/grapevine" component={GrapevineCityGuide} />
      <Route path="/city-guides/southlake" component={SouthlakeCityGuide} />
      <Route path="/city-guides/colleyville" component={ColleyvilleCityGuide} />
      <Route path="/city-guides/mansfield" component={MansfieldCityGuide} />
      <Route path="/city-guides/north-richland-hills" component={NorthRichlandHillsCityGuide} />
      <Route path="/city-guides/keller" component={KellerCityGuide} />
      <Route path="/city-guides/coppell" component={CoppellCityGuide} />
      <Route path="/city-guides/the-colony" component={TheColonyCityGuide} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/5-signs-time-to-sell-home-north-texas" component={FiveSignsTimeToSellBlogPost} />
      <Route path="/blog/first-time-home-buyer-guide-north-texas" component={FirstTimeBuyerGuide} />
      <Route path="/blog/2025-north-texas-housing-market-predictions" component={NorthTexasMarketPredictions2025} />
      <Route path="/blog/maximizing-rental-property-returns-property-manager-perspective" component={MaximizingRentalPropertyReturns} />
      <Route path="/blog/home-staging-secrets-that-actually-work" component={HomeStagingSecrets} />
      <Route path="/blog/understanding-property-taxes-north-texas" component={UnderstandingPropertyTaxesNorthTexas} />
      <Route path="/login" component={Login} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
