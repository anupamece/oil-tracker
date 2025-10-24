// Food Database for Oil Tracker
// Professional health app with comprehensive food data

export const foodDatabase = [
  // HEALTHY FOODS (Low Oil Content)
  {
    id: 1,
    name: "Dal (Yellow Lentils)",
    category: "healthy",
    emoji: "🍛",
    calories: 165,
    oilContent: "Low",
    oilLevel: 15, // out of 100
    oilAmount: "0.5 tsp",
    cookingMethod: "Boiled with tempering",
    healthScore: 9,
    protein: 12,
    carbs: 28,
    fat: 1,
    fiber: 8,
    description: "Traditional Indian lentil curry with minimal oil",
    betterAlternative: null,
    tips: "Rich in protein and fiber, perfect for daily consumption"
  },
  {
    id: 2,
    name: "Roti (Wheat Chapati)",
    category: "healthy",
    emoji: "🫓",
    calories: 80,
    oilContent: "Very Low",
    oilLevel: 5,
    oilAmount: "0.1 tsp",
    cookingMethod: "Dry roasted",
    healthScore: 8,
    protein: 3,
    carbs: 15,
    fat: 0.5,
    fiber: 2,
    description: "Whole wheat flatbread with minimal oil",
    betterAlternative: null,
    tips: "Great source of complex carbohydrates"
  },
  {
    id: 3,
    name: "Grilled Chicken Breast",
    category: "healthy",
    emoji: "🍗",
    calories: 185,
    oilContent: "Low",
    oilLevel: 20,
    oilAmount: "0.5 tsp",
    cookingMethod: "Grilled",
    healthScore: 9,
    protein: 35,
    carbs: 0,
    fat: 4,
    fiber: 0,
    description: "Lean protein grilled with minimal oil",
    betterAlternative: null,
    tips: "Excellent source of lean protein"
  },
  {
    id: 4,
    name: "Steamed Rice",
    category: "healthy",
    emoji: "🍚",
    calories: 130,
    oilContent: "None",
    oilLevel: 0,
    oilAmount: "0 tsp",
    cookingMethod: "Steamed",
    healthScore: 7,
    protein: 3,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    description: "Plain steamed rice without any oil",
    betterAlternative: null,
    tips: "Good source of energy, pair with protein"
  },
  {
    id: 5,
    name: "Mixed Vegetable Salad",
    category: "healthy",
    emoji: "🥗",
    calories: 50,
    oilContent: "Very Low",
    oilLevel: 8,
    oilAmount: "0.2 tsp",
    cookingMethod: "Raw with light dressing",
    healthScore: 10,
    protein: 2,
    carbs: 8,
    fat: 1,
    fiber: 4,
    description: "Fresh vegetables with light olive oil dressing",
    betterAlternative: null,
    tips: "High in vitamins and minerals"
  },

  // MODERATE FOODS (Medium Oil Content)
  {
    id: 6,
    name: "Chicken Curry (Home-style)",
    category: "moderate",
    emoji: "🍛",
    calories: 285,
    oilContent: "Medium",
    oilLevel: 45,
    oilAmount: "1.5 tsp",
    cookingMethod: "Pan-cooked with spices",
    healthScore: 6,
    protein: 25,
    carbs: 8,
    fat: 18,
    fiber: 2,
    description: "Traditional home-style chicken curry",
    betterAlternative: "Grilled Chicken with steamed vegetables",
    tips: "Reduce oil by 50% for healthier version"
  },
  {
    id: 7,
    name: "Aloo Paratha",
    category: "moderate",
    emoji: "🫓",
    calories: 320,
    oilContent: "Medium",
    oilLevel: 55,
    oilAmount: "2 tsp",
    cookingMethod: "Pan-fried",
    healthScore: 5,
    protein: 8,
    carbs: 45,
    fat: 12,
    fiber: 4,
    description: "Stuffed potato flatbread with ghee/oil",
    betterAlternative: "Roti with boiled potato curry",
    tips: "Use less oil and add yogurt for balance"
  },
  {
    id: 8,
    name: "Pasta with Olive Oil",
    category: "moderate",
    emoji: "🍝",
    calories: 220,
    oilContent: "Medium",
    oilLevel: 40,
    oilAmount: "1 tbsp",
    cookingMethod: "Boiled with oil dressing",
    healthScore: 6,
    protein: 8,
    carbs: 35,
    fat: 8,
    fiber: 2,
    description: "Pasta with olive oil and herbs",
    betterAlternative: "Pasta with tomato-based sauce",
    tips: "Add vegetables for better nutrition"
  },
  {
    id: 9,
    name: "Vegetable Sandwich",
    category: "moderate",
    emoji: "🥪",
    calories: 280,
    oilContent: "Medium",
    oilLevel: 35,
    oilAmount: "1 tsp",
    cookingMethod: "Grilled with butter",
    healthScore: 6,
    protein: 12,
    carbs: 40,
    fat: 10,
    fiber: 6,
    description: "Grilled sandwich with vegetables and cheese",
    betterAlternative: "Open sandwich without grilling",
    tips: "Use whole grain bread for better nutrition"
  },

  // HIGH OIL FOODS (Junk/Fried)
  {
    id: 10,
    name: "Samosa",
    category: "high",
    emoji: "🥟",
    calories: 250,
    oilContent: "Very High",
    oilLevel: 85,
    oilAmount: "2.5 tbsp",
    cookingMethod: "Deep fried",
    healthScore: 3,
    protein: 6,
    carbs: 25,
    fat: 18,
    fiber: 3,
    description: "Deep-fried pastry with spiced filling",
    betterAlternative: "Baked samosa (-60% oil)",
    tips: "Limit to special occasions, drink green tea after"
  },
  {
    id: 11,
    name: "French Fries",
    category: "high",
    emoji: "🍟",
    calories: 365,
    oilContent: "Very High",
    oilLevel: 90,
    oilAmount: "3 tbsp",
    cookingMethod: "Deep fried",
    healthScore: 2,
    protein: 4,
    carbs: 48,
    fat: 17,
    fiber: 4,
    description: "Deep-fried potato strips",
    betterAlternative: "Air-fried potato wedges (-70% oil)",
    tips: "Try baked sweet potato fries instead"
  },
  {
    id: 12,
    name: "Fried Chicken",
    category: "high",
    emoji: "🍗",
    calories: 320,
    oilContent: "Very High",
    oilLevel: 88,
    oilAmount: "3 tbsp",
    cookingMethod: "Deep fried",
    healthScore: 2,
    protein: 25,
    carbs: 8,
    fat: 22,
    fiber: 0,
    description: "Battered and deep-fried chicken",
    betterAlternative: "Grilled chicken breast (-75% oil)",
    tips: "Remove skin to reduce oil absorption"
  },
  {
    id: 13,
    name: "Pakora/Bhajiya",
    category: "high",
    emoji: "🧄",
    calories: 180,
    oilContent: "Very High",
    oilLevel: 92,
    oilAmount: "2 tbsp",
    cookingMethod: "Deep fried",
    healthScore: 2,
    protein: 4,
    carbs: 15,
    fat: 13,
    fiber: 2,
    description: "Deep-fried vegetable fritters",
    betterAlternative: "Steamed vegetable dumplings (-80% oil)",
    tips: "Drain on paper towels and eat immediately"
  },
  {
    id: 14,
    name: "Pizza Slice (Margherita)",
    category: "high",
    emoji: "🍕",
    calories: 285,
    oilContent: "High",
    oilLevel: 65,
    oilAmount: "2 tsp",
    cookingMethod: "Baked with cheese",
    healthScore: 4,
    protein: 12,
    carbs: 35,
    fat: 12,
    fiber: 2,
    description: "Cheese pizza with tomato sauce",
    betterAlternative: "Thin crust with vegetables (-30% calories)",
    tips: "Add vegetables and reduce cheese"
  },
  {
    id: 15,
    name: "Burger (Chicken)",
    category: "high",
    emoji: "🍔",
    calories: 540,
    oilContent: "High",
    oilLevel: 70,
    oilAmount: "2.5 tbsp",
    cookingMethod: "Fried patty with mayo",
    healthScore: 3,
    protein: 25,
    carbs: 45,
    fat: 28,
    fiber: 3,
    description: "Chicken burger with mayo and fries",
    betterAlternative: "Grilled chicken wrap (-50% oil)",
    tips: "Ask for grilled patty and skip mayo"
  }
];

// Helper functions for food database
export const getFoodsByCategory = (category) => {
  return foodDatabase.filter(food => food.category === category);
};

export const searchFoods = (query) => {
  if (!query) return foodDatabase;
  return foodDatabase.filter(food => 
    food.name.toLowerCase().includes(query.toLowerCase()) ||
    food.description.toLowerCase().includes(query.toLowerCase())
  );
};

export const getFoodById = (id) => {
  return foodDatabase.find(food => food.id === id);
};

export const getHealthyAlternatives = (category) => {
  if (category === 'high') {
    return getFoodsByCategory('healthy').slice(0, 3);
  }
  return [];
};

// Oil level color coding
export const getOilLevelColor = (oilLevel) => {
  if (oilLevel <= 20) return '#10B981'; // Green - healthy
  if (oilLevel <= 50) return '#F59E0B'; // Amber - moderate  
  return '#EF4444'; // Red - high
};

// Health score color coding
export const getHealthScoreColor = (score) => {
  if (score >= 8) return '#10B981'; // Green - excellent
  if (score >= 6) return '#F59E0B'; // Amber - good
  if (score >= 4) return '#FB923C'; // Orange - fair
  return '#EF4444'; // Red - poor
};
