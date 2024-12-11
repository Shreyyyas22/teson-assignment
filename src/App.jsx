import { Header } from './components/Header';
import { AllRoutes } from './routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Header />
      <AllRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
