import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Slot {
  id: number;
  date: string;
  time: string;
  max_people: number;
}

interface Theme {
  id: number;
  image_url: string;
  title: string;
  rating: number;
  description: string;
  slots: Slot[];
}

export default function ThemeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/themes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        
        setTheme(data);
      })
      .catch(err => console.error("Failed to fetch theme detail", err));
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("获取用户信息失败");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleBooking = (slotId: number | undefined) => {
    if (typeof slotId === "undefined") {
      console.error("❌ slotId 是 undefined");
      alert("出错了，slotId 不存在！");
      return;
    }
  
    alert(`你选择了预约 Slot ID: ${slotId}`);
    console.log("准备发送预约请求 slotId:", slotId);
    if (!user) return alert("请先登录再预约！");
    console.log("user",user.name);
    fetch("http://127.0.0.1:8000/api/participation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        slot_id: slotId,
        name: user.name,
        email: user.email,
      }),
      
    })
      .then(res => {
        if (!res.ok) throw new Error("预约失败");
        return res.json();
      })
      .then(() => alert("✅ 预约成功！"))
      .catch(() => alert("❌ 预约失败！"));
  };

  return (
    <div style={{ padding: "20px" }}>
      {theme ? (
        <>


          <h1>{theme.title}</h1>
          <img src={theme.image_url} alt={theme.title} style={{ maxWidth: "300px", borderRadius: "8px" }} />
          <p>⭐️ 评分: {theme.rating} / 5</p>
          <p>{theme.description}</p>
  
          <h2 style={{ marginTop: "30px" }}>可预约时间</h2>
          {theme.slots.length === 0 ? (
            <p>暂时没有可预约时间</p>
          ) : (
            <ul>
              
              {theme.slots.map((slot) => (
              <li key={slot.id}> {/* ✅ 添加唯一 key */}
                🕒 {slot.date} {slot.time}（最多 {slot.max_people} 人）
                <button
                  style={{ marginLeft: "10px", padding: "4px 12px" }}
                  onClick={() => handleBooking(slot.id)}
                >
                  预约
                </button>
              </li>
            ))}

            </ul>
          )}
        </>
      ) : (
        <p>加载中...</p>
      )}
    </div>
  );
  
}
