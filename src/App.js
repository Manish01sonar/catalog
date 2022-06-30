import { Routes, Route} from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import Viewmed from "./components/medicines/Viewmed";
import Editmed from "./components/medicines/Editmed";
import Listmed from "./components/medicines/Listmed";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/viewmed/:id" element={<Viewmed/>} />
          <Route path="/editmed/:id" element={<Editmed/>} />
          <Route path="/listmed/:id" element={<Listmed/>} />
        </Routes>
      </div>
  );
}

export default App;