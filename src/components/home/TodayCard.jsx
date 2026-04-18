import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BodyPartIcon, { PART_COLORS } from '../common/BodyPartIcon'
import { WORKOUT_CYCLE } from '../../data/exercises'

// ── 유머러스 인사말 목록 ──────────────────────────────────
const GREETINGS = [
  (n) => `${n}오늘도 득근 하셨습니까? 🏋️`,
  (n) => `${n}근육이 당신을 기다립니다 💪`,
  (n) => `${n}안 오면 근손실입니다 📉`,
  (n) => `${n}오늘도 철봉에 몸 바치러 오셨군요`,
  (n) => `${n}득근의 시간이 돌아왔습니다 ⏰`,
  (n) => `${n}근육은 거짓말을 하지 않습니다`,
  (n) => `${n}오늘 쉬면 내일 후회합니다`,
  (n) => `${n}몸은 배신하지 않습니다 🔥`,
  (n) => `${n}오늘의 땀이 내일의 근육입니다`,
  (n) => `${n}헬스장이 당신을 부릅니다 📣`,
  (n) => `${n}오늘 운동 안 하면... 알죠? 😤`,
  (n) => `${n}근손실 방지를 위해 출석 확인합니다`,
  (n) => `${n}오늘도 위대한 하루 시작합니다 ✨`,
  (n) => `${n}쉬는 날은 내일 모레입니다`,
  (n) => `${n}황금 시간에 오신 걸 환영합니다 🏆`,
]

function CycleDots({ current, done }) {
  return (
    <div className="flex items-center" style={{ gap: 6 }}>
      {WORKOUT_CYCLE.map((slot) => {
        const isActive = slot.slot === current
        const isPast = done ? slot.slot === current : slot.slot < current
        return (
          <div
            key={slot.slot}
            className="rounded-full transition-all"
            style={{
              width: isActive ? 20 : 7,
              height: 7,
              backgroundColor: isActive ? '#7B53EA' : isPast ? '#C4B5FD' : '#D9D4F5',
            }}
          />
        )
      })}
    </div>
  )
}

export default function TodayCard({ currentSlot, nextSlot, isDoneToday, nickname }) {
  const navigate = useNavigate()
  const slot = isDoneToday ? nextSlot : currentSlot
  const primaryBodyPart = slot.bodyParts[0]
  const colors = PART_COLORS[primaryBodyPart] ?? { bg: '#EDE8FD', stroke: '#7B53EA' }

  // 마운트 시 1회 랜덤 선택
  const [greetingFn] = useState(
    () => GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
  )

  const namePrefix = nickname ? `${nickname}님, ` : ''
  const greetingText = greetingFn(namePrefix)

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${colors.bg} 0%, #ffffff 100%)`, border: '1px solid #E4E7ED' }}
    >
      <div style={{ padding: '20px 22px 22px' }}>

        {/* 웰컴 메시지 — 크고 굵게 */}
        <p
          className="font-bold"
          style={{ fontSize: 17, color: '#5B35C8', marginBottom: 18, lineHeight: 1.4 }}
        >
          {greetingText}
        </p>

        {/* 뱃지 + 아이콘 + 부위명 한 블록 */}
        <div className="flex items-start justify-between" style={{ marginBottom: 14 }}>
          <div>
            {/* 뱃지 */}
            <div style={{ marginBottom: 6 }}>
              {isDoneToday ? (
                <span
                  className="text-[12px] font-bold rounded-full"
                  style={{ padding: '3px 10px', backgroundColor: '#D1FAE5', color: '#059669' }}
                >
                  ✓ 오늘 완료
                </span>
              ) : (
                <span
                  className="text-[12px] font-bold rounded-full"
                  style={{ padding: '3px 10px', backgroundColor: 'rgba(123,83,234,0.12)', color: '#7B53EA' }}
                >
                  오늘 추천
                </span>
              )}
            </div>
            {/* 부위 이름 */}
            <p className="font-bold text-[#000000]" style={{ fontSize: 32, lineHeight: 1.1 }}>
              {slot.label}
            </p>
            {/* 다음 운동 안내 */}
            {isDoneToday && (
              <p className="text-[13px]" style={{ color: '#666666', marginTop: 6 }}>
                다음은 <span style={{ color: '#7B53EA', fontWeight: 700 }}>{nextSlot.label}</span>
              </p>
            )}
          </div>

          {/* 아이콘 박스 */}
          <div
            className="flex items-center justify-center rounded-2xl shrink-0"
            style={{ width: 60, height: 60, backgroundColor: colors.bg }}
          >
            <BodyPartIcon id={primaryBodyPart} size={34} />
          </div>
        </div>

        {/* 사이클 도트 */}
        <div style={{ marginBottom: 16 }}>
          <CycleDots current={isDoneToday ? nextSlot.slot : currentSlot.slot} done={isDoneToday} />
        </div>

        {/* 버튼 */}
        {!isDoneToday ? (
          <button
            onClick={() => navigate(`/workout/${primaryBodyPart}`)}
            className="w-full rounded-2xl font-bold text-white flex items-center justify-center"
            style={{ height: 52, gap: 8, fontSize: 15, backgroundColor: '#7B53EA' }}
          >
            운동 시작하기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <button
            onClick={() => navigate(`/workout/${nextSlot.bodyParts[0]}`)}
            className="w-full rounded-2xl font-bold flex items-center justify-center"
            style={{ height: 52, gap: 8, fontSize: 15, backgroundColor: '#F5F6F8', color: '#7B53EA', border: '1.5px solid #C4B5FD' }}
          >
            다음 운동 미리 하기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="#7B53EA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
