import './assets/scss/App.scss'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EditVideo from './pages/EditVideo'
import Navigation from './pages/partials/Navigation'

function App() {

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit_video" element={<EditVideo />} />
      </Routes>
    </div>
  )
}

export default App
