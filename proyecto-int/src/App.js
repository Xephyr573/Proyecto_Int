import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Ingresar from "./pages/Ingresar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ingresar" element={<Ingresar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;