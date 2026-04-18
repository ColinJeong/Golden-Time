import { PART_COLORS } from '../common/BodyPartIcon'

const DOW = ['일', '월', '화', '수', '목', '금', '토']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay()
}
function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function WorkoutCalendar({ year, month, workoutDates, onDateClick }) {
  const today = new Date().toISOString().slice(0, 10)
  const daysInMonth = getDaysInMonth(year, month)
  const firstDow = getFirstDayOfWeek(year, month)

  // 달력 셀 배열 (null = 빈 칸)
  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #E4E7ED' }}>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b" style={{ borderColor: '#E4E7ED' }}>
        {DOW.map((d, i) => (
          <div
            key={d}
            className="text-center text-[12px] font-bold"
            style={{ paddingTop: 8, paddingBottom: 8, color: i === 0 ? '#EF4444' : i === 6 ? '#6366F1' : '#999999' }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7" style={{ padding: '4px 4px 8px' }}>
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />

          const dateStr = toDateStr(year, month, day)
          const isToday = dateStr === today
          const parts = workoutDates[dateStr] ?? []
          const hasDots = parts.length > 0
          const dow = (firstDow + day - 1) % 7

          return (
            <button
              key={dateStr}
              onClick={() => onDateClick(dateStr)}
              className="flex flex-col items-center rounded-xl active:bg-[#F5F6F8] transition-colors"
              style={{ paddingTop: 6, paddingBottom: 6 }}
            >
              {/* 날짜 숫자 */}
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-semibold"
                style={{
                  backgroundColor: isToday ? '#7B53EA' : 'transparent',
                  color: isToday ? '#FFFFFF' : dow === 0 ? '#EF4444' : dow === 6 ? '#6366F1' : '#333333',
                }}
              >
                {day}
              </div>

              {/* 운동 기록 도트 */}
              <div className="flex h-2 items-center" style={{ gap: 2, marginTop: 2 }}>
                {hasDots && parts.slice(0, 3).map((part, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: 5,
                      height: 5,
                      backgroundColor: PART_COLORS[part]?.stroke ?? '#7B53EA',
                    }}
                  />
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
