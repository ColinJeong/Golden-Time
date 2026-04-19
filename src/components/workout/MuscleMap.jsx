// muscle 키: chest | lat | trap | shoulder | bicep | tricep | forearm | quad | hamstring | glute | calf | abs
// 이미지 실제 크기: 1024 × 1536 px
// 표시 범위: y=40 ~ y=1440 (상단 여백·하단 텍스트 제거)

const BASE = import.meta.env.BASE_URL
const PRIMARY   = '#7B53EA'
const SECONDARY = '#C4B5FD'

// ── 좌표 기준 ────────────────────────────────────────────
// 전면 인체 중심 x ≈ 255  (이미지 좌측 절반)
// 후면 인체 중심 x ≈ 769  (이미지 우측 절반)
// viewBox: "0 40 1024 1400"  (y=40~1440 구간만 표시)
const OVERLAYS = {
  chest: [
    { cx: 198, cy: 358, rx: 68, ry: 68 },
    { cx: 312, cy: 358, rx: 68, ry: 68 },
  ],
  abs: [
    { cx: 255, cy: 512, rx: 50, ry: 98 },
  ],
  shoulder: [
    { cx: 128, cy: 275, rx: 54, ry: 44 }, // 전면 좌
    { cx: 382, cy: 275, rx: 54, ry: 44 }, // 전면 우
    { cx: 644, cy: 275, rx: 54, ry: 44 }, // 후면 좌
    { cx: 892, cy: 275, rx: 54, ry: 44 }, // 후면 우
  ],
  bicep: [
    { cx: 107, cy: 455, rx: 30, ry: 80 },
    { cx: 403, cy: 455, rx: 30, ry: 80 },
  ],
  tricep: [
    { cx: 614, cy: 455, rx: 30, ry: 80 },
    { cx: 922, cy: 455, rx: 30, ry: 80 },
  ],
  forearm: [
    { cx:  80, cy: 590, rx: 24, ry: 78 },
    { cx: 430, cy: 590, rx: 24, ry: 78 },
    { cx: 596, cy: 590, rx: 24, ry: 78 },
    { cx: 942, cy: 590, rx: 24, ry: 78 },
  ],
  trap: [
    { cx: 769, cy: 302, rx: 118, ry: 80 },
  ],
  lat: [
    { cx: 670, cy: 480, rx: 57, ry: 108 },
    { cx: 868, cy: 480, rx: 57, ry: 108 },
  ],
  glute: [
    { cx: 722, cy: 702, rx: 72, ry: 68 },
    { cx: 816, cy: 702, rx: 72, ry: 68 },
  ],
  quad: [
    { cx: 213, cy: 852, rx: 56, ry: 120 },
    { cx: 297, cy: 852, rx: 56, ry: 120 },
  ],
  hamstring: [
    { cx: 716, cy: 858, rx: 56, ry: 118 },
    { cx: 822, cy: 858, rx: 56, ry: 118 },
  ],
  calf: [
    { cx: 208, cy: 1182, rx: 35, ry: 94 }, // 전면 좌
    { cx: 302, cy: 1182, rx: 35, ry: 94 }, // 전면 우
    { cx: 714, cy: 1188, rx: 35, ry: 94 }, // 후면 좌
    { cx: 824, cy: 1188, rx: 35, ry: 94 }, // 후면 우
  ],
}

const MUSCLE_LABELS = {
  chest: '대흉근', lat: '광배근', trap: '승모근', shoulder: '삼각근',
  bicep: '이두근', tricep: '삼두근', forearm: '전완근',
  quad: '대퇴사두근', hamstring: '햄스트링', glute: '둔근', calf: '종아리', abs: '복근',
}

// 이미지 크롭 설정 (픽셀 단위)
const IMG_W = 1024, IMG_H = 1536
const CROP_TOP = 40       // 상단 여백 제거
const CROP_BOTTOM = 96    // 하단 텍스트+여백 제거 (y=1440까지 표시)
const VIS_H = IMG_H - CROP_TOP - CROP_BOTTOM  // 1400

// container height = W × VIS_H/IMG_W
// image displayed height = W × IMG_H/IMG_W
// top offset (as % of container height) = -(CROP_TOP/IMG_H) × (IMG_H/VIS_H) × 100
const TOP_OFFSET_PCT = -(CROP_TOP / VIS_H) * 100  // ≈ -2.857%
const IMG_HEIGHT_PCT = (IMG_H / VIS_H) * 100       // ≈ 109.7%

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
