// src/components/Header.tsx
import './Header.css';


export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-box">
        <img src="/fox.png" alt="logo" className="logo" />
        </div>
        <nav className="nav">
          <a href="#">我们的房间</a>
          <a href="#">FAQ</a>
          <a href="#" className="active">预约</a>
          <a href="#">公司小组活动</a>
          <a href="#">礼券</a>
          <a href="#">联系我们</a>
          <a href="#">CHINESE ▾</a>
        </nav>
      </div>
    </header>
  )
}
