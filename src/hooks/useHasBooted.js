import { useState, useEffect } from 'react'

export function useHasBooted() {
  const [hasBooted, setHasBooted] = useState(() => {
    return localStorage.getItem('abishek_booted') === 'true'
  })

  const markBooted = () => {
    localStorage.setItem('abishek_booted', 'true')
    setHasBooted(true)
  }

  return { hasBooted, markBooted }
}
