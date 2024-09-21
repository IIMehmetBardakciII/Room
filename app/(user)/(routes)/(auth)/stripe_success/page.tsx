"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StripeSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState("Ödeme işlemi tamamlanıyor...");

  useEffect(() => {
    if (sessionId) {
      // Burada sessionId ile ilgili ek işlemler yapabilirsiniz.
      setMessage(`Ödeme başarılı! Oturum ID: ${sessionId}`);
    }
  }, [sessionId]);

  return <div>{message}</div>;
}
