import { useState, useCallback } from 'react'
import { storage } from '../utils/storage'
import { WORKOUT_CYCLE } from '../data/exercises'

function today() {
  return new Date().toISOString().slice(0, 10)
}

export function useWorkoutCycle() {
  const [cycleIndex, setCycleIndex] = useState(() => storage.getCycleIndex())
  const [lastDate, setLastDate] = useState(() => storage.getCycleLastDate())

  const currentSlot = WORKOUT_CYCLE[cycleIndex]
  const isDoneToday = lastDate === today()
  const nextSlot = WORKOUT_CYCLE[(cycleIndex + 1) % WORKOUT_CYCLE.length]

  const tryAdvance = useCallback((bodyPart) => {
    // 전신복합은 사이클에 영향 없음
    if (bodyPart === 'compound') return

    const slot = WORKOUT_CYCLE[cycleIndex]
    if (!slot.bodyParts.includes(bodyPart)) return

    // 오늘 이미 진행했으면 중복 방지
    if (lastDate === today()) return

    const next = (cycleIndex + 1) % WORKOUT_CYCLE.length
    storage.setCycleIndex(next)
    storage.setCycleLastDate(today())
    setCycleIndex(next)
    setLastDate(today())
  }, [cycleIndex, lastDate])

  return { cycleIndex, currentSlot, nextSlot, isDoneToday, tryAdvance }
}
