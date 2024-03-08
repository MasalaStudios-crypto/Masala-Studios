import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { MasalaProvider } from './Context/MasalaProvider';

function App() {
  return (
    <BrowserRouter>
      <MasalaProvider>
        <AppRoutes/>
      </MasalaProvider>
    </BrowserRouter>

  )
}

export default App
