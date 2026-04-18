import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import BottomNav from '../components/common/BottomNav'
import ExerciseCard from '../components/workout/ExerciseCard'
import SetLogger from '../components/workout/SetLogger'
import { BODY_PARTS, DEFAULT_EXERCISES } from '../data/exercises'
import { storage } from '../utils/storage'
import { useWorkoutCycle } from '../hooks/useWorkoutCycle'

export default function WorkoutPage() {
  const { bodyPart, exerciseId } = useParams()
  const navigate = useNavigate()
  const { tryAdvance } = useWorkoutCycle()
  const [openId, setOpenId] = useState(null)

  const partInfo = BODY_PARTS.find((p) => p.id === bodyPart)
  const exercises = DEFAULT_EXERCISES.filter((e) => e.bodyPart === bodyPart)
  const selectedExercise = exercises.find((e) => e.id === exerciseId)

  function handleSave(sets) {
    const logs = storage.getWorkoutLogs()
    const today = new Date().toISOString().slice(0, 10)
    logs.push({
      id: `log_${Date.now()}`,
      date: today,
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.name,
      bodyPart,
      sets,
      createdAt: new Date().toISOString(),
    })
    storage.setWorkoutLogs(logs)
    tryAdvance(bodyPart)
    navigate(`/workout/${bodyPart}`)
  }

  function toggleOpen(id) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  if (selectedExercise) {
    return (
      <div className="flex flex-col min-h-svh" style={{ backgroundColor: '#F5F6F8' }}>
        <Header title={selectedExercise.name} onBack={() => navigate(`/workout/${bodyPart}`)} />
        <main className="flex-1 overflow-y-auto" style={{ paddingBottom: 24 }}>
          <SetLogger exercise={selectedExercise} onSave={handleSave} />
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-svh" style={{ backgroundColor: '#F5F6F8' }}>
      <Header
        title={partInfo ? `${partInfo.label} 운동` : '운동 목록'}
        onBack={() => navigate('/')}
      />
      <main className="flex-1 flex flex-col gap-4" style={{ padding: '20px 20px 24px' }}>
        {exercises.length === 0 ? (
          <p className="text-[14px] text-center mt-10" style={{ color: '#BEBCC2' }}>
            등록된 운동이 없습니다.
          </p>
        ) : (
          exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              bodyPart={bodyPart}
              isOpen={openId === ex.id}
              onToggle={() => toggleOpen(ex.id)}
            />
          ))
        )}
      </main>
      <BottomNav />
    </div>
  )
}
