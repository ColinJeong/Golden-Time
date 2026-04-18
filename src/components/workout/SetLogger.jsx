import { useState } from 'react'
import { storage } from '../../utils/storage'

// ── 무게 추천 계산 ────────────────────────────────────────
function calcRecommendedWeight(exercise) {
  const profile = storage.getUserProfile()
  if (!profile || !profile.weight) return null
  if (!exercise.weightRatio || exercise.weightRatio === 0) return null
  let ratio = exercise.weightRatio
  if (profile.skeletalMuscle) {
    const diff = profile.skeletalMuscle - 35
    ratio = ratio * (1 + diff * 0.03)
  }
  return Math.max(2.5, Math.round((profile.weight * ratio) / 2.5) * 2.5)
}

function round25(val) {
  return Math.max(2.5, Math.round(val / 2.5) * 2.5)
}

// ── 스타일별 세트 자동 구성 ──────────────────────────────
function buildSets(style, exercise, rw) {
  if (style === 'light') {
    const w = rw ? String(round25(rw * 0.7)) : ''
    return Array(3).fill(null).map(() => ({ weight: w, reps: '20' }))
  }
  if (style === 'pyramid') {
    const ratios = [0.7, 0.85, 1.0, 1.15, 1.4]
    const repsList = ['15', '12', '10', '8', '6']
    return ratios.map((r, i) => ({
      weight: rw ? String(round25(rw * r)) : '',
      reps: repsList[i],
    }))
  }
  if (style === 'heavy') {
    const w = rw ? String(round25(rw * 1.2)) : ''
    return Array(4).fill(null).map(() => ({ weight: w, reps: '6' }))
  }
  // 기본: defaultSets 수만큼 빈 세트
  const count = parseInt(String(exercise.defaultSets)) || 3
  return Array(count).fill(null).map(() => ({ weight: '', reps: '' }))
}

// ── 스타일 탭 정의 ────────────────────────────────────────
const STYLES = [
  { key: 'default', label: '기본' },
  { key: 'light',   label: '저중량\n고반복' },
  { key: 'pyramid', label: '피라미드' },
  { key: 'heavy',   label: '고중량' },
]

