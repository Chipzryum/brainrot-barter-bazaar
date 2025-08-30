import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { brainrots, rarityColors, formatPrice } from "@/lib/brainrots";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Trade {
  id: string;
  user_id: string;
  offering_item_id: string;
  wanting_item_id: string;
  is_visible: boolean;
  created_at: string;
}

interface TradeListProps {
  filters: {
    askingFor?: string;
    lookingFor?: string;
    rarity?: string;
  };
  refreshTrigger: number;
  currentUserId: string;
}

export const TradeList = ({ filters, refreshTrigger, currentUserId }: TradeListProps) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch trades from Supabase
  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('trades')
          .select('*')
          .eq('is_visible', true);

        // Apply filters
        if (filters.askingFor) {
          query = query.eq('wanting_item_id', filters.askingFor);
        }
        if (filters.lookingFor) {
          query = query.eq('offering_item_id', filters.lookingFor);
        }
        
        const { data, error } = await query
          .order('created_at', { ascending: false });

        if (error) throw error;

        let filteredTrades = data || [];

        // Apply rarity filter
        if (filters.rarity) {
          filteredTrades = filteredTrades.filter(trade => {
            const offering = brainrots.find(b => b.id === trade.offering_item_id);
            const wanting = brainrots.find(b => b.id === trade.wanting_item_id);
            return offering?.rarity === filters.rarity || wanting?.rarity === filters.rarity;
          });
        }

        setTrades(filteredTrades);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch trades",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, [filters, refreshTrigger, toast]);

  const handleDeleteTrade = async (tradeId: string) => {
    try {
      const { error } = await supabase
        .from('trades')
        .delete()
        .eq('id', tradeId);

      if (error) throw error;

      setTrades(prev => prev.filter(trade => trade.id !== tradeId));
      toast({
        title: "Trade deleted",
        description: "Your trade has been removed successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete trade. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleVisibility = async (tradeId: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from('trades')
        .update({ is_visible: !currentVisibility })
        .eq('id', tradeId);

      if (error) throw error;

      setTrades(prev => prev.map(trade => 
        trade.id === tradeId 
          ? { ...trade, is_visible: !currentVisibility }
          : trade
      ));
      toast({
        title: currentVisibility ? "Trade hidden" : "Trade made visible",
        description: `Your trade is now ${currentVisibility ? "hidden from" : "visible to"} other users.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update trade visibility. Please try again.",
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
        const offering = getBrainrotById(trade.offering_item_id);
        const wanting = getBrainrotById(trade.wanting_item_id);
        const isOwner = currentUserId === trade.user_id;
        const displayName = `User ${trade.user_id.slice(-8)}`;  // Show last 8 chars of user ID

        if (!offering || !wanting) return null;

        return (
          <Card key={trade.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    Trade by {displayName}
                  </CardTitle>
                  <CardDescription>
                    Created {new Date(trade.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                {isOwner && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleVisibility(trade.id, trade.is_visible)}
                    >
                      {trade.is_visible ? (
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