export default function Header({ title, onBack, right }) {
  return (
    <header
      className="sticky top-0 z-10 flex items-center bg-white border-b border-[#E4E7ED]"
      style={{ height: 56, paddingLeft: 20, paddingRight: 20 }}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center justify-center rounded-full"
          style={{ width: 32, height: 32, marginRight: 8, color: '#333333' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <h1 className="flex-1 font-bold text-[#000000]" style={{ fontSize: 18 }}>{title}</h1>
      {right && <div>{right}</div>}
    </header>
  )
}
