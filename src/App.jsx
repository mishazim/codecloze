import { Routes, Route, Navigate } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import HomeScreen from './components/HomeScreen/HomeScreen'
import LevelSelect from './components/LevelSelect/LevelSelect'
import GameScreen from './components/GameScreen/GameScreen'

export default function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/levels/:category/:difficulty" element={<LevelSelect />} />
        <Route path="/play/:id" element={<GameScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProgressProvider>
  )
}
