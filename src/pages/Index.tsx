import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { CreateTradeForm } from "@/components/trading/CreateTradeForm";
import { TradeFilters } from "@/components/trading/TradeFilters";
import { TradeList } from "@/components/trading/TradeList";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [filters, setFilters] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Mock user ID - replace with actual auth
  const currentUserId = isAuthenticated ? "user1" : undefined;

  const handleTradeCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <LoginForm 
          onToggleMode={() => setIsLogin(!isLogin)}
          isLogin={isLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Steal a Brainrot Trading</h1>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Trades</TabsTrigger>
            <TabsTrigger value="create">Create Trade</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <TradeFilters onFiltersChange={setFilters} />
              </div>
              <div className="lg:col-span-3">
                <TradeList 
                  filters={filters} 
                  refreshTrigger={refreshTrigger}
                  currentUserId={currentUserId}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create">
            <div className="max-w-2xl mx-auto">
              <CreateTradeForm onTradeCreated={handleTradeCreated} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
