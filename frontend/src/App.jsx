import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardLayoutcustomer from './layouts/DashboardLayoutcustomer'; // <-- 1. Import layout customer
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OverviewPage from './pages/OverviewPage';
import CustomersPage from './pages/CustomersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TopCustomersPage from './pages/TopCustomersPage';
import ChurnRiskPage from './pages/ChurnRiskPage';
import MarketBasketPage from './pages/MarketBasketPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTE PUBLIK */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* RUTE TERPROTEKSI */}
        <Route element={<ProtectedRoute />}>

          {/* A. JALUR UTAMA ADMIN (Menggunakan DashboardLayout) */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<OverviewPage />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/top-customers" element={<TopCustomersPage />} />
            <Route path="/dashboard/churn-risk" element={<ChurnRiskPage />} />
            <Route path="/dashboard/market-basket" element={<MarketBasketPage />} />
            <Route path="/dashboard/customers" element={<CustomersPage />} />
          </Route>

          {/* B. JALUR UTAMA CUSTOMER (Menggunakan DashboardLayoutcustomer) */}
          <Route element={<DashboardLayoutcustomer />}>
            {/* Kamu bisa sesuaikan halaman apa saja yang boleh diakses oleh customer di sini */}
            <Route path="/customer-dashboard" element={<OverviewPage />} />
          </Route>

        </Route>

        {/* REDIRECT OTOMATIS */}
        {/* Mengarahkan ke fungsi pengecekan landing page dinamis */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}