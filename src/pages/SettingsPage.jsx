import { useState } from 'react'
import Header from '../components/common/Header'
import BottomNav from '../components/common/BottomNav'
import { storage } from '../utils/storage'

function Field({ label, unit, value, onChange, placeholder, optional }) {
  return (
    <div>
      <div className="flex items-center" style={{ gap: 6, marginBottom: 6 }}>
        <p className="text-[14px] font-bold" style={{ color: '#000000' }}>{label}</p>
        {optional && (
          <span className="text-[11px] font-medium rounded-full" style={{ padding: '2px 6px', backgroundColor: '#F5F6F8', color: '#BEBCC2' }}>선택</span>
        )}
      </div>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl text-[16px] focus:outline-none"
          style={{ paddingLeft: 16,
            height: 56,
            backgroundColor: '#F5F6F8',
            border: '1px solid #E4E7ED',
            color: '#000000',
            paddingRight: 48,
          }}
          onFocus={e => e.target.style.borderColor = '#7B53EA'}
          onBlur={e => e.target.style.borderColor = '#E4E7ED'}
        />
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-medium pointer-events-none"
          style={{ color: '#BEBCC2' }}
        >
          {unit}
        </span>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const saved = storage.getUserProfile()
  const [nickname, setNickname] = useState(saved?.nickname ?? '')
  const [height, setHeight] = useState(saved?.height ?? '')
  const [weight, setWeight] = useState(saved?.weight ?? '')
  const [skeletalMuscle, setSkeletalMuscle] = useState(saved?.skeletalMuscle ?? '')
  const [saved_, setSaved_] = useState(false)

  function handleSave() {
    const profile = {
      nickname: nickname.trim() || null,
      height: height !== '' ? Number(height) : null,
      weight: weight !== '' ? Number(weight) : null,
      skeletalMuscle: skeletalMuscle !== '' ? Number(skeletalMuscle) : null,
    }
    storage.setUserProfile(profile)
    setSaved_(true)
    setTimeout(() => setSaved_(false), 2000)
  }

  const canSave = nickname.trim() !== '' || height !== '' || weight !== ''

  return (
    <div className="flex flex-col min-h-svh" style={{ backgroundColor: '#F5F6F8' }}>
      <Header title="설정" />
      <main className="flex-1 flex flex-col" style={{ padding: '20px 20px 24px', gap: 24 }}>

        {/* 신체 정보 카드 */}
        <div className="bg-white rounded-2xl flex flex-col" style={{ padding: 20, gap: 16, border: '1px solid #E4E7ED' }}>
          <div>
            <p className="text-[16px] font-bold text-[#000000]">내 신체 정보</p>
            <p className="text-[13px]" style={{ color: '#BEBCC2', marginTop: 2 }}>운동 무게 추천에 활용돼요</p>
          </div>

          {/* 닉네임 */}
          <div>
            <p className="text-[14px] font-bold" style={{ color: '#000000', marginBottom: 6 }}>닉네임</p>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="예: 철수, 헬스왕"
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

          <Field label="키" unit="cm" value={height} onChange={setHeight} placeholder="예: 170" />
          <Field label="몸무게" unit="kg" value={weight} onChange={setWeight} placeholder="예: 65" />
          <Field label="골격근량" unit="kg" value={skeletalMuscle} onChange={setSkeletalMuscle} placeholder="예: 28" optional />

          <button
            onClick={handleSave}
            disabled={!canSave}
            className="w-full rounded-2xl text-[16px] font-bold text-white transition-all"
            style={{
              height: 56,
              backgroundColor: !canSave ? '#BEBCC2' : saved_ ? '#059669' : '#7B53EA',
            }}
          >
            {saved_ ? '✓ 저장됐어요!' : '저장하기'}
          </button>
        </div>

        {/* 무게 추천 안내 */}
        <div className="rounded-2xl" style={{ padding: 16, backgroundColor: '#EDE8FD', border: '1px solid #D4C7FA' }}>
          <p className="text-[13px] font-bold" style={{ color: '#7B53EA', marginBottom: 8 }}>💡 무게 추천 방식</p>
          <p className="text-[13px] leading-relaxed" style={{ color: '#555555' }}>
            몸무게 기준으로 각 운동에 맞는 시작 무게를 추천해드려요.
            골격근량을 입력하면 더 정확한 추천이 가능해요.
            운동 세트 기록 화면에서 추천 무게를 확인할 수 있어요.
          </p>
        </div>

      </main>
      <BottomNav />
    </div>
  )
}
