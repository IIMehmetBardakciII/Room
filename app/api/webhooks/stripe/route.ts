// import Stripe from "stripe";
// import { stripe } from "@/libs/stripe/config";
// import { getCookies } from "@/libs/actions/Cookies";
// import { NextRequest, NextResponse } from "next/server";
// import { initAdmin } from "@/libs/firebaseAdmin/config";
// import { DocumentData, QuerySnapshot } from "firebase-admin/firestore";
// import { Timestamp } from "firebase-admin/firestore";

// const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_KEY!;
// export async function POST(req: NextRequest) {
//   const body = await req.text();
//   const { verifiedToken: token } = await getCookies();
//   const sig = req.headers.get("stripe-signature")!;
//   let event: Stripe.Event;
//   try {
//     event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
//   } catch (error: any) {
//     console.error("Webhook signature verification failed.", error.message);
//     return NextResponse.json(
//       { error: `Webhook Error: ${error.message}` },
//       { status: 400 }
//     );
//   }

//   //* Initialize admin Sdk for user update.
//   initAdmin();
//   const admin = require("firebase-admin");
//   const adminDb = admin.firestore();
//   const collection = adminDb.collection("users");

//   //* Handle The Event
//   try {
//     switch (event.type) {
//       case "checkout.session.completed":
//         const session = await stripe.checkout.sessions.retrieve(
//           (event.data.object as Stripe.Checkout.Session).id,
//           {
//             expand: ["line_items"],
//           }
//         );
//         // const customerId = session.customer as string;
//         const customerDetails = session.customer_details;
//         const lineItems = session.line_items?.data || [];
//         for (const item of lineItems) {
//           const priceId = item.price?.id;
//           const isSubscription = item.price?.type === "recurring";

//           //todo:Subcription Situation True
//           if (isSubscription) {
//             let endDate: Timestamp;
//             let priceType: string;
//             if (priceId === process.env.STRIPE_YEARLY_PRICE_ID!) {
//               const currentDate = new Date();
//               currentDate.setFullYear(currentDate.getFullYear() + 1); // 1 yıl ekle
//               endDate = Timestamp.fromDate(currentDate);
//               priceType = "Yearly";
//             } else if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID!) {
//               const currentDate = new Date();
//               currentDate.setMonth(currentDate.getMonth() + 1); // 1 ay ekle
//               endDate = Timestamp.fromDate(currentDate);
//               priceType = "Monthly";
//             } else {
//               throw new Error("Invalid priceId");
//             }
//             const subscriptionsData = {
//               userEmail: customerDetails?.email,
//               startDate: Timestamp.now(),
//               endDate,
//               priceType,
//             };
//             await adminDb.collection("subscriptions").add(subscriptionsData);
//           } else {
//             //* That means is one time payment for visual academy.
//           }
//         }
//         if (customerDetails?.email) {
//           const userQuery = collection.where(
//             "email",
//             "==",
//             customerDetails?.email
//           );
//           const querySnapShot: QuerySnapshot<DocumentData> =
//             await userQuery.get();

//           if (querySnapShot.empty) {
//             console.log("User dökümanı bulunamadı");
//             return NextResponse.json(
//               { error: "Kullanıcı Bulunamadı." },
//               { status: 404 }
//             );
//           }

//           const userDocId = querySnapShot.docs[0].id;
//           // Kullanıcı dökümanını güncelleyin
//           await collection.doc(userDocId).update({
//             userType: "Premium",
//           });

//           console.log("Kullanıcı tipi güncellendi:", customerDetails.email);
//           // return NextResponse.json().redirected()
//           const { url } = req;

//           return NextResponse.redirect(new URL("/e-learning", url));
//         } else {
//           console.error("Customer details or email not found");
//           return NextResponse.json(
//             { error: "Customer details not found" },
//             { status: 404 }
//           );
//         }

//         break;

//       default:
//         console.log(`Unhandled event type ${event.type}`);
//         break;
//     }
//   } catch (error: any) {
//     console.error("Error handling event", error);
//     return NextResponse.json({ error: "Webhook error" }, { status: 400 });
//   }
// }
//!---------------------------------------------------
// import Stripe from "stripe";
// // import { stripe } from "@/libs/stripe/config";
// import { NextRequest, NextResponse } from "next/server";
// import { initAdmin } from "@/libs/firebaseAdmin/config";
// import {
//   DocumentData,
//   QuerySnapshot,
//   Timestamp,
// } from "firebase-admin/firestore";

