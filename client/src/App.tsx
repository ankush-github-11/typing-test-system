import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Leaderboard from "./pages/Leaderboard"
import About from "./pages/About"
import Features from "./pages/Features"
import Settings from "./pages/Settings"
import TypingTest from "./pages/TypingTest"
import Results from "./pages/Results"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"

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
        <Route path="/results" element={<Results />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </>
  )
}
export default App