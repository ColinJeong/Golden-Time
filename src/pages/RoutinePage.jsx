import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import BottomNav from '../components/common/BottomNav'
import { storage } from '../utils/storage'
import { DEFAULT_EXERCISES, BODY_PARTS } from '../data/exercises'

function partLabel(id) {
  return BODY_PARTS.find((p) => p.id === id)?.label ?? id
}

function RoutineForm({ onSave, onCancel }) {
  const [name, setName] = useState('')
  const [selected, setSelected] = useState([])

  function toggle(id) {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  const grouped = BODY_PARTS.map((part) => ({
    ...part,
    exercises: DEFAULT_EXERCISES.filter((e) => e.bodyPart === part.id),
  }))

  function handleSave() {
    if (!name.trim() || selected.length === 0) return
    onSave({ name: name.trim(), exercises: selected })
  }

  return (
    <div className="flex flex-col" style={{ gap: 16 }}>
      <div>
        <p className="text-[14px] font-bold" style={{ color: '#000000', marginBottom: 6 }}>루틴 이름</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 가슴/삼두 루틴"
          className="w-full rounded-xl text-[16px] focus:outline-none"
          style={{
            height: 56,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: '#F5F6F8',
            border: '1px solid #E4E7ED',
            color: '#000000',
          }}
          onFocus={e => e.target.style.borderColor = '#7B53EA'}
          onBlur={e => e.target.style.borderColor = '#E4E7ED'}
        />
      </div>

      {grouped.map(({ id, label, icon, exercises }) => exercises.length === 0 ? null : (
        <div key={id}>
          <p className="text-[13px] font-bold" style={{ color: '#7B53EA', marginBottom: 10 }}>
            {icon} {label}
          </p>
          <div className="flex flex-col" style={{ gap: 10 }}>
            {exercises.map((ex) => {
              const checked = selected.includes(ex.id)
              return (
                <label
                  key={ex.id}
                  className="flex items-center bg-white rounded-xl cursor-pointer"
                  style={{ padding: '16px 20px', gap: 12, border: `1px solid ${checked ? '#7B53EA' : '#E4E7ED'}` }}
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                    style={{ backgroundColor: checked ? '#7B53EA' : '#F5F6F8', border: `1.5px solid ${checked ? '#7B53EA' : '#BEBCC2'}` }}
                  >
                    {checked && (
                      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" checked={checked} onChange={() => toggle(ex.id)} className="hidden" />
                  <span className="text-[15px] font-medium" style={{ color: '#333333' }}>{ex.name}</span>
                </label>
              )
            })}
          </div>
        </div>
      ))}

      <div className="flex" style={{ gap: 12, paddingTop: 8 }}>
        <button
          onClick={onCancel}
          className="flex-1 rounded-2xl text-[16px] font-bold"
          style={{ height: 56, backgroundColor: '#E4E7ED', color: '#333333' }}
        >
          취소
        </button>
        <button
          onClick={handleSave}
          disabled={!name.trim() || selected.length === 0}
          className="flex-1 rounded-2xl text-[16px] font-bold text-white"
          style={{ height: 56, backgroundColor: !name.trim() || selected.length === 0 ? '#BEBCC2' : '#7B53EA' }}
        >
          저장
        </button>
      </div>
    </div>
  )
}

export default function RoutinePage() {
  const [routines, setRoutines] = useState(() => storage.getRoutines())
  const [creating, setCreating] = useState(false)
  const navigate = useNavigate()

  function handleSave({ name, exercises }) {
    const newRoutine = { id: `routine_${Date.now()}`, name, exercises, createdAt: new Date().toISOString() }
    const updated = [...routines, newRoutine]
    storage.setRoutines(updated)
    setRoutines(updated)
    setCreating(false)
  }

  function handleDelete(id) {
    const updated = routines.filter((r) => r.id !== id)
    storage.setRoutines(updated)
    setRoutines(updated)
  }

  return (
    <div className="flex flex-col min-h-svh" style={{ backgroundColor: '#F5F6F8' }}>
      <Header title="내 루틴" />
      <main className="flex-1 flex flex-col" style={{ padding: '20px 20px 24px', gap: 16 }}>
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="w-full rounded-2xl text-[15px] font-bold transition-colors"
            style={{ padding: '16px 0', border: '1.5px dashed #BEBCC2', color: '#7B53EA', backgroundColor: 'transparent' }}
          >
            + 새 루틴 만들기
          </button>
        )}

        {creating && <RoutineForm onSave={handleSave} onCancel={() => setCreating(false)} />}

        {!creating && routines.length === 0 && (
          <div className="flex flex-col items-center justify-center" style={{ marginTop: 64, gap: 12 }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: '#EDE8FD' }}>
              📋
            </div>
            <p className="text-[14px]" style={{ color: '#BEBCC2' }}>저장된 루틴이 없어요</p>
          </div>
        )}

        {!creating && routines.map((routine) => {
          const parts = [...new Set(
            routine.exercises
              .map((id) => DEFAULT_EXERCISES.find((e) => e.id === id)?.bodyPart)
              .filter(Boolean)
          )].map(partLabel).join(' · ')

          return (
            <div key={routine.id} className="bg-white rounded-2xl" style={{ padding: 20, border: '1px solid #E4E7ED' }}>
              <p className="text-[16px] font-bold text-[#000000]">{routine.name}</p>
              <p className="text-[13px]" style={{ color: '#666666', marginTop: 4, marginBottom: 16 }}>
                {parts} · {routine.exercises.length}종목
              </p>
              <div className="flex" style={{ gap: 12 }}>
                <button
                  onClick={() => navigate(`/routine/${routine.id}/workout/0`)}
                  className="flex-1 rounded-xl text-[15px] font-bold text-white"
                  style={{ height: 44, backgroundColor: '#7B53EA' }}
                >
                  시작
                </button>
                <button
                  onClick={() => handleDelete(routine.id)}
                  className="rounded-xl text-[14px] font-medium"
                  style={{ height: 44, paddingLeft: 20, paddingRight: 20, backgroundColor: '#F5F6F8', color: '#666666', border: '1px solid #E4E7ED' }}
                >
                  삭제
                </button>
              </div>
            </div>
          )
        })}
      </main>
      <BottomNav />
    </div>
  )
}
