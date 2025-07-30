import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { Shield, Building, Home } from "lucide-react";

export default function Login() {
  const [selectedLoginType, setSelectedLoginType] = useState<string | null>(null);

  const loginTypes = [
    {
      id: "admin",
      title: "Administrative Login",
      description: "For 4Seasons Real Estate staff and administrators",
      icon: Shield,
      bgColor: "bg-slate-50",
      iconColor: "#0d0d33"
    },
    {
      id: "property",
      title: "Property Management Login",
      description: "For property managers and landlords",
      icon: Building,
      bgColor: "bg-slate-50",
      iconColor: "#0d0d33"
    },
    {
      id: "tenant",
      title: "Tenant Login",
      description: "For tenants and residents",
      icon: Home,
      bgColor: "bg-slate-50",
      iconColor: "#0d0d33"
    }
  ];

  const handleLoginTypeSelect = (type: string) => {
    setSelectedLoginType(type);
  };

  const handleBackToSelection = () => {
    setSelectedLoginType(null);
  };

  const renderLoginForm = (type: any) => {
    return (
      <div className="max-w-md mx-auto">
        <Card className="shadow-xl border border-slate-200">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: type.iconColor }}>
                <type.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">{type.title}</CardTitle>
            <p className="text-slate-600 mt-2">{type.description}</p>
          </CardHeader>
          <CardContent className="p-8">
            <form className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
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
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBackToSelection}
                  className="text-sm text-slate-600 hover:text-slate-900 underline"
                >
                  ← Back to login options
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
<section className="pt-32 pb-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Login Type
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select the appropriate login option based on your role and access needs.
            </p>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!selectedLoginType ? (
            // Login Type Selection
            <div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {loginTypes.map((type) => (
                  <Card 
                    key={type.id}
                    className="shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 h-full"
                    onClick={() => handleLoginTypeSelect(type.id)}
                  >
                    <CardContent className={`p-8 text-center ${type.bgColor} rounded-lg h-full flex flex-col`}>
                      <div className="flex justify-center mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: type.iconColor }}>
                          <type.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{type.title}</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed flex-grow">{type.description}</p>
                      <Button 
                        className="w-full py-3 text-lg font-semibold text-white hover:opacity-90 mt-auto"
                        style={{ backgroundColor: '#0d0d33' }}
                      >
                        Continue
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Login Form
            <div>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Sign In to Your Account
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Enter your credentials to access your dashboard.
                </p>
              </div>

              {renderLoginForm(loginTypes.find(type => type.id === selectedLoginType))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}