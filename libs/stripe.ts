// import { Stripe } from "stripe";

import Stripe from "stripe";

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("Secret Key bulunamadı");
// }
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2024-06-20",
//   typescript: true,
// });

export const getStripe = () => {
  if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY bulunamadı");
  }
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
    typescript: true,
  });
  return stripe;
};
