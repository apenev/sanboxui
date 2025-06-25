"use client"

import { useState } from "react"
import { type Mail } from "../data/sales-data"

export function useMail() {
  const [mail, setMail] = useState<Mail | null>(null)

  return {
    mail,
    setMail,
  }
} 