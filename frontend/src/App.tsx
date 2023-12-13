import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Job from "./components/File";
// import Job from "./components/Upload";

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
