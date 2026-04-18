import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import BottomNav from '../components/common/BottomNav'
import TodayCard from '../components/home/TodayCard'
import BodyPartCard from '../components/home/BodyPartCard'
import BodyPartIcon, { PART_COLORS } from '../components/common/BodyPartIcon'
import { BODY_PARTS } from '../data/exercises'
import { useWorkoutCycle } from '../hooks/useWorkoutCycle'
import { storage } from '../utils/storage'

function todayLabel() {
  const d = new Date()
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`
}

// 닉네임 미설정 시 랜덤 부여 목록
const DEFAULT_NICKNAMES = [
  '헬스왕', '득근러', '운동천재', '철인', '근육맨',
  '헬린이', '스쿼트왕', '덤벨달인', '헬창', '아이언맨',
  '단백질러', '벤치왕', '데드킹', '런지퀸', '플랭크신',
]

// 사이클 부위 제외한 나머지 (전신복합, 서킷은 아래 별도 처리)
const CYCLE_PARTS = ['leg', 'back', 'chest', 'shoulder', 'arm', 'circuit']
const GRID_PARTS = BODY_PARTS.filter((p) => CYCLE_PARTS.includes(p.id) && p.id !== 'circuit')

function getOrInitNickname() {
  const profile = storage.getUserProfile()
  if (profile?.nickname) return profile.nickname
  const randomNick = DEFAULT_NICKNAMES[Math.floor(Math.random() * DEFAULT_NICKNAMES.length)]
  storage.setUserProfile({ ...(profile ?? {}), nickname: randomNick })
  return randomNick
}

export default function HomePage() {
  const { currentSlot, nextSlot, isDoneToday } = useWorkoutCycle()
  const navigate = useNavigate()
  const compoundColors = PART_COLORS['compound']
  const circuitColors = PART_COLORS['circuit']
  const [nickname] = useState(() => getOrInitNickname())

  return (
    <div className="flex flex-col min-h-svh" style={{ backgroundColor: '#F5F6F8' }}>
      <Header title="Golden Time" />

      <main className="flex-1 flex flex-col" style={{ padding: '20px 20px 28px', gap: 20 }}>
        {/* 날짜 */}
        <div>
          <p className="text-[13px] font-semibold" style={{ color: '#7B53EA' }}>{todayLabel()}</p>
        </div>

        {/* 오늘의 추천 */}
        <TodayCard currentSlot={currentSlot} nextSlot={nextSlot} isDoneToday={isDoneToday} nickname={nickname} />

        {/* 전신복합 보너스 */}
        <button
          onClick={() => navigate('/workout/compound')}
          className="flex items-center bg-white rounded-2xl active:scale-95 transition-transform text-left"
          style={{ padding: '20px', gap: 16, border: '1px solid #E4E7ED' }}
        >
          <div
            className="flex items-center justify-center rounded-xl shrink-0"
            style={{ width: 48, height: 48, backgroundColor: compoundColors.bg }}
          >
            <BodyPartIcon id="compound" size={26} />
          </div>
          <div>
            <p className="text-[15px] font-bold text-[#000000]">전신 복합</p>
            <p className="text-[12px]" style={{ color: '#BEBCC2', marginTop: 4 }}>데드리프트 등 — 사이클 외 보너스</p>
          </div>
          <svg className="ml-auto shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 9H12M9 6L12 9L9 12" stroke="#BEBCC2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* 직접 선택 */}
        <div>
          <p className="text-[13px] font-bold" style={{ color: '#666666', marginBottom: 12 }}>직접 선택</p>
          <div className="grid grid-cols-2" style={{ gap: 12 }}>
            {GRID_PARTS.map((part) => (
              <BodyPartCard key={part.id} id={part.id} label={part.label} />
            ))}
            {/* 서킷은 팔과 같은 날 — 단독 진입 허용 */}
            <BodyPartCard id="circuit" label="서킷" />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
