import Navbar from '../components/layout/Navbar'
import { useTheme } from '../context/useTheme';
import { useTitle } from '../hooks/useTitle';
import { useLocation } from 'react-router-dom';

type TypingResult = {
  wpm: number;
  accuracy: number;
  typedText: string;
};

const Results = () => {
  const { isDark } = useTheme();
  useTitle("Results");
  const { state } = useLocation();
  const data = state as TypingResult;
  return (
    <div data-theme={isDark ? 'dark' : ''} className="font-poppins h-screen bg-bgcolor text-textcolor">
      <Navbar />
      <h1>Your Results</h1>
      <p>WPM: {data.wpm}</p>
      <p>Accuracy: {data.accuracy}%</p>
      <p>Typed Text: {data.typedText}</p>
    </div>
  );
};
export default Results;


