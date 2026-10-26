"use client";

import { useEffect, useState } from "react";
import { ContactSection } from "@/components/sections/RoiSimulator/RoiSimulator";
import { computeRoi, ROI_BOUNDS } from "@/lib/roi";

export function ContactPageForm() {
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    fetch("/api/csrf")
      .then((response) => response.json())
      .then((data: { token?: string }) => { if (data.token) setCsrfToken(data.token); })
      .catch(() => {});
  }, []);

  const monthlyBill = ROI_BOUNDS.default;
  const roi = computeRoi({ monthlyBillMad: monthlyBill });
  return <ContactSection csrfToken={csrfToken} monthlyBill={monthlyBill} roi={roi} />;
}
