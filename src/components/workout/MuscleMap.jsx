// muscle 키: chest | lat | trap | shoulder | bicep | tricep | forearm | quad | hamstring | glute | calf | abs

const PRIMARY = '#7B53EA'
const SECONDARY = '#C4B5FD'
const INACTIVE = '#E8E8EE'
const OUTLINE = '#CCCCDD'

function c(name, muscles) {
  if (muscles.primary.includes(name)) return PRIMARY
  if (muscles.secondary.includes(name)) return SECONDARY
  return INACTIVE
}

function FrontBody({ muscles }) {
  return (
    <svg viewBox="0 0 72 168" width="80" style={{ display: 'block' }}>
      {/* ── 실루엣 배경 ── */}
      {/* 머리 */}
      <ellipse cx="36" cy="11" rx="10" ry="11" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      {/* 목 */}
      <rect x="32" y="22" width="8" height="7" rx="2" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      {/* 몸통 */}
      <path d="M15,29 Q10,31 8,38 L8,90 Q8,94 12,94 L60,94 Q64,94 64,90 L64,38 Q62,31 57,29 Z" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      {/* 왼팔 상완 */}
      <rect x="2" y="30" width="10" height="34" rx="5" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      {/* 오른팔 상완 */}
      <rect x="60" y="30" width="10" height="34" rx="5" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      {/* 왼팔 하완 */}
      <rect x="1" y="65" width="9" height="26" rx="4" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      {/* 오른팔 하완 */}
      <rect x="62" y="65" width="9" height="26" rx="4" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      {/* 왼 허벅지 */}
      <rect x="15" y="96" width="18" height="38" rx="8" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      {/* 오른 허벅지 */}
      <rect x="39" y="96" width="18" height="38" rx="8" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      {/* 왼 종아리 */}
      <rect x="16" y="136" width="16" height="28" rx="7" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      {/* 오른 종아리 */}
      <rect x="40" y="136" width="16" height="28" rx="7" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>

      {/* ── 근육 오버레이 ── */}
      {/* 어깨 */}
      <ellipse cx="10" cy="36" rx="8" ry="7" fill={c('shoulder', muscles)} opacity="0.85"/>
      <ellipse cx="62" cy="36" rx="8" ry="7" fill={c('shoulder', muscles)} opacity="0.85"/>
      {/* 가슴 */}
      <ellipse cx="27" cy="46" rx="10" ry="9" fill={c('chest', muscles)} opacity="0.85"/>
      <ellipse cx="45" cy="46" rx="10" ry="9" fill={c('chest', muscles)} opacity="0.85"/>
      {/* 복근 (3쌍) */}
      <rect x="28" y="58" width="7" height="7" rx="2" fill={c('abs', muscles)} opacity="0.85"/>
      <rect x="37" y="58" width="7" height="7" rx="2" fill={c('abs', muscles)} opacity="0.85"/>
      <rect x="28" y="67" width="7" height="6" rx="2" fill={c('abs', muscles)} opacity="0.85"/>
      <rect x="37" y="67" width="7" height="6" rx="2" fill={c('abs', muscles)} opacity="0.85"/>
      <rect x="28" y="75" width="7" height="6" rx="2" fill={c('abs', muscles)} opacity="0.85"/>
      <rect x="37" y="75" width="7" height="6" rx="2" fill={c('abs', muscles)} opacity="0.85"/>
      {/* 이두 */}
      <ellipse cx="7" cy="43" rx="4" ry="9" fill={c('bicep', muscles)} opacity="0.85"/>
      <ellipse cx="65" cy="43" rx="4" ry="9" fill={c('bicep', muscles)} opacity="0.85"/>
      {/* 전완 */}
      <ellipse cx="5.5" cy="73" rx="3.5" ry="9" fill={c('forearm', muscles)} opacity="0.85"/>
      <ellipse cx="66.5" cy="73" rx="3.5" ry="9" fill={c('forearm', muscles)} opacity="0.85"/>
      {/* 대퇴사두 */}
      <ellipse cx="24" cy="112" rx="9" ry="16" fill={c('quad', muscles)} opacity="0.85"/>
      <ellipse cx="48" cy="112" rx="9" ry="16" fill={c('quad', muscles)} opacity="0.85"/>
      {/* 종아리 (전면) */}
      <ellipse cx="24" cy="146" rx="7" ry="11" fill={c('calf', muscles)} opacity="0.85"/>
      <ellipse cx="48" cy="146" rx="7" ry="11" fill={c('calf', muscles)} opacity="0.85"/>
    </svg>
  )
}

