import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { db } from "../firebase.js";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Member() {
  const { currentUser, logout, sendEmailVerification } = useAuth();
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

  async function handleSendEmailVerification() {
    setError("");
    try {
      await sendEmailVerification();
      setError("メールをおくりました。メール有効化をお願いします");
    } catch (e) {
      console.log(e);
      setError("有効化メールの送信に失敗しました。");
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
      <li key={user.store.name}>
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
        {!currentUser.emailVerified && (
          <div>
            メールアドレスが有効化されていません{" "}
            <Button
              color="primary"
              onClick={handleSendEmailVerification}
            ></Button>
          </div>
        )}
      </div>
    </div>
  );
}
