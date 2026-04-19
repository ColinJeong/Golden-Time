// muscle 키: chest | lat | trap | shoulder | bicep | tricep | forearm | quad | hamstring | glute | calf | abs
// 이미지 실제 크기: 1024 × 1536 px
// 좌표: 그림판 호버로 직접 측정한 실제 픽셀 좌표 (2026-04-19)
// 표시 범위: y=190 ~ y=1336 (머리 위 여백·하단 텍스트 제거)

const BASE = import.meta.env.BASE_URL
const PRIMARY   = '#7B53EA'
const SECONDARY = '#C4B5FD'

// ── 좌표 기준 ────────────────────────────────────────────
// 전면 인체 중심 x ≈ 302  (이미지 좌측 절반)
// 후면 인체 중심 x ≈ 785  (이미지 우측 절반)
// viewBox: "0 190 1024 1146"  (y=190~1336 구간만 표시)
const OVERLAYS = {
  chest: [
    { cx: 225, cy: 460, rx: 60, ry: 52 }, // 전면 좌 대흉근
    { cx: 343, cy: 460, rx: 60, ry: 52 }, // 전면 우 대흉근
  ],
  abs: [
    { cx: 264, cy: 585, rx: 40, ry: 90 },
  ],
  shoulder: [
    { cx: 155, cy: 397, rx: 48, ry: 42 }, // 전면 좌
    { cx: 449, cy: 397, rx: 48, ry: 42 }, // 전면 우
    { cx: 607, cy: 401, rx: 48, ry: 42 }, // 후면 좌
    { cx: 963, cy: 401, rx: 48, ry: 42 }, // 후면 우
  ],
  bicep: [
    { cx: 141, cy: 500, rx: 24, ry: 70 }, // 전면 좌
    { cx: 459, cy: 500, rx: 24, ry: 70 }, // 전면 우
  ],
  tricep: [
    { cx: 594, cy: 500, rx: 24, ry: 70 }, // 후면 좌
    { cx: 950, cy: 500, rx: 24, ry: 70 }, // 후면 우
  ],
  forearm: [
    { cx: 126, cy: 631, rx: 20, ry: 68 }, // 전면 좌
    { cx: 463, cy: 631, rx: 20, ry: 68 }, // 전면 우
    { cx: 585, cy: 642, rx: 20, ry: 68 }, // 후면 좌
    { cx: 954, cy: 642, rx: 20, ry: 68 }, // 후면 우
  ],
  trap: [
    { cx: 776, cy: 428, rx: 120, ry: 70 },
  ],
  lat: [
    { cx: 633, cy: 526, rx: 50, ry: 96 }, // 후면 좌
    { cx: 871, cy: 526, rx: 50, ry: 96 }, // 후면 우
  ],
  glute: [
    { cx: 705, cy: 736, rx: 72, ry: 58 },
    { cx: 814, cy: 736, rx: 72, ry: 58 },
  ],
  quad: [
    { cx: 219, cy: 872, rx: 52, ry: 105 }, // 전면 좌
    { cx: 321, cy: 872, rx: 52, ry: 105 }, // 전면 우
  ],
  hamstring: [
    { cx: 689, cy: 872, rx: 52, ry: 105 }, // 후면 좌
    { cx: 821, cy: 872, rx: 52, ry: 105 }, // 후면 우
  ],
  calf: [
    { cx: 222, cy: 983, rx: 32, ry: 82 }, // 전면 좌
    { cx: 313, cy: 983, rx: 32, ry: 82 }, // 전면 우
    { cx: 690, cy: 1022, rx: 32, ry: 82 }, // 후면 좌
    { cx: 809, cy: 1022, rx: 32, ry: 82 }, // 후면 우
  ],
}

const MUSCLE_LABELS = {
  chest: '대흉근', lat: '광배근', trap: '승모근', shoulder: '삼각근',
  bicep: '이두근', tricep: '삼두근', forearm: '전완근',
  quad: '대퇴사두근', hamstring: '햄스트링', glute: '둔근', calf: '종아리', abs: '복근',
}

// 이미지 크롭 설정 (픽셀 단위) — 그림판 좌표 실측 기반
const IMG_W = 1024, IMG_H = 1536
const CROP_TOP = 190      // 머리 위 여백 제거 (머리 꼭대기 y≈230)
const CROP_BOTTOM = 200   // 하단 텍스트+여백 제거 (텍스트 y≈1334)
const VIS_H = IMG_H - CROP_TOP - CROP_BOTTOM  // 1146

// container height = W × VIS_H/IMG_W
// image displayed height = W × IMG_H/IMG_W
// top offset (as % of container height) = -(CROP_TOP/VIS_H) × 100
const TOP_OFFSET_PCT = -(CROP_TOP / VIS_H) * 100  // ≈ -16.58%
const IMG_HEIGHT_PCT = (IMG_H / VIS_H) * 100       // ≈ 134.0%

export default function MuscleMap({ muscles }) {
  if (!muscles) return null

  const allMuscles = [
    ...muscles.primary.map(m => ({ name: m, type: 'primary' })),
    ...muscles.secondary.map(m => ({ name: m, type: 'secondary' })),
  ]

  function getColor(name) {
    if (muscles.primary.includes(name))   return PRIMARY
    if (muscles.secondary.includes(name)) return SECONDARY
    return null
  }

  return (
    <div>
      {/* 이미지 + SVG 오버레이 */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: `${IMG_W} / ${VIS_H}`,
        overflow: 'hidden',
        borderRadius: 16,
        backgroundColor: '#F5F3FF',
      }}>
        {/* 해부학 이미지 (상하 여백·텍스트 잘라냄) */}
        <img
          src={`${BASE}muscle-map.png`}
          alt="근육 해부도"
          style={{
            position: 'absolute',
            width: '100%',
            height: `${IMG_HEIGHT_PCT}%`,
            top: `${TOP_OFFSET_PCT}%`,
            left: 0,
            objectFit: 'fill',
          }}
        />

        {/* 근육 오버레이: 활성 근육만 표시 */}
        <svg
          viewBox={`0 ${CROP_TOP} ${IMG_W} ${VIS_H}`}
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
                opacity="0.45"
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
