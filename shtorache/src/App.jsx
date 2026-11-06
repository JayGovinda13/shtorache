import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LandingPage from './components/Landing-Page/Landing-Page';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import { InstagramFeedProvider } from './hooks/InstagramFeedProvider';

function SiteLayout() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <InstagramFeedProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<SiteLayout />}>
            <Route path="/trabalho" element={<GalleryPage filter="all" />} />
            <Route path="/fotos" element={<GalleryPage filter="photo" />} />
            <Route path="/videos" element={<GalleryPage filter="video" />} />
            <Route path="/contato" element={<ContactPage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/trabalho" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </InstagramFeedProvider>
    </BrowserRouter>
  );
}

export default App;
