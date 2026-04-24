function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Thief Detect</h1>
        <p>Police surveillance dashboard</p>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Login</button>
      </div>
    </div>
  );
}

export default Login;