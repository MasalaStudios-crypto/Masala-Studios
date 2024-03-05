import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { TravelsProvider } from './Context/TravelsProvider';

function App() {
  return (
    <BrowserRouter>
      <TravelsProvider>
        <AppRoutes/>
      </TravelsProvider>
    </BrowserRouter>

  )
}

export default App
