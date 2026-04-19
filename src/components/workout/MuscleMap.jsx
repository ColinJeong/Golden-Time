// muscle 키: chest | lat | trap | shoulder | bicep | tricep | forearm | quad | hamstring | glute | calf | abs
// 이미지 실제 크기: 1024 × 1536 px
// 좌표: 그림판 호버로 직접 측정한 실제 픽셀 좌표 (2026-04-19)
// 표시 범위: y=190 ~ y=1336 (머리 위 여백·하단 텍스트 제거)

const BASE = import.meta.env.BASE_URL
const PRIMARY   = '#7B53EA'
const SECONDARY = '#C4B5FD'

// ── 좌표 기준 ────────────────────────────────────────────
// 전면 인체 중심 x = 302  (어깨 좌우 평균: (155+449)/2)
// 후면 인체 중심 x = 785  (어깨 좌우 평균: (607+963)/2)
// 전면 어깨 반폭 = 147px  후면 어깨 반폭 = 178px
// 인체 상단 y≈230, 하단 y≈1310, 높이≈1080px
// viewBox: "0 190 1024 1146"  (y=190~1336 구간만 표시)
const OVERLAYS = {
  // ── 전면 ─────────────────────────────────────────────
  chest: [
    { cx: 252, cy: 460, rx: 65, ry: 58 }, // 전면 좌 (중심에서 ~50px)
    { cx: 352, cy: 460, rx: 65, ry: 58 }, // 전면 우
  ],
  abs: [
    { cx: 302, cy: 635, rx: 38, ry: 110 }, // 전면 중앙 (21~52%)
  ],
  shoulder: [
    { cx: 155, cy: 397, rx: 52, ry: 44 }, // 전면 좌
    { cx: 449, cy: 397, rx: 52, ry: 44 }, // 전면 우
    { cx: 607, cy: 401, rx: 52, ry: 44 }, // 후면 좌
    { cx: 963, cy: 401, rx: 52, ry: 44 }, // 후면 우
  ],
  bicep: [
    { cx: 141, cy: 510, rx: 25, ry: 76 }, // 전면 좌
    { cx: 459, cy: 510, rx: 25, ry: 76 }, // 전면 우
  ],
  // ── 후면 ─────────────────────────────────────────────
  tricep: [
    { cx: 630, cy: 510, rx: 25, ry: 76 }, // 후면 좌
    { cx: 940, cy: 510, rx: 25, ry: 76 }, // 후면 우
  ],
  forearm: [
    { cx: 128, cy: 660, rx: 20, ry: 78 }, // 전면 좌
    { cx: 476, cy: 660, rx: 20, ry: 78 }, // 전면 우
    { cx: 615, cy: 670, rx: 20, ry: 78 }, // 후면 좌
    { cx: 955, cy: 670, rx: 20, ry: 78 }, // 후면 우
  ],
  trap: [
    // 승모근: 어깨~중간 등 덮는 큰 다이아몬드 (y 15~40%)
    { cx: 785, cy: 505, rx: 110, ry: 130 },
  ],
  lat: [
    { cx: 668, cy: 590, rx: 52, ry: 102 }, // 후면 좌
    { cx: 902, cy: 590, rx: 52, ry: 102 }, // 후면 우
  ],
  glute: [
    { cx: 705, cy: 775, rx: 75, ry: 65 }, // 후면 좌
    { cx: 865, cy: 775, rx: 75, ry: 65 }, // 후면 우
  ],
  quad: [
    { cx: 252, cy: 900, rx: 55, ry: 115 }, // 전면 좌
    { cx: 352, cy: 900, rx: 55, ry: 115 }, // 전면 우
  ],
  hamstring: [
    { cx: 705, cy: 910, rx: 55, ry: 115 }, // 후면 좌
    { cx: 865, cy: 910, rx: 55, ry: 115 }, // 후면 우
  ],
  calf: [
    { cx: 252, cy: 1055, rx: 30, ry: 88 }, // 전면 좌
    { cx: 352, cy: 1055, rx: 30, ry: 88 }, // 전면 우
    { cx: 716, cy: 1075, rx: 30, ry: 88 }, // 후면 좌
    { cx: 854, cy: 1075, rx: 30, ry: 88 }, // 후면 우
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
