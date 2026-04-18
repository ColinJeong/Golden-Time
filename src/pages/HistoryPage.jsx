import { useState, useMemo } from 'react'
import Header from '../components/common/Header'
import BottomNav from '../components/common/BottomNav'
import WorkoutCalendar from '../components/history/WorkoutCalendar'
import DaySheet from '../components/history/DaySheet'
import { storage } from '../utils/storage'

const MONTH_NAMES = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

export default function HistoryPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)

  const logs = storage.getWorkoutLogs()

  // 날짜별 운동 부위 맵: { 'YYYY-MM-DD': ['chest', 'arm', ...] }
  const workoutDates = useMemo(() => {
    const map = {}
    logs.forEach((log) => {
      if (!map[log.date]) map[log.date] = []
      if (!map[log.date].includes(log.bodyPart)) {
        map[log.date].push(log.bodyPart)
      }
    })
    return map
  }, [])

  // 선택한 날짜의 운동 로그
  const selectedLogs = useMemo(() => {
    if (!selectedDate) return []
    return logs.filter((l) => l.date === selectedDate)
  }, [selectedDate, logs])

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()

  return (
    <div className="flex flex-col min-h-svh" style={{ backgroundColor: '#F5F6F8' }}>
      <Header title="운동 기록" />

      <main className="flex-1 flex flex-col" style={{ padding: '16px 20px 24px', gap: 16 }}>
        {/* 월 네비게이션 */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="w-9 h-9 flex items-center justify-center rounded-xl active:scale-90 transition-transform"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4E7ED' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="#666" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="flex items-center" style={{ gap: 8 }}>
            <p className="text-[18px] font-bold text-[#000000]">{year}년 {MONTH_NAMES[month]}</p>
            {isCurrentMonth && (
              <span
                className="text-[11px] font-bold rounded-full"
                style={{ padding: '2px 8px', backgroundColor: '#EDE8FD', color: '#7B53EA' }}
              >
                이번달
              </span>
            )}
          </div>

          <button
            onClick={nextMonth}
            className="w-9 h-9 flex items-center justify-center rounded-xl active:scale-90 transition-transform"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4E7ED' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#666" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 캘린더 */}
        <WorkoutCalendar
          year={year}
          month={month}
          workoutDates={workoutDates}
          onDateClick={(date) => setSelectedDate(date)}
        />

        {/* 이번달 운동 횟수 요약 */}
        {(() => {
          const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`
          const daysWorked = Object.keys(workoutDates).filter(d => d.startsWith(monthPrefix)).length
          if (daysWorked === 0) return (
            <div className="flex flex-col items-center" style={{ paddingTop: 24, paddingBottom: 24, gap: 8 }}>
              <p className="text-[14px]" style={{ color: '#BEBCC2' }}>이달 운동 기록이 없어요. 첫 운동을 시작해봐요! 💪</p>
            </div>
          )
          return (
            <div
              className="rounded-2xl flex items-center"
              style={{ padding: 20, gap: 16, backgroundColor: '#FFFFFF', border: '1px solid #E4E7ED' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] shrink-0"
                style={{ backgroundColor: '#EDE8FD' }}
              >
                🏋️
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#000000]">이번달 <span style={{ color: '#7B53EA' }}>{daysWorked}일</span> 운동했어요</p>
                <p className="text-[12px]" style={{ color: '#BEBCC2', marginTop: 5 }}>날짜를 눌러 상세 기록을 확인하세요</p>
              </div>
            </div>
          )
        })()}
      </main>

      <BottomNav />

      {/* 날짜 클릭 바텀 시트 */}
      {selectedDate && (
        <DaySheet
          dateStr={selectedDate}
          logs={selectedLogs}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}
