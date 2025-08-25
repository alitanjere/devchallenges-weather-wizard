import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from '@/contexts/WeatherContext.jsx';
import { SettingsProvider } from '@/contexts/SettingsContext.jsx';
import Index from './pages/Index.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => (
  <WeatherProvider>
    <SettingsProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  </WeatherProvider>
);

export default App;
