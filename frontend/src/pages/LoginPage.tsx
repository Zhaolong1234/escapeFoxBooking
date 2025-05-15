import { useState } from "react";
import styles from "./LoginPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        new URLSearchParams({
          username: email,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
  
      const token = response.data.access_token;
      localStorage.setItem("token", token);
  
      // ✅ 获取当前用户信息
      const userResponse = await axios.get("http://127.0.0.1:8000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // 保存用户信息（你可以改为 setState 或 context）
      localStorage.setItem("user", JSON.stringify(userResponse.data));
  
      setMessage("✅ 登录成功");
      navigate("/dashboard");
    } catch (error) {
      setMessage("❌ 登录失败");
    }
  };
  

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>登录</h1>
        <input
          type="email"
          placeholder="邮箱"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="密码"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={styles.submitButton}
          onClick={handleLogin}
        >
          登录
        </button>
        {message && (
          <p
            className={
              message.includes("✅") ? styles.messageSuccess : styles.messageError
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
