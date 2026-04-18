export const PART_COLORS = {
  leg:      { bg: '#E4DAFF', stroke: '#535BEA' },
  back:     { bg: '#EDE8FD', stroke: '#7B53EA' },
  chest:    { bg: '#FFF0EB', stroke: '#FF6C32' },
  shoulder: { bg: '#FDEEF2', stroke: '#ED5776' },
  arm:      { bg: '#EBF2FF', stroke: '#4277FF' },
  compound: { bg: '#FFF8E0', stroke: '#D4A800' },
  circuit:  { bg: '#FDEEF2', stroke: '#F43D3D' },
}

function LegIcon({ c }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M9 3C9 3 8 9 9 13C10 17 8 21 8 23" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M14 3C14 3 15 9 14 13C13 17 15 21 16 23" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M7 7H16" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M6 23H11M14 23H18" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function BackIcon({ c }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 3V23" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M7 7L13 5L19 7" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 12C6 12 9 10 13 10C17 10 20 12 20 12" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M7 18C7 18 9.5 16 13 16C16.5 16 19 18 19 18" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function ChestIcon({ c }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M5 9C5 7 7 5 9 5C11 5 13 7 13 9" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M21 9C21 7 19 5 17 5C15 5 13 7 13 9" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M5 9C5 13 8.5 17 13 19C17.5 17 21 13 21 9" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 9V19" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function ShoulderIcon({ c }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="6" r="2.5" stroke={c} strokeWidth="1.6"/>
      <path d="M6 12C6 12 8.5 9 13 9C17.5 9 20 12 20 12" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M6 12V20M20 12V20" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M3 10L6 12M23 10L20 12" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function ArmIcon({ c }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M7 19C7 19 6 14 8 10C10 6 14 5 17 7" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M17 7C19 9 19 13 17 15C15 17 12 17 10 16" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M10 16C9 18 9 21 11 22" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M7 19C8 21 10 22 11 22" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function CompoundIcon({ c }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="5" r="2.5" stroke={c} strokeWidth="1.6"/>
      <path d="M13 8V15" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M7 11L13 9L19 11" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 15L9 22M13 15L17 22" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M4 9H7M19 9H22" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function CircuitIcon({ c }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 5C8.58 5 5 8.58 5 13C5 17.42 8.58 21 13 21C17.42 21 21 17.42 21 13C21 8.58 17.42 5 13 5Z" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 2"/>
      <path d="M17 3L13 5L17 7" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 12L13 9L16 12M13 9V17" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const ICON_MAP = { leg: LegIcon, back: BackIcon, chest: ChestIcon, shoulder: ShoulderIcon, arm: ArmIcon, compound: CompoundIcon, circuit: CircuitIcon }

export default function BodyPartIcon({ id, size = 26 }) {
  const colors = PART_COLORS[id] ?? { stroke: '#7B53EA' }
  const Icon = ICON_MAP[id]
  if (!Icon) return null
  return <Icon c={colors.stroke} size={size} />
}
