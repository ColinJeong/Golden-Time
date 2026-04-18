const KEYS = {
  EXERCISES:       'pt_exercises',
  WORKOUT_LOGS:    'pt_workout_logs',
  ROUTINES:        'pt_routines',
  CYCLE_INDEX:     'pt_cycle_index',
  CYCLE_LAST_DATE: 'pt_cycle_last_date',
  USER_PROFILE:    'pt_user_profile',
}

export function getItem(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const storage = {
  getExercises:    () => getItem(KEYS.EXERCISES),
  setExercises:    (data) => setItem(KEYS.EXERCISES, data),

  getWorkoutLogs:  () => getItem(KEYS.WORKOUT_LOGS),
  setWorkoutLogs:  (data) => setItem(KEYS.WORKOUT_LOGS, data),

  getRoutines:     () => getItem(KEYS.ROUTINES),
  setRoutines:     (data) => setItem(KEYS.ROUTINES, data),

  getCycleIndex:   () => {
    const v = localStorage.getItem(KEYS.CYCLE_INDEX)
    return v !== null ? Number(v) : 0
  },
  setCycleIndex:   (idx) => localStorage.setItem(KEYS.CYCLE_INDEX, String(idx)),

  getCycleLastDate: () => localStorage.getItem(KEYS.CYCLE_LAST_DATE) ?? '',
  setCycleLastDate: (date) => localStorage.setItem(KEYS.CYCLE_LAST_DATE, date),

  getUserProfile: () => {
    try {
      const data = localStorage.getItem(KEYS.USER_PROFILE)
      return data ? JSON.parse(data) : null
    } catch { return null }
  },
  setUserProfile: (profile) => setItem(KEYS.USER_PROFILE, profile),
}
