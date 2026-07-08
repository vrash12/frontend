import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

type LoginResponse = {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("portfolio_token", response.data.token);
      localStorage.setItem("portfolio_user", JSON.stringify(response.data.user));

      navigate("/blogs/new");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="page-hero blog-adventure-hero">
        <p className="section-kicker">Admin Access</p>

        <h1>Login</h1>

        <p>Login to create and manage your adventure blog posts.</p>
      </section>

      <section className="content-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;