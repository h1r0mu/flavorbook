import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useAuth } from "./contexts/AuthContext";
import { db } from "../firebase.js";

export default function Member() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const _users = [];

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        _users.push({
          ...doc.data(),
        });
      });
      setUsers(_users);
    });

  const userListItems = users.map((user) => {
    return (
      <li>
        {user.store_name}:{user.bean_state}:{user.refine_method}:
        {user.extraction_method}:{user.producing_country}:
        {user.producing_region}:{user.producing_farm}:
        {user.purchase_date.toDate().toString()}
      </li>
    );
  });

  return (
    <div>
      <p>Member Page</p>
      <div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <strong>Email:</strong> {currentUser.email}
        </div>
        <div>
          <strong>ハンドル名:</strong> {currentUser.displayName}
        </div>
        <div>
          <strong>履歴</strong>
          <ul>{userListItems}</ul>
        </div>
        <Button color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
