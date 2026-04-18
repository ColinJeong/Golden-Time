import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import BottomNav from '../components/common/BottomNav'
import SetLogger from '../components/workout/SetLogger'
import { DEFAULT_EXERCISES } from '../data/exercises'
import { storage } from '../utils/storage'
import { useWorkoutCycle } from '../hooks/useWorkoutCycle'

export default function RoutineWorkoutPage() {
  const { routineId, index } = useParams()
  const navigate = useNavigate()
  const { tryAdvance } = useWorkoutCycle()

  const routines = storage.getRoutines()
  const routine = routines.find((r) => r.id === routineId)

  if (!routine) {
    return (
      <div className="flex flex-col min-h-svh items-center justify-center" style={{ backgroundColor: '#F5F6F8' }}>
        <p className="text-[14px]" style={{ color: '#BEBCC2' }}>루틴을 찾을 수 없어요</p>
      </div>
    )
  }

  const currentIndex = Number(index)
  const exerciseIds = routine.exercises
  const totalCount = exerciseIds.length
  const exerciseId = exerciseIds[currentIndex]
  const exercise = DEFAULT_EXERCISES.find((e) => e.id === exerciseId)

  if (!exercise) {
    // 유효하지 않은 운동 — 다음으로 스킵
    const next = currentIndex + 1
    if (next < totalCount) {
      navigate(`/routine/${routineId}/workout/${next}`, { replace: true })
    } else {
      navigate('/routine', { replace: true })
    }
    return null
  }

  function handleSave(sets) {
    // 운동 기록 저장
    const logs = storage.getWorkoutLogs()
    const today = new Date().toISOString().slice(0, 10)
    logs.push({
      id: `log_${Date.now()}`,
      date: today,
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      bodyPart: exercise.bodyPart,
      sets,
      createdAt: new Date().toISOString(),
    })
    storage.setWorkoutLogs(logs)
    tryAdvance(exercise.bodyPart)

    // 다음 운동으로 이동, 마지막이면 완료 화면
    const next = currentIndex + 1
    if (next < totalCount) {
      navigate(`/routine/${routineId}/workout/${next}`)
    } else {
      navigate(`/routine/${routineId}/done`)
    }
  }

  const progressText = `${currentIndex + 1} / ${totalCount}`

  return (
    <div className="flex flex-col min-h-svh" style={{ backgroundColor: '#F5F6F8' }}>
      <Header
        title={exercise.name}
        onBack={() => {
          if (currentIndex === 0) navigate('/routine')
          else navigate(`/routine/${routineId}/workout/${currentIndex - 1}`)
        }}
        right={
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-medium" style={{ color: '#BEBCC2' }}>{routine.name}</span>
            <span className="text-[13px] font-bold" style={{ color: '#7B53EA' }}>{progressText}</span>
          </div>
        }
      />

      {/* 진행 바 */}
      <div className="w-full" style={{ height: 3, backgroundColor: '#E4E7ED' }}>
        <div
          className="h-full transition-all"
          style={{
            width: `${((currentIndex + 1) / totalCount) * 100}%`,
            backgroundColor: '#7B53EA',
          }}
        />
      </div>

      <main className="flex-1 overflow-y-auto" style={{ paddingBottom: 24 }}>
        <SetLogger exercise={exercise} onSave={handleSave} />
      </main>

      <BottomNav />
    </div>
  )
}