function BackBody({ muscles }) {
  return (
    <svg viewBox="0 0 72 168" width="80" style={{ display: 'block' }}>
      {/* ── 실루엣 배경 ── */}
      <ellipse cx="36" cy="11" rx="10" ry="11" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      <rect x="32" y="22" width="8" height="7" rx="2" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      <path d="M15,29 Q10,31 8,38 L8,90 Q8,94 12,94 L60,94 Q64,94 64,90 L64,38 Q62,31 57,29 Z" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      <rect x="2" y="30" width="10" height="34" rx="5" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      <rect x="60" y="30" width="10" height="34" rx="5" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      <rect x="1" y="65" width="9" height="26" rx="4" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      <rect x="62" y="65" width="9" height="26" rx="4" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      <rect x="15" y="96" width="18" height="38" rx="8" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      <rect x="39" y="96" width="18" height="38" rx="8" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      <rect x="16" y="136" width="16" height="28" rx="7" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>
      <rect x="40" y="136" width="16" height="28" rx="7" fill="#F2F2F7" stroke={OUTLINE} strokeWidth="0.6"/>

      {/* ── 근육 오버레이 ── */}
      {/* 어깨 후면 */}
      <ellipse cx="10" cy="36" rx="8" ry="7" fill={c('shoulder', muscles)} opacity="0.85"/>
      <ellipse cx="62" cy="36" rx="8" ry="7" fill={c('shoulder', muscles)} opacity="0.85"/>
      {/* 승모근 */}
      <path d="M24,29 Q36,40 48,29 Q54,32 57,38 L50,50 Q36,55 22,50 L15,38 Q18,32 24,29 Z" fill={c('trap', muscles)} opacity="0.85"/>
      {/* 광배근 */}
      <path d="M12,42 Q14,50 16,58 L24,68 Q28,70 32,68 L32,52 Q28,44 20,40 Z" fill={c('lat', muscles)} opacity="0.85"/>
      <path d="M60,42 Q58,50 56,58 L48,68 Q44,70 40,68 L40,52 Q44,44 52,40 Z" fill={c('lat', muscles)} opacity="0.85"/>
      {/* 삼두 */}
      <ellipse cx="7" cy="43" rx="4" ry="9" fill={c('tricep', muscles)} opacity="0.85"/>
      <ellipse cx="65" cy="43" rx="4" ry="9" fill={c('tricep', muscles)} opacity="0.85"/>
      {/* 전완 (후면) */}
      <ellipse cx="5.5" cy="73" rx="3.5" ry="9" fill={c('forearm', muscles)} opacity="0.85"/>
      <ellipse cx="66.5" cy="73" rx="3.5" ry="9" fill={c('forearm', muscles)} opacity="0.85"/>
      {/* 둔근 */}
      <ellipse cx="27" cy="100" rx="12" ry="9" fill={c('glute', muscles)} opacity="0.85"/>
      <ellipse cx="45" cy="100" rx="12" ry="9" fill={c('glute', muscles)} opacity="0.85"/>
      {/* 햄스트링 */}
      <ellipse cx="24" cy="116" rx="9" ry="14" fill={c('hamstring', muscles)} opacity="0.85"/>
      <ellipse cx="48" cy="116" rx="9" ry="14" fill={c('hamstring', muscles)} opacity="0.85"/>
      {/* 종아리 (후면) */}
      <ellipse cx="24" cy="146" rx="7" ry="11" fill={c('calf', muscles)} opacity="0.85"/>
      <ellipse cx="48" cy="146" rx="7" ry="11" fill={c('calf', muscles)} opacity="0.85"/>
    </svg>
  )
}

const MUSCLE_LABELS = {
  chest: '대흉근', lat: '광배근', trap: '승모근', shoulder: '삼각근',
  bicep: '이두근', tricep: '삼두근', forearm: '전완근',
  quad: '대퇴사두근', hamstring: '햄스트링', glute: '둔근', calf: '종아리', abs: '복근',
}

export default function MuscleMap({ muscles }) {
  if (!muscles) return null

  const allMuscles = [
    ...muscles.primary.map(m => ({ name: m, type: 'primary' })),
    ...muscles.secondary.map(m => ({ name: m, type: 'secondary' })),
  ]

  return (
    <div>
      {/* 전면/후면 실루엣 */}
      <div className="flex justify-center gap-6 mb-3">
        <div className="flex flex-col items-center gap-1">
          <FrontBody muscles={muscles} />
          <span className="text-[10px]" style={{ color: '#BEBCC2' }}>전면</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <BackBody muscles={muscles} />
          <span className="text-[10px]" style={{ color: '#BEBCC2' }}>후면</span>
        </div>
      </div>

      {/* 범례 태그 */}
      <div className="flex flex-wrap gap-1.5">
        {allMuscles.map(({ name, type }) => (
          <span
            key={name}
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: type === 'primary' ? '#EDE8FD' : '#F3F0FE',
              color: type === 'primary' ? '#7B53EA' : '#A08ED6',
            }}
          >
            {type === 'primary' ? '●' : '○'} {MUSCLE_LABELS[name] ?? name}
          </span>
        ))}
      </div>
    </div>
  )
}
