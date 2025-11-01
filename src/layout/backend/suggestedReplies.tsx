export interface SuggestedReply {
  text: string;
  category: string;
  isExploreMore?: boolean;
  isBackToMain?: boolean;
  isSpecificFollowup?: boolean;
}

export const contextBasedSuggestions: Record<string, SuggestedReply[]> = {
  // Main/General responses
  general: [
    { text: "View all products", category: "products_overview" },
    { text: "Pricing information", category: "pricing_info" },
    { text: "How to order", category: "ordering_process" },
    { text: "Payment methods", category: "payment_methods" },
    { text: "Contact information", category: "contact_info" },
    { text: "About our store", category: "about_store" },
  ],

  // Greetings responses
  greetings: [
    { text: "Browse products", category: "products_overview" },
    { text: "How to order", category: "ordering_process" },
    { text: "Payment options", category: "payment_methods" },
    { text: "Check availability", category: "availability" },
    { text: "Custom orders", category: "custom_orders" },
    {
      text: "What else can you help with?",
      category: "general",
      isExploreMore: true,
    },
  ],

  // Products overview
  products_overview: [
    { text: "Custom merchandise", category: "custom_orders" },
    {
      text: "Tell me more about other services",
      category: "general",
      isExploreMore: true,
    },
  ],

  // Product categories - simplified to match actual products
  caps: [
    { text: "Basic caps", category: "basic_caps" },
    { text: "Acid wash caps", category: "acid_wash_caps" },
    { text: "Check prices", category: "pricing_info" },
    { text: "Check availability", category: "availability" },
    {
      text: "What other products do you have?",
      category: "products_overview",
      isExploreMore: true,
    },
  ],

  bags: [
    { text: "Check prices", category: "pricing_info" },
    { text: "Check availability", category: "availability" },
    {
      text: "Show me other products",
      category: "products_overview",
      isExploreMore: true,
    },
  ],

  apparel: [
    { text: "Size guide", category: "sizing" },
    { text: "Check prices", category: "pricing_info" },
    { text: "Check availability", category: "availability" },
    {
      text: "I want to see other items",
      category: "products_overview",
      isExploreMore: true,
    },
  ],

  accessories: [
    { text: "Check prices", category: "pricing_info" },
    { text: "Check availability", category: "availability" },
    {
      text: "What else is available?",
      category: "products_overview",
      isExploreMore: true,
    },
  ],

  // Pricing information
  pricing_info: [
    { text: "Custom order pricing", category: "custom_pricing" },
    {
      text: "I have other questions",
      category: "general",
      isExploreMore: true,
    },
  ],

  // Availability
  availability: [
    {
      text: "Can you help with something else?",
      category: "general",
      isExploreMore: true,
    },
  ],

  // Payment methods
  payment_methods: [
    { text: "GCash details", category: "gcash" },
    { text: "Payment process", category: "payment_steps" },
    {
      text: "What other information do you have?",
      category: "general",
      isExploreMore: true,
    },
  ],

  // Ordering process
  ordering_process: [
    {
      text: "Tell me about other services",
      category: "general",
      isExploreMore: true,
    },
  ],

  // Custom orders
  custom_orders: [
    {
      text: "What else can you help me with?",
      category: "general",
      isExploreMore: true,
    },
  ],

  // Contact information
  contact_info: [
    { text: "Facebook page", category: "facebook" },
    { text: "Office location", category: "location" },
    { text: "Phone number", category: "phone" },
    {
      text: "I need help with something else",
      category: "general",
      isExploreMore: true,
    },
  ],

  // About store
  about_store: [
    { text: "About SJC", category: "about_sjc" },
    { text: "About Tatak Josephinian", category: "about_tatak" },
    { text: "Chatbot developers", category: "developers" },
    {
      text: "What other information can you provide?",
      category: "general",
      isExploreMore: true,
    },
  ],

  // Thank you responses
  thanks: [
    { text: "Browse products", category: "products_overview" },
    { text: "How to order", category: "ordering_process" },
    { text: "Contact us", category: "contact_info" },
    { text: "I have more questions", category: "general", isExploreMore: true },
  ],

  // Sizing information
  sizing: [
    { text: "T-shirt sizes", category: "tshirt_sizes" },
    { text: "Bag dimensions", category: "bag_dimensions" },
    {
      text: "Show me your products",
      category: "products_overview",
      isExploreMore: true,
    },
  ],
};

// Helper function to get suggestions with fallback
export const getContextSuggestions = (context: string): SuggestedReply[] => {
  return contextBasedSuggestions[context] || contextBasedSuggestions.general;
};

// Function to get explore more suggestions from any context
export const getExploreMoreSuggestions = (): SuggestedReply[] => {
  return contextBasedSuggestions.general;
};