// ── SetRow ────────────────────────────────────────────────
function SetRow({ set, index, onChange, onRemove, canRemove }) {
  return (
    <div className="bg-white rounded-2xl" style={{ padding: '16px 20px', border: '1px solid #E4E7ED' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
        <span className="text-[14px] font-bold" style={{ color: '#7B53EA' }}>SET {index + 1}</span>
        {canRemove && (
          <button
            onClick={() => onRemove(index)}
            className="w-7 h-7 flex items-center justify-center rounded-full"
            style={{ backgroundColor: '#F5F6F8', color: '#BEBCC2' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="#BEBCC2" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
      <div className="flex" style={{ gap: 12 }}>
        <div className="flex-1">
          <p className="text-[12px] font-medium" style={{ color: '#666666', marginBottom: 6 }}>무게 (kg)</p>
          <input
            type="number"
            inputMode="decimal"
            value={set.weight}
            onChange={(e) => onChange(index, 'weight', e.target.value)}
            placeholder="0"
            className="w-full rounded-xl text-[16px] font-medium text-center focus:outline-none"
            style={{ height: 56, paddingLeft: 12, paddingRight: 12, backgroundColor: '#F5F6F8', border: '1px solid #E4E7ED', color: '#000000' }}
            onFocus={e => e.target.style.borderColor = '#7B53EA'}
            onBlur={e => e.target.style.borderColor = '#E4E7ED'}
          />
        </div>
        <div className="flex-1">
          <p className="text-[12px] font-medium" style={{ color: '#666666', marginBottom: 6 }}>횟수 (회)</p>
          <input
            type="number"
            inputMode="numeric"
            value={set.reps}
            onChange={(e) => onChange(index, 'reps', e.target.value)}
            placeholder="0"
            className="w-full rounded-xl text-[16px] font-medium text-center focus:outline-none"
            style={{ height: 56, paddingLeft: 12, paddingRight: 12, backgroundColor: '#F5F6F8', border: '1px solid #E4E7ED', color: '#000000' }}
            onFocus={e => e.target.style.borderColor = '#7B53EA'}
            onBlur={e => e.target.style.borderColor = '#E4E7ED'}
          />
        </div>
      </div>
    </div>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────────────────
export default function SetLogger({ exercise, onSave }) {
  const recommendedWeight = calcRecommendedWeight(exercise)
  const [style, setStyle] = useState('default')
  const [sets, setSets] = useState(() => buildSets('default', exercise, recommendedWeight))
  const [saving, setSaving] = useState(false)

  function handleStyleChange(newStyle) {
    setStyle(newStyle)
    setSets(buildSets(newStyle, exercise, recommendedWeight))
  }

  function handleChange(index, field, value) {
    setSets((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)))
  }

  function addSet() {
    const last = sets[sets.length - 1]
    setSets((prev) => [...prev, { weight: last.weight, reps: last.reps }])
  }

  function removeSet(index) {
    setSets((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSave() {
    const filled = sets.filter((s) => s.weight !== '' || s.reps !== '')
    if (filled.length === 0) return
    setSaving(true)
    setTimeout(() => {
      onSave(filled.map((s, i) => ({
        setNumber: i + 1,
        weight: Number(s.weight) || 0,
        reps: Number(s.reps) || 0,
      })))
    }, 800)
  }

  return (
    <div className="flex flex-col" style={{ padding: '20px 20px 24px', gap: 16 }}>

      {/* 메모 / 휴식 시간 */}
      {exercise.notes && (
        <div className="rounded-2xl" style={{ padding: '14px 20px', backgroundColor: '#EDE8FD', border: '1px solid #D4C7FA' }}>
          <p className="text-[13px] leading-relaxed font-medium" style={{ color: '#555555' }}>
            💡 {exercise.notes}
          </p>
        </div>
      )}
      {exercise.restTime && (
        <div className="rounded-2xl" style={{ padding: '12px 20px', backgroundColor: '#F5F6F8', border: '1px solid #E4E7ED' }}>
          <p className="text-[13px] font-medium" style={{ color: '#555555' }}>
            ⏱ 휴식: <span style={{ color: '#333333' }}>{exercise.restTime}</span>
          </p>
        </div>
      )}

      {/* 스타일 선택 */}
      <div>
        <p className="text-[13px] font-bold" style={{ color: '#666666', marginBottom: 8 }}>운동 스타일</p>
        <div className="grid grid-cols-4" style={{ gap: 8 }}>
          {STYLES.map(({ key, label }) => {
            const active = style === key
            return (
              <button
                key={key}
                onClick={() => handleStyleChange(key)}
                className="rounded-xl text-center transition-all"
                style={{
                  padding: '10px 4px',
                  backgroundColor: active ? '#7B53EA' : '#F5F6F8',
                  border: `1.5px solid ${active ? '#7B53EA' : '#E4E7ED'}`,
                  color: active ? '#FFFFFF' : '#666666',
                  fontSize: 12,
                  fontWeight: active ? 700 : 500,
                  lineHeight: 1.4,
                  whiteSpace: 'pre-line',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
        {/* 추천 무게 안내 */}
        {recommendedWeight && style !== 'default' && (
          <p className="text-[12px]" style={{ color: '#7B53EA', marginTop: 6 }}>
            기준 무게 {recommendedWeight}kg (체중 기반 추천)
          </p>
        )}
        {!recommendedWeight && style !== 'default' && (
          <p className="text-[12px]" style={{ color: '#BEBCC2', marginTop: 6 }}>
            설정에서 몸무게를 입력하면 무게도 자동으로 채워져요
          </p>
        )}
      </div>

      {/* 세트 목록 */}
      {sets.map((set, i) => (
        <SetRow
          key={i}
          set={set}
          index={i}
          onChange={handleChange}
          onRemove={removeSet}
          canRemove={sets.length > 1}
        />
      ))}

      {/* 세트 추가 */}
      <button
        onClick={addSet}
        className="w-full rounded-2xl text-[15px] font-bold"
        style={{ padding: '16px 0', border: '1.5px dashed #BEBCC2', color: '#7B53EA', backgroundColor: 'transparent' }}
      >
        + 세트 추가
      </button>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full rounded-2xl text-[16px] font-bold text-white transition-all"
        style={{
          height: 56,
          backgroundColor: saving ? '#059669' : '#7B53EA',
        }}
      >
        {saving ? '✓ 저장됐어요!' : '저장하기'}
      </button>
    </div>
  )
}
