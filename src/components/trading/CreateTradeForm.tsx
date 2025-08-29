import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { brainrots, Brainrot } from "@/lib/brainrots";

interface CreateTradeFormProps {
  onTradeCreated: () => void;
}

export const CreateTradeForm = ({ onTradeCreated }: CreateTradeFormProps) => {
  const [offering, setOffering] = useState("");
  const [wanting, setWanting] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offering || !wanting) {
      toast({
        title: "Error",
        description: "Please select both items you're offering and wanting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Supabase database insert
      toast({
        title: "Trade created!",
        description: "Your trade has been successfully created.",
      });
      setOffering("");
      setWanting("");
      onTradeCreated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create trade. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Trade</CardTitle>
        <CardDescription>
          List what you want to trade and what you're looking for
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="offering">I'm offering</Label>
            <Select value={offering} onValueChange={setOffering}>
              <SelectTrigger>
                <SelectValue placeholder="Select a brainrot to offer" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {brainrots.map((brainrot) => (
                  <SelectItem key={brainrot.id} value={brainrot.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{brainrot.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({brainrot.rarity})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wanting">I want</Label>
            <Select value={wanting} onValueChange={setWanting}>
              <SelectTrigger>
                <SelectValue placeholder="Select a brainrot you want" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {brainrots.map((brainrot) => (
                  <SelectItem key={brainrot.id} value={brainrot.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{brainrot.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({brainrot.rarity})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="visible"
              checked={isVisible}
              onCheckedChange={setIsVisible}
            />
            <Label htmlFor="visible">Make trade visible to others</Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Trade"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};