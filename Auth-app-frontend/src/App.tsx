import { ToastContainer } from 'react-toastify'
import BaseRouting from './routes/BaseRouting';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BaseRouting />
    </div>
  );
}

export default App
