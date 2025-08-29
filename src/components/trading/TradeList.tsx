import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { brainrots, rarityColors, formatPrice } from "@/lib/brainrots";
import { Trash2, Eye, EyeOff } from "lucide-react";

interface Trade {
  id: string;
  userId: string;
  userEmail: string;
  offeringId: string;
  wantingId: string;
  isVisible: boolean;
  createdAt: string;
}

interface TradeListProps {
  filters: {
    askingFor?: string;
    lookingFor?: string;
    rarity?: string;
  };
  refreshTrigger: number;
  currentUserId?: string;
}

export const TradeList = ({ filters, refreshTrigger, currentUserId }: TradeListProps) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for now - replace with Supabase query
  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
      // TODO: Replace with actual Supabase query
      const mockTrades: Trade[] = [
        {
          id: "1",
          userId: "user1",
          userEmail: "trader1@example.com",
          offeringId: "1", // Noobini Pizzanini
          wantingId: "16", // Cappuccino Assassino
          isVisible: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "2",
          userId: "user2",
          userEmail: "trader2@example.com",
          offeringId: "44", // Coco Elefanto
          wantingId: "58", // La Vacca Staturno Saturnita
          isVisible: true,
          createdAt: new Date().toISOString()
        }
      ];
      
      let filteredTrades = mockTrades.filter(trade => trade.isVisible);
      
      // Apply filters
      if (filters.askingFor) {
        filteredTrades = filteredTrades.filter(trade => trade.wantingId === filters.askingFor);
      }
      if (filters.lookingFor) {
        filteredTrades = filteredTrades.filter(trade => trade.offeringId === filters.lookingFor);
      }
      if (filters.rarity) {
        filteredTrades = filteredTrades.filter(trade => {
          const offering = brainrots.find(b => b.id === trade.offeringId);
          const wanting = brainrots.find(b => b.id === trade.wantingId);
          return offering?.rarity === filters.rarity || wanting?.rarity === filters.rarity;
        });
      }
      
      setTrades(filteredTrades);
      setLoading(false);
    };

    fetchTrades();
  }, [filters, refreshTrigger]);

  const handleDeleteTrade = async (tradeId: string) => {
    try {
      // TODO: Implement Supabase delete
      setTrades(prev => prev.filter(trade => trade.id !== tradeId));
      toast({
        title: "Trade deleted",
        description: "Your trade has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete trade. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleVisibility = async (tradeId: string, currentVisibility: boolean) => {
    try {
      // TODO: Implement Supabase update
      setTrades(prev => prev.map(trade => 
        trade.id === tradeId 
          ? { ...trade, isVisible: !currentVisibility }
          : trade
      ));
      toast({
        title: currentVisibility ? "Trade hidden" : "Trade made visible",
        description: `Your trade is now ${currentVisibility ? "hidden from" : "visible to"} other users.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update trade visibility. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getBrainrotById = (id: string) => {
    return brainrots.find(b => b.id === id);
  };

  if (loading) {
    return <div className="text-center py-8">Loading trades...</div>;
  }

  if (trades.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <CardDescription>
            No trades found matching your filters. Try adjusting your search criteria.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {trades.map((trade) => {
        const offering = getBrainrotById(trade.offeringId);
        const wanting = getBrainrotById(trade.wantingId);
        const isOwner = currentUserId === trade.userId;

        if (!offering || !wanting) return null;

        return (
          <Card key={trade.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    Trade by {trade.userEmail}
                  </CardTitle>
                  <CardDescription>
                    Created {new Date(trade.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                {isOwner && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleVisibility(trade.id, trade.isVisible)}
                    >
                      {trade.isVisible ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          Show
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteTrade(trade.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">Offering:</h4>
                  <div className="p-3 border rounded-lg bg-muted/50">
                    <div className="font-medium">{offering.name}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant="outline"
                        style={{ 
                          borderColor: rarityColors[offering.rarity],
                          color: rarityColors[offering.rarity]
                        }}
                      >
                        {offering.rarity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Value: {formatPrice(offering.purchasePrice)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">Wants:</h4>
                  <div className="p-3 border rounded-lg bg-muted/50">
                    <div className="font-medium">{wanting.name}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant="outline"
                        style={{ 
                          borderColor: rarityColors[wanting.rarity],
                          color: rarityColors[wanting.rarity]
                        }}
                      >
                        {wanting.rarity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Value: {formatPrice(wanting.purchasePrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {!isOwner && (
                <div className="mt-4 pt-4 border-t">
                  <Button className="w-full">
                    Contact Trader
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};