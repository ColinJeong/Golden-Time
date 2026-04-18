import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WorkoutPage from './pages/WorkoutPage'
import HistoryPage from './pages/HistoryPage'
import RoutinePage from './pages/RoutinePage'
import RoutineWorkoutPage from './pages/RoutineWorkoutPage'
import RoutineDonePage from './pages/RoutineDonePage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workout/:bodyPart" element={<WorkoutPage />} />
        <Route path="/workout/:bodyPart/:exerciseId" element={<WorkoutPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/routine" element={<RoutinePage />} />
        <Route path="/routine/:routineId/workout/:index" element={<RoutineWorkoutPage />} />
        <Route path="/routine/:routineId/done" element={<RoutineDonePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
