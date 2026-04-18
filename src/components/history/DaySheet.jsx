import { useNavigate } from 'react-router-dom'
import { useWorkoutCycle } from '../../hooks/useWorkoutCycle'

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`
}

export default function DaySheet({ dateStr, logs, onClose }) {
  const navigate = useNavigate()
  const { currentSlot, nextSlot, isDoneToday } = useWorkoutCycle()

  const today = new Date().toISOString().slice(0, 10)
  const isToday = dateStr === today
  const isFuture = dateStr > today
  const isPast = dateStr < today

  // 오늘/미래: 추천 부위 표시
  const slot = isDoneToday ? nextSlot : currentSlot
  const recommendedPart = slot.bodyParts[0]

  return (
    <>
      {/* 딤 배경 */}
      <div
        className="fixed inset-0 z-20"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        onClick={onClose}
      />

      {/* 시트 */}
      <div
        className="fixed bottom-0 left-1/2 z-30 flex flex-col rounded-t-3xl"
        style={{
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 480,
          backgroundColor: '#FFFFFF',
          maxHeight: '70vh',
        }}
      >
        {/* 핸들 */}
        <div className="flex justify-center" style={{ paddingTop: 12, paddingBottom: 8 }}>
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#E4E7ED' }} />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between" style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          <p className="text-[17px] font-bold text-[#000000]">{formatDate(dateStr)}</p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ backgroundColor: '#F5F6F8' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="#999" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto" style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 24 }}>

          {/* 오늘 또는 미래: 추천 */}
          {(isToday || isFuture) && (
            <div>
              <div
                className="rounded-2xl"
                style={{ padding: 20, marginBottom: 16, backgroundColor: '#EDE8FD', border: '1px solid #D4C7FA' }}
              >
                <p className="text-[12px] font-bold" style={{ color: '#7B53EA', marginBottom: 8 }}>
                  {isToday ? '오늘 추천 운동' : '이날 추천 운동'}
                </p>
                <p className="text-[24px] font-bold text-[#000000]">{slot.label}</p>
                {isDoneToday && isToday && (
                  <p className="text-[12px]" style={{ color: '#059669', marginTop: 6 }}>✓ 오늘은 이미 완료했어요</p>
                )}
              </div>
              {isToday && (
                <button
                  onClick={() => { navigate(`/workout/${recommendedPart}`); onClose() }}
                  className="w-full rounded-2xl text-[15px] font-bold text-white"
                  style={{ height: 52, backgroundColor: '#7B53EA' }}
                >
                  운동 시작하기 →
                </button>
              )}
            </div>
          )}

          {/* 과거: 운동 기록 */}
          {isPast && logs.length === 0 && (
            <div className="flex flex-col items-center justify-center" style={{ paddingTop: 40, paddingBottom: 40, gap: 8 }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: '#F5F6F8' }}>
                📭
              </div>
              <p className="text-[14px]" style={{ color: '#BEBCC2' }}>운동 기록이 없어요</p>
            </div>
          )}

          {isPast && logs.length > 0 && (
            <div className="flex flex-col" style={{ gap: 12 }}>
              {logs.map((log) => (
                <div key={log.id} className="rounded-2xl bg-white" style={{ padding: 20, border: '1px solid #E4E7ED' }}>
                  <p className="text-[15px] font-bold" style={{ color: '#000000', marginBottom: 10 }}>{log.exerciseName}</p>
                  <div className="flex flex-wrap" style={{ gap: 8 }}>
                    {log.sets.map((s) => (
                      <span
                        key={s.setNumber}
                        className="text-[12px] font-medium rounded-xl"
                        style={{ padding: '6px 12px', backgroundColor: '#EDE8FD', color: '#7B53EA' }}
                      >
                        {s.setNumber}세트 · {s.weight}kg · {s.reps}회
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  )
}
