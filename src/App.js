import Layout from "./component/Layout";
import MainContent from "./pages/maincontent";
import FormContainer from "./pages/form";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout main Component={MainContent} />} />
      <Route
        path="/addUser"
        element={<Layout newUser Component={FormContainer} />}
      />
      <Route path="/edit" element={<Layout Component={FormContainer} />} />
    </Routes>
  );
}

export default App;
