import './App.css';
import CanvasEditor from "./components/canvas-editor";

function App() {
  return (
    <div data-testid={'mainApp'} className="App">
        <CanvasEditor/>
    </div>
  );
}

export default App;
