import { Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import Layout from "./pages/Layout"
import ThemeDetailPage from "./pages/ThemeDetailPage"
import LoginPage from "./pages/LoginPage";  // ✅ 不要写错路径或拼写

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 所有需要显示 Header 的页面都放在 Layout 中 */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/themes/:id" element={<ThemeDetailPage />} />
        {/* 你未来还可以加更多需要 header 的页面 */}
      </Route>
    </Routes>
  )
}

export default App
