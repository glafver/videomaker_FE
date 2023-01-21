import './assets/scss/App.scss'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EditVideoPage from './pages/EditVideoPage'
import Navigation from './pages/partials/Navigation'
import VideoPage from './pages/VideoPage'
import Footer from './pages/partials/Footer'

function App() {

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit_video" element={<EditVideoPage />} />
        <Route path="/your_video" element={<VideoPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
