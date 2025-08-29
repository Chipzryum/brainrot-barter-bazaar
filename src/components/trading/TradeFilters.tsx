import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { brainrots, Brainrot } from "@/lib/brainrots";

interface TradeFiltersProps {
  onFiltersChange: (filters: {
    askingFor?: string;
    lookingFor?: string;
    rarity?: Brainrot['rarity'];
  }) => void;
}

export const TradeFilters = ({ onFiltersChange }: TradeFiltersProps) => {
  const [askingFor, setAskingFor] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [rarity, setRarity] = useState<Brainrot['rarity'] | "">("");

  const rarities: Brainrot['rarity'][] = [
    'Common', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Mythic Lucky', 
    'Brainrot God', 'Brainrot God Lucky', 'Secret', 'Secret Lucky'
  ];

  const handleApplyFilters = () => {
    onFiltersChange({
      askingFor: askingFor || undefined,
      lookingFor: lookingFor || undefined,
      rarity: rarity || undefined,
    });
  };

  const handleClearFilters = () => {
    setAskingFor("");
    setLookingFor("");
    setRarity("");
    onFiltersChange({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Trades</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Asking for (what they want)</Label>
          <Select value={askingFor} onValueChange={setAskingFor}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by what they want" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="">All</SelectItem>
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
          <Label>Looking for (what they offer)</Label>
          <Select value={lookingFor} onValueChange={setLookingFor}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by what they offer" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="">All</SelectItem>
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
          <Label>Rarity</Label>
          <Select value={rarity} onValueChange={(value) => setRarity(value as Brainrot['rarity'])}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Rarities</SelectItem>
              {rarities.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button onClick={handleClearFilters} variant="outline">
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};