"use client"

import { useState } from "react"

type Config = {
  selected: string | null
}

export function useMail() {
  const [config, setConfig] = useState<Config>({
    selected: null
  })

  return [
    config,
    (updates: Partial<Config>) => {
      setConfig(prev => ({ ...prev, ...updates }))
    }
  ] as const
} 