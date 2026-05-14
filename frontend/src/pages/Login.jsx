import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react"; // Removed ShieldCheck
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "superadmin@thiefdetect.lk",
    password: "Password@123",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const data = await login(formData.email, formData.password);

      if (data.success) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-left-panel">
        <div className="brand-block">
          <div className="brand-icon">
            {/* Replaced ShieldCheck with profile.png */}
            <img 
              src="/profile.png" 
              alt="Logo" 
              style={{ width: "34px", height: "34px", objectFit: "cover", borderRadius: "6px" }} 
            />
          </div>
          <div>
            <h1>Thief Detect</h1>
            <p>Real-Time Face Detection & Criminal Identification System</p>
          </div>
        </div>

        <div className="login-system-info">
          <span>Secure Police Dashboard</span>
          <h2>AI-powered surveillance monitoring for real-time alerts.</h2>
          <p>
            Login to access camera monitoring, criminal records, alert history,
            and command center analytics.
          </p>
        </div>

        <div className="login-feature-list">
          <div>Live camera monitoring</div>
          <div>Criminal database management</div>
          <div>Real-time alert tracking</div>
        </div>
      </div>

      <div className="login-right-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card-header">
            <div className="login-lock-icon">
              <Lock size={22} />
            </div>
            <h2>Welcome Back</h2>
            <p>Enter your credentials to continue</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="login-button" type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </button>

        </form>
      </div>
    </section>
  );
}