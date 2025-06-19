import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Leaderboard from "./pages/Leaderboard"
import About from "./pages/About"
import Features from "./pages/Features"
import Settings from "./pages/Settings"
import TypingTest from "./pages/TypingTest"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/leaderboard" element={<Leaderboard />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/features" element={<Features />}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/typingtest" element={<TypingTest />}/>
      </Routes>
    </>
  )
}
export default App