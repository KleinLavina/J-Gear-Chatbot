export interface SuggestedReply {
  text: string;
  category: string;
  isExploreMore?: boolean;
  isBackToMain?: boolean;
  isSpecificFollowup?: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom(pool: SuggestedReply[], count = 3): SuggestedReply[] {
  return shuffle(pool).slice(0, count);
}

export const suggestionPools: Record<string, SuggestedReply[]> = {
  general: [
    { text: "View all products", category: "products_overview" },
    { text: "Pricing information", category: "pricing_info" },
    { text: "How to order", category: "ordering_process" },
    { text: "Payment methods", category: "payment_methods" },
    { text: "Contact information", category: "contact_info" },
    { text: "About our store", category: "about_store" },
    { text: "Check availability", category: "availability" },
    { text: "Custom orders", category: "custom_orders" },
  ],

  greetings: [
    { text: "Browse products", category: "products_overview" },
    { text: "How to order", category: "ordering_process" },
    { text: "Payment options", category: "payment_methods" },
    { text: "Check availability", category: "availability" },
    { text: "Custom orders", category: "custom_orders" },
    { text: "About the store", category: "about_store" },
    { text: "Pricing information", category: "pricing_info" },
    { text: "Contact us", category: "contact_info" },
  ],

  products_overview: [
    { text: "How to order", category: "ordering_process" },
    { text: "Check prices", category: "pricing_info" },
    { text: "Check availability", category: "availability" },
    { text: "Custom merchandise", category: "custom_orders" },
    { text: "Contact us", category: "contact_info" },
    { text: "Payment methods", category: "payment_methods" },
  ],

  pricing_info: [
    { text: "How to order", category: "ordering_process" },
    { text: "Payment methods", category: "payment_methods" },
    { text: "Custom order pricing", category: "custom_orders" },
    { text: "Check availability", category: "availability" },
    { text: "Contact us for a quote", category: "contact_info" },
    { text: "View products", category: "products_overview" },
  ],

  payment_methods: [
    { text: "GCash details", category: "gcash" },
    { text: "How to order", category: "ordering_process" },
    { text: "Check availability", category: "availability" },
    { text: "Contact us", category: "contact_info" },
    { text: "Downpayment options", category: "downpayment" },
    { text: "View products", category: "products_overview" },
  ],

  ordering_process: [
    { text: "Payment methods", category: "payment_methods" },
    { text: "Pricing information", category: "pricing_info" },
    { text: "Check availability", category: "availability" },
    { text: "Contact us", category: "contact_info" },
    { text: "Custom orders", category: "custom_orders" },
    { text: "GCash details", category: "gcash" },
  ],

  custom_orders: [
    { text: "Pricing for custom orders", category: "pricing_info" },
    { text: "How to order", category: "ordering_process" },
    { text: "Payment methods", category: "payment_methods" },
    { text: "Contact us", category: "contact_info" },
    { text: "Check availability", category: "availability" },
    { text: "View products", category: "products_overview" },
  ],

  contact_info: [
    { text: "Facebook page", category: "facebook" },
    { text: "Office location", category: "location" },
    { text: "How to order", category: "ordering_process" },
    { text: "About our store", category: "about_store" },
    { text: "View products", category: "products_overview" },
    { text: "Payment methods", category: "payment_methods" },
  ],

  about_store: [
    { text: "About SJC", category: "about_sjc" },
    { text: "About Tatak Josephinian", category: "about_tatak" },
    { text: "View our products", category: "products_overview" },
    { text: "Contact us", category: "contact_info" },
    { text: "How to order", category: "ordering_process" },
  ],

  thanks: [
    { text: "Browse products", category: "products_overview" },
    { text: "How to order", category: "ordering_process" },
    { text: "Contact us", category: "contact_info" },
    { text: "Check availability", category: "availability" },
    { text: "Payment methods", category: "payment_methods" },
    { text: "About our store", category: "about_store" },
  ],

  availability: [
    { text: "How to order", category: "ordering_process" },
    { text: "Pricing information", category: "pricing_info" },
    { text: "Contact us", category: "contact_info" },
    { text: "Custom orders", category: "custom_orders" },
    { text: "Payment methods", category: "payment_methods" },
  ],

  sizing: [
    { text: "View products", category: "products_overview" },
    { text: "Pricing information", category: "pricing_info" },
    { text: "How to order", category: "ordering_process" },
    { text: "Check availability", category: "availability" },
    { text: "Contact us", category: "contact_info" },
  ],

  downpayment: [
    { text: "Payment methods", category: "payment_methods" },
    { text: "GCash details", category: "gcash" },
    { text: "How to order", category: "ordering_process" },
    { text: "Pricing information", category: "pricing_info" },
    { text: "Contact us", category: "contact_info" },
  ],

  gcash: [
    { text: "How to order", category: "ordering_process" },
    { text: "Downpayment options", category: "downpayment" },
    { text: "Check availability", category: "availability" },
    { text: "Contact us", category: "contact_info" },
    { text: "View products", category: "products_overview" },
  ],

  order_problem: [
    { text: "Contact us directly", category: "contact_info" },
    { text: "Facebook page", category: "facebook" },
    { text: "Payment methods", category: "payment_methods" },
    { text: "How to order", category: "ordering_process" },
    { text: "View products", category: "products_overview" },
  ],

  payment_issue: [
    { text: "Contact us directly", category: "contact_info" },
    { text: "GCash details", category: "gcash" },
    { text: "Facebook page", category: "facebook" },
    { text: "Payment methods", category: "payment_methods" },
    { text: "How to order", category: "ordering_process" },
  ],

  help: [
    { text: "Browse products", category: "products_overview" },
    { text: "Pricing information", category: "pricing_info" },
    { text: "How to order", category: "ordering_process" },
    { text: "Contact us", category: "contact_info" },
    { text: "About our store", category: "about_store" },
    { text: "Payment methods", category: "payment_methods" },
    { text: "Check availability", category: "availability" },
  ],

  about_sjc: [
    { text: "About Tatak Josephinian", category: "about_tatak" },
    { text: "View our products", category: "products_overview" },
    { text: "Contact us", category: "contact_info" },
    { text: "How to order", category: "ordering_process" },
  ],

  developers: [
    { text: "About Tatak Josephinian", category: "about_tatak" },
    { text: "About SJC", category: "about_sjc" },
    { text: "View our products", category: "products_overview" },
    { text: "Contact us", category: "contact_info" },
  ],
};

export const getContextSuggestions = (context: string, count = 3): SuggestedReply[] => {
  const pool = suggestionPools[context] ?? suggestionPools.general;
  return pickRandom(pool, count);
};

export const contextBasedSuggestions = suggestionPools;
