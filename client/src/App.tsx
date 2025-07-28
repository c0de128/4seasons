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
