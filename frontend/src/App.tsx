import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Job from "./components/File";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Job />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
