import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { Shield, Building, Home } from "lucide-react";

export default function Login() {
  const [selectedLoginType, setSelectedLoginType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginTypes = [
    {
      id: "admin",
      title: "Administrative Login",
      description: "For 4Seasons Real Estate staff and administrators",
      icon: Shield,
      iconColor: "#0d0d33"
    },
    {
      id: "property",
      title: "Property Management Login", 
      description: "For property managers and landlords",
      icon: Building,
      iconColor: "#0d0d33"
    },
    {
      id: "tenant",
      title: "Tenant Login",
      description: "For tenants and residents",
      icon: Home,
      iconColor: "#0d0d33"
    }
  ];

  const handleContinue = () => {
    if (selectedLoginType === 'tenant' || selectedLoginType === 'property') {
      window.open('https://signin.managebuilding.com/Resident/portal/global-login', '_blank');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLoginType) {
      alert("Please select a login type");
      return;
    }

    // Route to admin login
    if (selectedLoginType === 'admin') {
      window.location.href = '/admin-login';
    }
  };

  const getSelectedLoginInfo = () => {
    return loginTypes.find(type => type.id === selectedLoginType);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Sign In to Your Account
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Enter your credentials and select your login type to access your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border border-slate-200">
              <CardHeader className="text-center pb-6">
                {selectedLoginType && getSelectedLoginInfo() && (
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: getSelectedLoginInfo()?.iconColor }}>
                      {(() => {
                        const IconComponent = getSelectedLoginInfo()!.icon;
                        return <IconComponent className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                  </div>
                )}
                <CardTitle className="text-2xl font-bold text-slate-900">
                  {selectedLoginType ? getSelectedLoginInfo()?.title : "Login"}
                </CardTitle>
                {selectedLoginType && (
                  <p className="text-slate-600 mt-2">{getSelectedLoginInfo()?.description}</p>
                )}
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="loginType" className="text-sm font-medium text-slate-700 mb-2 block">
                      Login Type
                    </Label>
                    <Select value={selectedLoginType} onValueChange={setSelectedLoginType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your login type" />
                      </SelectTrigger>
                      <SelectContent>
                        {loginTypes.map((type) => (
                          <SelectItem 
                            key={type.id} 
                            value={type.id}
                            className="focus:bg-[#0d0d33] focus:text-white hover:bg-[#0d0d33] hover:text-white data-[highlighted]:bg-[#0d0d33] data-[highlighted]:text-white"
                          >
                            <div className="flex items-center space-x-2">
                              <type.icon className="w-4 h-4" />
                              <span>{type.title}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Show Continue button for tenant/property management */}
                  {(selectedLoginType === 'tenant' || selectedLoginType === 'property') && (
                    <Button 
                      onClick={handleContinue}
                      className="w-full py-3 text-lg font-semibold text-white hover:opacity-90"
                      style={{ backgroundColor: '#0d0d33' }}
                    >
                      Continue
                    </Button>
                  )}
                  
                  {/* Show admin login form */}
                  {selectedLoginType === 'admin' && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="password" className="text-sm font-medium text-slate-700 mb-2 block">
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full py-3 text-lg font-semibold text-white hover:opacity-90"
                        style={{ backgroundColor: '#0d0d33' }}
                      >
                        Sign In
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}