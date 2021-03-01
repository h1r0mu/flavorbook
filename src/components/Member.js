import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useAuth } from "./contexts/AuthContext";

export default function Member() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <p>Member Page</p>
      <div>
        Dashboard：
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <strong>Email:</strong> {currentUser.email}
        </div>
        <div>
          <strong>ハンドル名:</strong> {currentUser.displayName}
        </div>
        <h2>
          <Link to="/login">Login</Link>
        </h2>
        <h2>
          <Link to="/signup">signup</Link>
        </h2>
        <Button color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
