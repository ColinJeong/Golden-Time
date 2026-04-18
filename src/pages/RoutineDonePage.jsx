import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import BottomNav from '../components/common/BottomNav'
import { storage } from '../utils/storage'

export default function RoutineDonePage() {
  const { routineId } = useParams()
  const navigate = useNavigate()

  const routines = storage.getRoutines()
  const routine = routines.find((r) => r.id === routineId)

  return (
    <div className="flex flex-col min-h-svh" style={{ backgroundColor: '#F5F6F8' }}>
      <Header title="운동 완료" onBack={() => navigate('/')} />

      <main className="flex-1 flex flex-col items-center justify-center" style={{ padding: '0 20px 40px' }}>
        {/* 완료 아이콘 */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
          style={{ backgroundColor: '#EDE8FD', marginBottom: 24 }}
        >
          🏆
        </div>

        {/* 타이틀 */}
        <p className="text-[24px] font-bold text-[#000000]" style={{ marginBottom: 8 }}>
          루틴 완료!
        </p>
        <p className="text-[15px] text-center" style={{ color: '#666666', marginBottom: 8 }}>
          {routine ? (
            <><span style={{ color: '#7B53EA', fontWeight: 700 }}>{routine.name}</span>의 모든 운동을 마쳤어요</>
          ) : (
            '모든 운동을 마쳤어요'
          )}
        </p>
        <p className="text-[13px] text-center" style={{ color: '#BEBCC2', marginBottom: 48 }}>
          {routine ? `총 ${routine.exercises.length}종목` : ''} · 오늘도 수고했어요 💪
        </p>

        {/* 버튼 */}
        <div className="w-full flex flex-col" style={{ gap: 12 }}>
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-2xl text-[16px] font-bold text-white"
            style={{ height: 56, backgroundColor: '#7B53EA' }}
          >
            홈으로 가기
          </button>
          <button
            onClick={() => navigate('/routine')}
            className="w-full rounded-2xl text-[16px] font-bold"
            style={{ height: 56, backgroundColor: '#F5F6F8', color: '#666666', border: '1px solid #E4E7ED' }}
          >
            루틴 목록으로
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
