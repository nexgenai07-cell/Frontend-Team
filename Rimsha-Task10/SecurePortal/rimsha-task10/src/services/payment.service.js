// Stripe library import kar rahy hain
import { loadStripe } from "@stripe/stripe-js";

// Stripe publishable key .env se lo
// pk_test_ se shuru hoti hai — test mode mein
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Plans ka data — pricing page pe dikhega
// price_id — Stripe dashboard mein create karna hoga
export const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    priceLabel: "Free",
    description: "For individual developers and small projects.",
    features: [
      "Single Project License",
      "Standard OTP Auth",
      "Advanced Threat Detection",
      "Dedicated Support",
    ],
    // Ye features disabled hain basic mein
    disabledFeatures: ["Advanced Threat Detection", "Dedicated Support"],
    buttonText: "Get Started",
    highlighted: false,
    // Stripe price ID — free plan ke liye checkout nahi hoga
    priceId: null,
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    priceLabel: "$19/mo",
    description: "Advanced security for growing businesses.",
    features: [
      "Unlimited Projects",
      "Multi-Factor Authentication",
      "24/7 Premium Support",
      "API Access Control",
      "Automated Backups",
    ],
    disabledFeatures: [],
    buttonText: "Upgrade Now",
    highlighted: true,
    // Stripe pe product banana hoga — tab real price ID milegi
    // Abhi test ke liye placeholder
    priceId: "price_pro_test",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 49,
    priceLabel: "$49/mo",
    description: "Mission-critical protection and compliance.",
    features: [
      "SSO & SAML Integration",
      "Custom Security Roles",
      "Compliance Auditing",
      "Dedicated Account Manager",
    ],
    disabledFeatures: [],
    buttonText: "Contact Sales",
    highlighted: false,
    priceId: "price_enterprise_test",
  },
];

// ==========================================
// REDIRECT TO STRIPE CHECKOUT
// ==========================================
// plan object leta hai
// Stripe Checkout page pe redirect karta hai

export const redirectToCheckout = async (plan) => {
  // Stripe load karo
  const stripe = await stripePromise;

  // Stripe ne load nahi kiya — error throw karo
  if (!stripe) {
    throw new Error("Stripe failed to load");
  }

  // Stripe Checkout Session banao
  // Mode: payment — ek baar payment
  const { error } = await stripe.redirectToCheckout({
    lineItems: [
      {
        // Price ID — Stripe dashboard se aata hai
        price: plan.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    // Payment success hone pe yahan redirect hoga
    successUrl: `${window.location.origin}/payment-success?plan=${plan.name}&amount=${plan.price}`,
    // Payment cancel hone pe yahan redirect hoga
    cancelUrl: `${window.location.origin}/payment-failure`,
  });

  // Error aaya — throw karo
  if (error) throw error;
};

// ==========================================
// GET PAYMENT STATS FROM LOCAL STORAGE
// ==========================================
// Dashboard ke liye payment stats local storage se lo

export const getPaymentStats = () => {
  try {
    return (
      JSON.parse(localStorage.getItem("secureportal_payment_stats")) || {
        successfulPayments: 0,
        failedPayments: 0,
        payments: [],
      }
    );
  } catch {
    return {
      successfulPayments: 0,
      failedPayments: 0,
      payments: [],
    };
  }
};

// ==========================================
// SAVE PAYMENT STATS TO LOCAL STORAGE
// ==========================================
// Payment complete hone pe stats save karo

export const savePaymentStat = (status, planName, amount) => {
  const stats = getPaymentStats();

  // Status ke hisaab se count badha
  if (status === "success") {
    stats.successfulPayments += 1;
  } else {
    stats.failedPayments += 1;
  }

  // Payment record add karo
  stats.payments.unshift({
    status,
    planName,
    amount,
    date: new Date().toLocaleDateString(),
    transactionId: `SP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  });

  // Local storage mein save karo
  localStorage.setItem("secureportal_payment_stats", JSON.stringify(stats));

  return stats;
};
