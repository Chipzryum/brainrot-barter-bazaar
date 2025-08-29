export interface Brainrot {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Mythic Lucky' | 'Brainrot God' | 'Brainrot God Lucky' | 'Secret' | 'Secret Lucky';
  purchasePrice: number | string;
}

export const brainrots: Brainrot[] = [
  { id: '1', name: 'Noobini Pizzanini', rarity: 'Common', purchasePrice: 25 },
  { id: '2', name: 'Lirili Larila', rarity: 'Common', purchasePrice: 250 },
  { id: '3', name: 'Tim Cheese', rarity: 'Common', purchasePrice: 500 },
  { id: '4', name: 'FluriFlura', rarity: 'Common', purchasePrice: 750 },
  { id: '5', name: 'Talpa Di Fero', rarity: 'Common', purchasePrice: 1000 },
  { id: '6', name: 'Svinina Bombardino', rarity: 'Common', purchasePrice: 1200 },
  { id: '7', name: 'Pipi Kiwi', rarity: 'Common', purchasePrice: 1500 },
  { id: '8', name: 'Trippi Troppi', rarity: 'Rare', purchasePrice: 2000 },
  { id: '9', name: 'Tung Tung Tung Sahur', rarity: 'Rare', purchasePrice: 3000 },
  { id: '10', name: 'Gangster Footera', rarity: 'Rare', purchasePrice: 4000 },
  { id: '11', name: 'Bandito Bobritto', rarity: 'Rare', purchasePrice: 4500 },
  { id: '12', name: 'Boneca Ambalabu', rarity: 'Rare', purchasePrice: 5000 },
  { id: '13', name: 'Cacto Hipopotamo', rarity: 'Rare', purchasePrice: 6500 },
  { id: '14', name: 'Ta Ta Ta Ta Sahur', rarity: 'Rare', purchasePrice: 7500 },
  { id: '15', name: 'Tric Trac Baraboom', rarity: 'Rare', purchasePrice: 9000 },
  { id: '16', name: 'Cappuccino Assassino', rarity: 'Epic', purchasePrice: 10000 },
  { id: '17', name: 'Brr Brr Patapim', rarity: 'Epic', purchasePrice: 15000 },
  { id: '18', name: 'Trulimero Trulicina', rarity: 'Epic', purchasePrice: 20000 },
  { id: '19', name: 'Bambini Crostini', rarity: 'Epic', purchasePrice: 22500 },
  { id: '20', name: 'Bananita Dolphinita', rarity: 'Epic', purchasePrice: 25000 },
  { id: '21', name: 'Perochello Lemonchello', rarity: 'Epic', purchasePrice: 27500 },
  { id: '22', name: 'Brri Brri Bicus Dicus Bombicus', rarity: 'Epic', purchasePrice: 30000 },
  { id: '23', name: 'Avocadini Guffo', rarity: 'Epic', purchasePrice: 35000 },
  { id: '24', name: 'Salamino Penguino', rarity: 'Epic', purchasePrice: 40000 },
  { id: '25', name: 'Burbaloni Loliloli', rarity: 'Legendary', purchasePrice: 35000 },
  { id: '26', name: 'Chimpazini Bananini', rarity: 'Legendary', purchasePrice: 50000 },
  { id: '27', name: 'Ballerina Cappuccina', rarity: 'Legendary', purchasePrice: 100000 },
  { id: '28', name: 'Chef Crabracadabra', rarity: 'Legendary', purchasePrice: 150000 },
  { id: '29', name: 'Lionel Cactuseli', rarity: 'Legendary', purchasePrice: 175000 },
  { id: '30', name: 'Glorbo Fruttodrillo', rarity: 'Legendary', purchasePrice: 200000 },
  { id: '31', name: 'Blueberrini Octopusini', rarity: 'Legendary', purchasePrice: 250000 },
  { id: '32', name: 'Strawberelli Flamingelli', rarity: 'Legendary', purchasePrice: 275000 },
  { id: '33', name: 'Pandaccini Bananini', rarity: 'Legendary', purchasePrice: 300000 },
  { id: '34', name: 'Frigo Camelo', rarity: 'Mythic', purchasePrice: 300000 },
  { id: '35', name: 'Orangutini Ananassini', rarity: 'Mythic', purchasePrice: 400000 },
  { id: '36', name: 'Rhino Toasterino', rarity: 'Mythic', purchasePrice: 450000 },
  { id: '37', name: 'Bombardiro Crocodilo', rarity: 'Mythic', purchasePrice: 500000 },
  { id: '38', name: 'Bombombini Gusini', rarity: 'Mythic', purchasePrice: 1000000 },
  { id: '39', name: 'Cavallo Virtuso', rarity: 'Mythic', purchasePrice: 2500000 },
  { id: '40', name: 'Gorillo Watermelondrillo', rarity: 'Mythic', purchasePrice: 3000000 },
  { id: '41', name: 'Spioniro Golubiro', rarity: 'Mythic Lucky', purchasePrice: 750000 },
  { id: '42', name: 'Zibra Zubra Zibralini', rarity: 'Mythic Lucky', purchasePrice: 1000000 },
  { id: '43', name: 'Tigrilini Watermelini', rarity: 'Mythic Lucky', purchasePrice: 1000000 },
  { id: '44', name: 'Coco Elefanto', rarity: 'Brainrot God', purchasePrice: 5000000 },
  { id: '45', name: 'Girafa Celestre', rarity: 'Brainrot God', purchasePrice: 7500000 },
  { id: '46', name: 'Gattatino Nyanino', rarity: 'Brainrot God', purchasePrice: 7500000 },
  { id: '47', name: 'Matteo', rarity: 'Brainrot God', purchasePrice: 10000000 },
  { id: '48', name: 'Tralalero Tralala', rarity: 'Brainrot God', purchasePrice: 10000000 },
  { id: '49', name: 'Espresso Signora', rarity: 'Brainrot God', purchasePrice: 25000000 },
  { id: '50', name: 'Odin Din Din Dun', rarity: 'Brainrot God', purchasePrice: 15000000 },
  { id: '51', name: 'Statutino Libertino', rarity: 'Brainrot God', purchasePrice: 20000000 },
  { id: '52', name: 'Trenostruzzo Turbo 3000', rarity: 'Brainrot God', purchasePrice: 25000000 },
  { id: '53', name: 'Ballerino Lololo', rarity: 'Brainrot God', purchasePrice: 35000000 },
  { id: '54', name: 'Trigoligre Frutonni', rarity: 'Brainrot God Lucky', purchasePrice: 15000000 },
  { id: '55', name: 'Orcalero Orcala', rarity: 'Brainrot God Lucky', purchasePrice: 15000000 },
  { id: '56', name: 'Los Crocodillitos', rarity: 'Brainrot God', purchasePrice: 12500000 },
  { id: '57', name: 'Piccione Macchina', rarity: 'Brainrot God', purchasePrice: '-' },
  { id: '58', name: 'La Vacca Staturno Saturnita', rarity: 'Secret', purchasePrice: 50000000 },
  { id: '59', name: 'Chimpanzini Spiderini', rarity: 'Secret', purchasePrice: 100000000 },
  { id: '60', name: 'Los Tralaleritos', rarity: 'Secret', purchasePrice: 150000000 },
  { id: '61', name: 'Las Tralaleritas', rarity: 'Secret', purchasePrice: 150000000 },
  { id: '62', name: 'Graipuss Medussi', rarity: 'Secret', purchasePrice: 250000000 },
  { id: '63', name: 'La Grande Combinasion', rarity: 'Secret', purchasePrice: 1000000000 },
  { id: '64', name: 'Nuclearo Dinossauro', rarity: 'Secret', purchasePrice: 2500000000 },
  { id: '65', name: 'Garama and Madundung', rarity: 'Secret', purchasePrice: 10000000000 },
  { id: '66', name: 'Tortuginni Dragonfruitini', rarity: 'Secret Lucky', purchasePrice: 500000000 },
  { id: '67', name: 'Pot Hotspot', rarity: 'Secret Lucky', purchasePrice: 500000000 },
  { id: '68', name: 'Las Vaquitas Saturnitas', rarity: 'Secret', purchasePrice: 160000000 },
  { id: '69', name: 'Chicleteira Bicicleteira', rarity: 'Secret', purchasePrice: 125000000 },
];

export const rarityColors = {
  'Common': 'hsl(120, 100%, 40%)', // Green
  'Rare': 'hsl(240, 100%, 60%)', // Blue
  'Epic': 'hsl(270, 100%, 60%)', // Purple
  'Legendary': 'hsl(30, 100%, 50%)', // Orange
  'Mythic': 'hsl(0, 100%, 50%)', // Red
  'Mythic Lucky': 'hsl(315, 100%, 50%)', // Pink
  'Brainrot God': 'hsl(45, 100%, 50%)', // Gold
  'Brainrot God Lucky': 'hsl(45, 100%, 70%)', // Light Gold
  'Secret': 'hsl(0, 0%, 20%)', // Dark Gray
  'Secret Lucky': 'hsl(0, 0%, 40%)', // Gray
};

export const getRarityLabel = (rarity: Brainrot['rarity']): string => {
  return rarity;
};

export const formatPrice = (price: number | string): string => {
  if (price === '-') return 'N/A';
  if (typeof price === 'string') return price;
  
  if (price >= 1000000000) {
    return `${(price / 1000000000).toFixed(1)}B`;
  } else if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(1)}k`;
  }
  return price.toString();
};