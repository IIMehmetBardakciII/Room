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
// import { stripe } from "@/libs/stripe/config";
// import { NextRequest, NextResponse } from "next/server";
// import { initAdmin } from "@/libs/firebaseAdmin/config";
// import { DocumentData, QuerySnapshot } from "firebase-admin/firestore";
// import { Timestamp } from "firebase-admin/firestore";

// export async function POST(req: NextRequest) {
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
import { NextRequest } from "next/server";
import Stripe from "stripe";

// Stripe nesnesini başlatıyoruz
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

// bodyParser'ı devre dışı bırakıyoruz
export const config = {
  api: {
    bodyParser: false, // Body parser'ı kapalı tutuyoruz
  },
};

// Ham body'yi almak için yardımcı bir fonksiyon
async function getRawBody(req: NextRequest): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req.body as any) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

// Webhook işleme fonksiyonu
export async function POST(req: NextRequest) {
  try {
    // Ham body'yi alıyoruz
    const rawBody = await getRawBody(req);

    // Stripe-signature başlığını alıyoruz
    const stripeSignature = req.headers.get("stripe-signature");
    if (!stripeSignature) {
      throw new Error("Stripe signature header is missing.");
    }

    // Stripe webhook imzasını doğruluyoruz
    const event = stripe.webhooks.constructEvent(
      rawBody.toString(), // Buffer'ı stringe çeviriyoruz
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY as string
    );

    // Event'in tipine göre işlem yapabilirsiniz
    if (event.type === "checkout.session.completed") {
      const session = event.data.object; // Stripe Checkout Session objesini alıyoruz
      console.log("Checkout session completed:", session);
      // Burada ödeme sonrası işlemleri yapabilirsiniz
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}
