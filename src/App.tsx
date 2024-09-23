import "./App.css";
import { Markmap } from "./components/Markmap";

function App() {
  return (
    <>
      <Markmap defaultVal={localStorage.getItem("json") ?? undefined} />
    </>
  );
}

export default App;
