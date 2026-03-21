import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import About from './pages/About';

// Global Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Error caught:", error, errorInfo); }
  render() {
    if (this.state.hasError) return <div className="p-8 text-center text-danger-red font-nunito font-bold">Something went wrong.</div>;
    return this.props.children; 
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster
          position="top-right"
          gutter={12}
          toastOptions={{
            duration: 3500,
            style: {
              background: '#FFFFFF',
              color: '#1A2530',
              border: '1px solid #EEF0F2',
              borderLeft: '4px solid #2BA8A0',
              borderRadius: '8px',
              font: '500 0.9rem "Nunito Sans"',
              boxShadow: '0 8px 24px rgba(26,37,48,0.12)',
              padding: '14px 18px',
            },
            success: { iconTheme: { primary: '#38A169', secondary: '#fff' } },
            error: {
              style: { borderLeftColor: '#E53E3E' },
              iconTheme: { primary: '#E53E3E', secondary: '#fff' }
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
