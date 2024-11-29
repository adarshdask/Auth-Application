function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };
  return (
    <div className="container-fluid dashboard">
      <div className="welcome-box">
        <div className="logo">
          <img src="/images/logo.svg" alt="Logo" />
        </div>
        <div className="welcome-msg mt-4">Welcome to the application</div>
        <button className="btn btn-link logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
