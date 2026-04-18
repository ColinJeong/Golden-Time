import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  {
    to: '/', label: '홈',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
          stroke={active ? '#7B53EA' : '#BEBCC2'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    to: '/history', label: '기록',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="2" stroke={active ? '#7B53EA' : '#BEBCC2'} strokeWidth="1.6"/>
        <path d="M3 9H21" stroke={active ? '#7B53EA' : '#BEBCC2'} strokeWidth="1.6"/>
        <path d="M8 2V5M16 2V5" stroke={active ? '#7B53EA' : '#BEBCC2'} strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M7 13H11M7 17H13" stroke={active ? '#7B53EA' : '#BEBCC2'} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: '/routine', label: '루틴',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 6H21M8 12H21M8 18H21" stroke={active ? '#7B53EA' : '#BEBCC2'} strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="4" cy="6" r="1" fill={active ? '#7B53EA' : '#BEBCC2'}/>
        <circle cx="4" cy="12" r="1" fill={active ? '#7B53EA' : '#BEBCC2'}/>
        <circle cx="4" cy="18" r="1" fill={active ? '#7B53EA' : '#BEBCC2'}/>
      </svg>
    ),
  },
  {
    to: '/settings', label: '설정',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke={active ? '#7B53EA' : '#BEBCC2'} strokeWidth="1.6"/>
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke={active ? '#7B53EA' : '#BEBCC2'} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-10 flex h-16 bg-white border-t border-[#E4E7ED]">
      {NAV_ITEMS.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className="flex flex-1 flex-col items-center justify-center"
          style={{ gap: 4 }}
        >
          {({ isActive }) => (
            <>
              {icon(isActive)}
              <span className="text-[11px] font-medium" style={{ color: isActive ? '#7B53EA' : '#BEBCC2' }}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
