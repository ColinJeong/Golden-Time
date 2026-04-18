import { useNavigate } from 'react-router-dom'
import BodyPartIcon, { PART_COLORS } from '../common/BodyPartIcon'
import { BODY_PARTS } from '../../data/exercises'

export default function BodyPartCard({ id, label }) {
  const navigate = useNavigate()
  const colors = PART_COLORS[id] ?? { bg: '#F5F6F8', stroke: '#7B53EA' }

  return (
    <button
      onClick={() => navigate(`/workout/${id}`)}
      className="flex items-center bg-white rounded-2xl text-left active:scale-95 transition-transform"
      style={{ padding: '16px 20px', gap: 14, border: '1px solid #E4E7ED' }}
    >
      <div
        className="flex items-center justify-center rounded-xl shrink-0"
        style={{ width: 40, height: 40, backgroundColor: colors.bg }}
      >
        <BodyPartIcon id={id} size={22} />
      </div>
      <span className="text-[15px] font-bold text-[#000000]">{label}</span>
    </button>
  )
}
