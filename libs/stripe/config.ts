import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51Q0pYuCvuWOWkWbgNh0DNP1qojwvzk2w1jSIA4GOqO85gjRVCUYQU1zsjLwsuhm1x1oUvE2Gn9PaZYMnQ9o6HaG100dYNv7jJW",
  {
    apiVersion: "2024-06-20",
    typescript: true,
  }
);
