import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from './useScrollReveal'

export function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0)
  const [ref, isVisible] = useScrollReveal(0.3)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isVisible || hasRun.current) return
    hasRun.current = true
    const startTime = performance.now()
    
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(easeOutCubic(progress) * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [isVisible, target, duration])

  return [ref, count]
}
