import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MuscleMap from './MuscleMap'

export default function ExerciseCard({ exercise, bodyPart, isOpen, onToggle }) {
  const navigate = useNavigate()

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${isOpen ? '#C4B5FD' : '#E4E7ED'}` }}
    >
      {/* 기본 행 */}
      <div className="flex items-center" style={{ padding: '20px', gap: 12 }}>
        <div className="flex-1 min-w-0">
          <p className="text-[16px] font-bold text-[#000000]" style={{ marginBottom: 5 }}>{exercise.name}</p>
          {exercise.defaultSets && (
            <p className="text-[13px]" style={{ color: '#666666' }}>
              {exercise.defaultSets}세트 · {exercise.defaultReps}회
            </p>
          )}
        </div>
        <div className="flex items-center shrink-0" style={{ gap: 8 }}>
          {/* 상세보기 토글 */}
          <button
            onClick={onToggle}
            className="flex items-center rounded-xl text-[13px] font-medium transition-colors"
            style={{
              padding: '8px 12px',
              gap: 4,
              backgroundColor: isOpen ? '#EDE8FD' : '#F5F6F8',
              color: isOpen ? '#7B53EA' : '#999999',
            }}
          >
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            설명
          </button>
          {/* 시작 버튼 */}
          <button
            onClick={() => navigate(`/workout/${bodyPart}/${exercise.id}`)}
            className="rounded-xl text-[15px] font-bold text-white active:scale-95 transition-transform"
            style={{ backgroundColor: '#7B53EA', height: 44, paddingLeft: 20, paddingRight: 20 }}
          >
            시작
          </button>
        </div>
      </div>

      {/* 상세 영역 */}
      {isOpen && (
        <div style={{ borderTop: '1px solid #E4E7ED', padding: '20px 20px 24px' }}>
          {/* 운동 설명 */}
          {exercise.description && (
            <div className="rounded-xl" style={{ padding: '12px 16px', marginBottom: 16, backgroundColor: '#EDE8FD' }}>
              <p className="text-[13px] leading-relaxed" style={{ color: '#555555' }}>
                {exercise.description}
              </p>
            </div>
          )}

          {/* 동작 순서 */}
          {exercise.howTo && exercise.howTo.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p className="text-[13px] font-bold" style={{ color: '#333333', marginBottom: 8 }}>동작 순서</p>
              <div className="flex flex-col" style={{ gap: 8 }}>
                {exercise.howTo.map((step, i) => (
                  <div key={i} className="flex" style={{ gap: 10 }}>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{ backgroundColor: '#7B53EA', color: 'white', marginTop: 2 }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-[13px] leading-relaxed flex-1" style={{ color: '#444444' }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 근육 맵 */}
          {exercise.muscles && (
            <div>
              <p className="text-[13px] font-bold" style={{ color: '#333333', marginBottom: 12 }}>자극 부위</p>
              <MuscleMap muscles={exercise.muscles} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
