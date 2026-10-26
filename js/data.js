/**
 * ECOSWAP AFRICA - DATA STORE & REWARDS SYSTEM
 */

const ECOSWAP_DATA = {
  // Exchange Rates & Conversion Rules
  rates: {
    coinsPerGram: 0.1,       // 100g = 10 Coins
    diamondsPerKg: 2,        // 1kg = 2 Diamonds
    coinToNairaValue: 1.5,   // 1 Coin ~ 1.5 NGN
    diamondToNairaValue: 100 // 1 Diamond ~ 100 NGN
  },

  // Accepted Materials
  materials: [
    {
      id: 'mat-pet',
      name: 'PET Plastic Bottles',
      code: 'PET / 01',
      type: 'Light & Rigid',
      weighUnit: 'grams',
      rateText: '10 Coins per 100g',
      multiplier: 0.1, // coins per g
      rewardType: 'coins',
      description: 'Clear water bottles, soda containers, transparent beverage bottles with caps removed.',
      color: '#ccff00'
    },
    {
      id: 'mat-hdpe',
      name: 'HDPE Heavy Plastics',
      code: 'HDPE / 02',
      type: 'Dense & Opaque',
      weighUnit: 'kg',
      rateText: '3 Diamonds per kg',
      multiplier: 3, // diamonds per kg
      rewardType: 'diamonds',
      description: 'Detergent containers, shampoo bottles, milk jugs, industrial buckets, and hard jerrycans.',
      color: '#38bdf8'
    },
    {
      id: 'mat-cans',
      name: 'Aluminium Beverage Cans',
      code: 'ALU / 41',
      type: 'Metals',
      weighUnit: 'grams',
      rateText: '25 Coins per 100g',
      multiplier: 0.25, // coins per g
      rewardType: 'coins',
      description: 'Clean, crushed soda cans, energy drink tins, and pure aluminium packaging.',
      color: '#facc15'
    },
    {
      id: 'mat-pp',
      name: 'Polypropylene (PP)',
      code: 'PP / 05',
      type: 'Rigid & Food Grade',
      weighUnit: 'kg',
      rateText: '2.5 Diamonds per kg',
      multiplier: 2.5, // diamonds per kg
      rewardType: 'diamonds',
      description: 'Food takeaway tubs, medicine bottles, bottle caps, plastic chairs, and crates.',
      color: '#a7f3d0'
    },
    {
      id: 'mat-ldpe',
      name: 'LDPE Films & Wraps',
      code: 'LDPE / 04',
      type: 'Flexible Film',
      weighUnit: 'grams',
      rateText: '8 Coins per 100g',
      multiplier: 0.08, // coins per g
      rewardType: 'coins',
      description: 'Clean grocery bags, bubble wrap, shrink film, and dry packaging liners.',
      color: '#fbcfe8'
    },
    {
      id: 'mat-paper',
      name: 'Cardboard & Craft Paper',
      code: 'PAP / 20',
      type: 'Fiber',
      weighUnit: 'kg',
      rateText: '1.5 Diamonds per kg',
      multiplier: 1.5, // diamonds per kg
      rewardType: 'diamonds',
      description: 'Flattened corrugated shipping cartons, clean paperboard, and dry newsprint.',
      color: '#fed7aa'
    }
  ],

  // Products Made from Recycled Plastics
  products: [
    {
      id: 'prod-1',
      name: 'Eco-Pave Interlocking Driveway Tiles',
      category: 'Construction',
      price: '₦ 4,200 / sqm',
      redeemCost: '180 Diamonds',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=700&q=80',
      description: 'Indestructible paving tiles molded from 100% recycled HDPE and PP polymers. 3x stronger than standard concrete.',
      specs: 'Weight: 4.2kg | Compressive Strength: 45MPa | Water absorption: 0%'
    },
    {
      id: 'prod-2',
      name: 'Heavy-Duty Harvester Crate',
      category: 'Industrial',
      price: '₦ 6,800',
      redeemCost: '250 Diamonds',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80',
      description: 'Stackable agriculture and logistics container crafted from recycled plastic bottle caps and food tubs.',
      specs: 'Volume: 45 Litres | Load Rating: 60kg | UV-Stabilized'
    },
    {
      id: 'prod-3',
      name: 'Terra Botanica Urban Planter',
      category: 'Decorative',
      price: '₦ 3,500',
      redeemCost: '450 Coins',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80',
      description: 'Textured architectural indoor/outdoor planter engineered from shredded PET bottles with self-watering base.',
      specs: 'Height: 38cm | Diameter: 28cm | Recycled Content: 1.8kg PET'
    },
    {
      id: 'prod-4',
      name: 'Synthetic Timber Fence Planks',
      category: 'Construction',
      price: '₦ 5,900 / 2.4m',
      redeemCost: '220 Diamonds',
      image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=700&q=80',
      description: 'Rot-proof, termite-immune plastic lumber for outdoor decking, garden perimeters, and modern landscaping.',
      specs: 'Dimension: 240cm x 15cm x 3cm | Lifespan: 40+ Years | Zero Maintenance'
    },
    {
      id: 'prod-5',
      name: 'Circular Classroom School Desk',
      category: 'Household',
      price: '₦ 14,000',
      redeemCost: '600 Diamonds',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80',
      description: 'Ergonomic dual desk & bench unit built for community schools using 45kg of post-consumer plastic waste.',
      specs: 'Accommodates 2 Students | Rust & Water-resistant | Impact-proof'
    },
    {
      id: 'prod-6',
      name: 'Industrial Repro rHDPE Pellets (Grade A)',
      category: 'Industrial',
      price: '₦ 850 / kg',
      redeemCost: '75 Diamonds / 10kg',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80',
      description: 'Washed, de-gassed, and uniformly extruded circular raw material pellets ready for injection molding and extrusion.',
      specs: 'MFI: 0.8 - 1.2 g/10min | Purity: 99.4% | Density: 0.95 g/cm³'
    }
  ],

  // Blog / Journal Articles
  blogPosts: [
    {
      id: 'blog-1',
      title: 'How 10,000 African Collectors Are Turning Everyday Waste Into Living Incomes',
      category: 'Community Impact',
      date: 'September 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80',
      snippet: 'From Lagos to Nairobi, grassroots collectors are demonstrating that waste segregation at the source is the fastest path to green urban wealth.',
      content: `The transformation of informal recycling into a structured, digitised value chain is shifting lives across African cities. 
      
When everyday citizens bring PET bottles and HDPE containers to ECOSWAP collection kiosks, they are not just cleaning gutters and drainage systems — they are unlocking immediate, measurable value.

Our two-tier reward architecture (Coins for granular drop-offs, Diamonds for bulk supply) ensures that everyone, from primary school kids depositing bottles after class to commercial aggregators hauling truckloads, receives transparent compensation.`
    },
    {
      id: 'blog-2',
      title: 'The Chemistry of Upcycling: How We Convert Soft Drink Bottles into Resilient Paving Stones',
      category: 'Engineering & Tech',
      date: 'August 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=700&q=80',
      snippet: 'A look inside the ECOSWAP reprocessing facilities: shredding, optical sorting, compounding with quarry dust, and thermal compression.',
      content: `Plastic waste presents a massive mechanical opportunity when properly sorted by polymer density. At ECOSWAP re-manufacturing facilities, collected polymers undergo a strict washing and granulating protocol.
      
By blending high-density polyethylene (HDPE) with inert mineral fillers under precise heat cycles, we manufacture paving blocks that withstand 45 MPa of pressure — vastly surpassing conventional sandcrete blocks while saving tons of carbon.`
    },
    {
      id: 'blog-3',
      title: 'Coins vs Diamonds: Master the ECOSWAP Dual Reward Tokenomics',
      category: 'Guides & Rules',
      date: 'July 2026',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=80',
      snippet: 'Everything you need to know about our reward tiers, redemption windows, and how to maximize your monthly payout.',
      content: `Why did ECOSWAP design a dual reward system instead of a single metric?
      
1. Coins are precision-tuned for gram-level everyday recyclables (like soda cans, water bottles, food packaging).
2. Diamonds represent heavy-volume contributions (such as crates, barrels, wholesale cardboard, and dense plastics).
      
Coins can be redeemed instantly for quick lifestyle needs (mobile airtime, utility vouchers, eco-seedling pots), while Diamonds accumulate towards high-value rewards like building materials, school tuition vouchers, and direct cash disbursements.`
    }
  ],

  // Rewards Store Catalog
  rewards: [
    {
      id: 'rew-1',
      title: '₦ 1,000 Airtime / Data Top-up',
      category: 'Telecom',
      costCoins: 400,
      costDiamonds: 0,
      currency: 'coins',
      cost: '400 Coins',
      description: 'Instant recharge voucher sent directly to any registered MTN, Airtel, Glo or 9mobile phone number.',
      icon: 'phone'
    },
    {
      id: 'rew-2',
      title: '₦ 5,000 Direct Bank Cash Transfer',
      category: 'Cash',
      costCoins: 0,
      costDiamonds: 50,
      currency: 'diamonds',
      cost: '50 Diamonds',
      description: 'Instant electronic funds payout disbursed to your verified local bank account.',
      icon: 'cash'
    },
    {
      id: 'rew-3',
      title: 'Solar Home Reading Lantern',
      category: 'Energy',
      costCoins: 0,
      costDiamonds: 80,
      currency: 'diamonds',
      cost: '80 Diamonds',
      description: 'Rechargeable solar-powered lamp with mobile phone charging USB port for home study.',
      icon: 'sun'
    },
    {
      id: 'rew-4',
      title: 'Eco-Fiber School Backpack & Stationery Kit',
      category: 'Education',
      costCoins: 650,
      costDiamonds: 0,
      currency: 'coins',
      cost: '650 Coins',
      description: 'Waterproof school bag woven from recycled PET yarn, packed with notebooks and pens.',
      icon: 'book'
    },
    {
      id: 'rew-5',
      title: '₦ 15,000 Supermarket Food Voucher',
      category: 'Groceries',
      costCoins: 0,
      costDiamonds: 140,
      currency: 'diamonds',
      cost: '140 Diamonds',
      description: 'Digital retail voucher valid at partner grocery stores for staples like rice, oil, and provisions.',
      icon: 'shopping'
    },
    {
      id: 'rew-6',
      title: 'Set of 4 Upcycled Terra Planters',
      category: 'Home',
      costCoins: 850,
      costDiamonds: 0,
      currency: 'coins',
      cost: '850 Coins',
      description: 'Durable self-watering decorative planters created directly in the ECOSWAP workshop.',
      icon: 'plant'
    }
  ],

  // Collection Hub Locations
  hubs: [
    {
      name: 'Main Metro Recycling Hub',
      address: 'Plot 14 Industrial Avenue, Yaba Eco Hub, Lagos',
      phone: '+234 812 345 6789',
      hours: 'Mon - Sat: 8:00 AM - 5:30 PM',
      capacity: 'Drop-off & Aggregation Station'
    },
    {
      name: 'Lekki Community Drop Point',
      address: 'Kiosk 3, Freedom Way, Lekki Phase 1, Lagos',
      phone: '+234 809 111 2233',
      hours: 'Tue - Sun: 9:00 AM - 6:00 PM',
      capacity: 'Gram & Small Batch Kiosk'
    },
    {
      name: 'Ikeja Circular Resource Center',
      address: '22 Oba Akran Way, Ikeja Industrial Estate',
      phone: '+234 802 999 8877',
      hours: 'Mon - Fri: 8:30 AM - 5:00 PM',
      capacity: 'Bulk Weighing & Reprocessing'
    }
  ]
};

// Expose globally
if (typeof window !== 'undefined') {
  window.ECOSWAP_DATA = ECOSWAP_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ECOSWAP_DATA;
}
