// muscle 키: chest | lat | trap | shoulder | bicep | tricep | forearm | quad | hamstring | glute | calf | abs

const BASE = import.meta.env.BASE_URL

const PRIMARY = '#7B53EA'
const SECONDARY = '#C4B5FD'

// ── 근육별 오버레이 타원 좌표 (viewBox 0 0 820 1050 기준) ──
// 왼쪽 절반: 전면(앞), 오른쪽 절반: 후면(뒤)
const OVERLAYS = {
  chest: [
    { cx: 178, cy: 248, rx: 46, ry: 50 },
    { cx: 244, cy: 248, rx: 46, ry: 50 },
  ],
  abs: [
    { cx: 212, cy: 380, rx: 36, ry: 72 },
  ],
  shoulder: [
    { cx: 135, cy: 172, rx: 37, ry: 30 }, // 전면 좌
    { cx: 289, cy: 172, rx: 37, ry: 30 }, // 전면 우
    { cx: 533, cy: 172, rx: 37, ry: 30 }, // 후면 좌
    { cx: 687, cy: 172, rx: 37, ry: 30 }, // 후면 우
  ],
  bicep: [
    { cx: 108, cy: 272, rx: 22, ry: 54 },
    { cx: 316, cy: 272, rx: 22, ry: 54 },
  ],
  tricep: [
    { cx: 504, cy: 272, rx: 22, ry: 54 },
    { cx: 716, cy: 272, rx: 22, ry: 54 },
  ],
  forearm: [
    { cx:  90, cy: 372, rx: 18, ry: 54 },
    { cx: 334, cy: 372, rx: 18, ry: 54 },
    { cx: 488, cy: 372, rx: 18, ry: 54 },
    { cx: 732, cy: 372, rx: 18, ry: 54 },
  ],
  trap: [
    { cx: 610, cy: 195, rx: 90, ry: 58 },
  ],
  lat: [
    { cx: 550, cy: 328, rx: 44, ry: 76 },
    { cx: 670, cy: 328, rx: 44, ry: 76 },
  ],
  glute: [
    { cx: 578, cy: 490, rx: 54, ry: 50 },
    { cx: 642, cy: 490, rx: 54, ry: 50 },
  ],
  quad: [
    { cx: 178, cy: 604, rx: 40, ry: 86 },
    { cx: 244, cy: 604, rx: 40, ry: 86 },
  ],
  hamstring: [
    { cx: 573, cy: 612, rx: 40, ry: 84 },
    { cx: 647, cy: 612, rx: 40, ry: 84 },
  ],
  calf: [
    { cx: 175, cy: 800, rx: 27, ry: 60 }, // 전면 좌
    { cx: 247, cy: 800, rx: 27, ry: 60 }, // 전면 우
    { cx: 571, cy: 808, rx: 27, ry: 60 }, // 후면 좌
    { cx: 649, cy: 808, rx: 27, ry: 60 }, // 후면 우
  ],
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

  function getColor(name) {
    if (muscles.primary.includes(name)) return PRIMARY
    if (muscles.secondary.includes(name)) return SECONDARY
    return null
  }

  return (
    <div>
      {/* 해부학 이미지 + 근육 오버레이 */}
      <div style={{ position: 'relative', width: '100%', borderRadius: 16, overflow: 'hidden', backgroundColor: '#F9F8FF' }}>
        <img
          src={`${BASE}muscle-map.png`}
          alt="근육 해부도"
          style={{ width: '100%', display: 'block' }}
        />
        {/* 활성 근육만 오버레이 (비활성은 표시 안 함) */}
        <svg
          viewBox="0 0 820 1050"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          {Object.entries(OVERLAYS).map(([muscle, regions]) => {
            const color = getColor(muscle)
            if (!color) return null
            return regions.map((r, i) => (
              <ellipse
                key={`${muscle}-${i}`}
                cx={r.cx} cy={r.cy} rx={r.rx} ry={r.ry}
                fill={color}
                opacity="0.42"
              />
            ))
          })}
        </svg>
      </div>

      {/* 범례 태그 */}
      <div className="flex flex-wrap" style={{ gap: 6, marginTop: 12 }}>
        {allMuscles.map(({ name, type }) => (
          <span
            key={name}
            className="text-[12px] font-medium rounded-full"
            style={{
              padding: '4px 12px',
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
