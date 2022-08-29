import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from './components/Top/Top';

function App() {
  return (
    <div className="App text-center bg-gradient-to-t from-black to-gray-900 h-screen text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