// export async function POST(req: NextRequest) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//   const body = await req.text();
//   const sig = req.headers.get("stripe-signature")!;
//   console.log("Received Stripe signature:", sig);
//   let event: Stripe.Event;
//   console.log("Request body", body);
//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_KEY!
//     );
//   } catch (error: any) {
//     console.log("Webhook signature verification failed.", error.message);
//     return NextResponse.json(
//       { error: `Webhook Error: ${error.message}` },
//       { status: 400 }
//     );
//   }

//   initAdmin();
//   const admin = require("firebase-admin");
//   const adminDb = admin.firestore();
//   const collection = adminDb.collection("users");

//   try {
//     switch (event.type) {
//       case "checkout.session.completed":
//         const session = await stripe.checkout.sessions.retrieve(
//           (event.data.object as Stripe.Checkout.Session).id,
//           {
//             expand: ["line_items"],
//           }
//         );

//         const customerDetails = session.customer_details;
//         if (!customerDetails || !customerDetails.email) {
//           console.error("Customer details or email not found");
//           return NextResponse.json(
//             { error: "Customer details not found" },
//             { status: 404 }
//           );
//         }

//         const lineItems = session.line_items?.data || [];
//         for (const item of lineItems) {
//           const priceId = item.price?.id;
//           const isSubscription = item.price?.type === "recurring";

//           if (isSubscription) {
//             let endDate: Timestamp;
//             let priceType: string;

//             if (priceId === process.env.STRIPE_YEARLY_PRICE_ID!) {
//               const currentDate = new Date();
//               currentDate.setFullYear(currentDate.getFullYear() + 1);
//               endDate = Timestamp.fromDate(currentDate);
//               priceType = "Yearly";
//             } else if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID!) {
//               const currentDate = new Date();
//               currentDate.setMonth(currentDate.getMonth() + 1);
//               endDate = Timestamp.fromDate(currentDate);
//               priceType = "Monthly";
//             } else {
//               throw new Error("Invalid priceId");
//             }

//             const subscriptionsData = {
//               userEmail: customerDetails.email,
//               startDate: Timestamp.now(),
//               endDate,
//               priceType,
//             };

//             try {
//               await adminDb.collection("subscriptions").add(subscriptionsData);
//             } catch (err) {
//               console.error("Error adding subscription:", err);
//             }
//           }
//         }

//         const userQuery = collection.where(
//           "email",
//           "==",
//           customerDetails.email
//         );
//         const querySnapShot: QuerySnapshot<DocumentData> =
//           await userQuery.get();

//         if (querySnapShot.empty) {
//           console.log(
//             `User document not found for email: ${customerDetails.email}`
//           );
//           return NextResponse.json(
//             { error: "Kullanıcı Bulunamadı." },
//             { status: 404 }
//           );
//         }

//         const userDocId = querySnapShot.docs[0].id;
//         await collection.doc(userDocId).update({
//           userType: "Premium",
//         });

//         console.log("Kullanıcı tipi güncellendi:", customerDetails.email);
//         break;

//       default:
//         console.log(`Unhandled event type ${event.type}`);
//         break;
//     }
//   } catch (error: any) {
//     console.error("Error handling event:", error);
//     return NextResponse.json({ error: "Webhook error" }, { status: 400 });
//   }

//   // Cookie'deki userType'ı güncelle

//   return NextResponse.json({ message: "Webhook received" }, { status: 200 });
// }
//* --------------- Last hit
import { getStripe } from "@/libs/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

  const stripe = getStripe();
  if (!WEBHOOK_SECRET) {
    return NextResponse.json("Webhook Secret Bulunamadı");
  }
  const body = await req.text();
  const sign = req.headers.get("stripe-signature");
  if (!sign) {
    return NextResponse.json("Signature bulunamadı");
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sign, WEBHOOK_SECRET);
  } catch (error: any) {
    console.error("Webhook signature verification failed", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout session eventine girdi...");
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items"],
          }
        );
        const customerId = session.customer as string;
        console.log(customerId);
        const customerDetails = session.customer_details;
        if (customerDetails?.email) {
          console.log(customerDetails.email);
          const line_items = session.line_items?.data || [];
          for (const item of line_items) {
            const priceId = item.price?.id;
            console.log(priceId);
          }
        }
        break;
      default:
        console.log(`Unhandle event type ${event.type}`);
        break;
    }
  } catch (error) {
    console.error("Error event sırasında oluştu", error);
    return new Response("Webhook Error", { status: 400 });
  }
  return NextResponse.json({ message: "Webhook Received" });
}
