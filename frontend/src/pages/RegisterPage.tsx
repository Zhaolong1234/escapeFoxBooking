  import { useState } from "react";
  import axios from "axios";
  import styles from "./RegisterPage.module.css";
  import { useNavigate } from "react-router-dom";

  export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
      setLoading(true);
      try {
        console.log("🔍 注册请求已发出", { name, email, password, passwordType: typeof password });
        const response = await axios.post("http://127.0.0.1:8000/api/users", {
          name,
          email,
          password, // ✅ 加上 password 
        });
        setMessage("✅ 注册成功，用户ID：" + response.data.id);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.detail) {
          setMessage("❌ 注册失败：" + error.response.data.detail);
        } else {
          setMessage("❌ 注册失败，请检查服务器是否开启！");
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className={styles.pageWrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>用户注册</h1>
          <input
            type="text"
            placeholder="用户名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="密码"
            value={password} // ✅ 改成 password
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />
          <button
            onClick={handleRegister}
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "注册中..." : "注册"}
          </button>
          {message && (
            <p
              className={
                message.includes("✅")
                  ? styles.messageSuccess
                  : styles.messageError
              }
            >
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }
