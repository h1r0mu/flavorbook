import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useReducer, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 16,
      margin: "auto",
      maxWidth: 480,
    },
    signupBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      color: "primary",
    },
  })
);

//state type
type State = {
  email: string,
  password: string,
  passwordconfirm: string,
  displayName: string,
  isButtonDisabled: boolean,
  helperText: string,
  isError: boolean,
};

let initialState: State = {
  email: "",
  password: "",
  passwordconfirm: "",
  displayName: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setEmail", payload: string }
  | { type: "setPassword", payload: string }
  | { type: "setPasswordConfirm", payload: string }
  | { type: "setDisplayName", payload: string }
  | { type: "setIsButtonDisabled", payload: boolean }
  | { type: "signupSuccess", payload: string }
  | { type: "signupFailed", payload: string }
  | { type: "setIsError", payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setPasswordConfirm":
      return {
        ...state,
        passwordconfirm: action.payload,
      };
    case "setDisplayName":
      return {
        ...state,
        displayName: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "signupSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "signupFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

const UpdateProfile = () => {
  const { currentUser, updatePassword, updateEmail, updateProfile } = useAuth();
  const classes = useStyles();

  currentUser.displayName
    ? (initialState = { ...initialState, displayName: currentUser.displayName })
    : (initialState = { ...initialState, displayName: "" });

  initialState = { ...initialState, username: currentUser.email };

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    email: currentUser.email,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { register, handleSubmit, errors, formState } = useForm();
  const history = useHistory();

  useEffect(() => {
    if (state.password.trim() !== state.passwordconfirm.trim()) {
      setError("");
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    } else if (state.email.trim()) {
      setError("");
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      setError("");
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
    if (state.email !== currentUser.email && state.password) {
      setError("メールアドレスとパスワードを同時に変更する事はできません");
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.email, state.password, state.passwordconfirm, currentUser.email]);

  async function handleUpdateProfile() {
    setError("");
    setSuccessMessage("");
    //sing up ボタンの無効化
    dispatch({
      type: "setIsButtonDisabled",
      payload: true,
    });

    //処理の初期化
    const promises = [];

    //更新処理をセット
    if (state.password) {
      console.log("updatePassword");
      promises.push(updatePassword(state.password));
    }
    if (state.email !== currentUser.email) {
      console.log("updateEmail");
      promises.push(updateEmail(state.email));
    }
    if (state.displayName !== currentUser.displayName) {
      let updatProfileData = {};
      updatProfileData = {
        ...updatProfileData,
        displayName: state.displayName,
      };
      promises.push(updateProfile(updatProfileData));
    }

    Promise.all(promises)
      .then(() => {
        setSuccessMessage(
          "プロフィールを更新しました。会員ページにリダレクトします"
        );
        //ボタンの有効化
        dispatch({
          type: "setIsButtonDisabled",
          payload: false,
        });
        //history.push("/")
        setTimeout(function () {
          console.log("リダレクト処理");
          history.push("/member");
        }, 2000);
      })
      .catch((e) => {
        console.log(e);

        switch (e.code) {
          case "auth/network-request-failed":
            setError(
              "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。"
            );
            break;
          case "auth/weak-password":
            setError("パスワードが正しくないです。");
            break;
          case "auth/invalid-email":
            setError("メールアドレスが正しくないです。");
            break;
          case "auth/requires-recent-login":
            setError(
              "別の端末でログインしているか、セッションが切れたので再度、ログインしてください。(ログインページにリダイレクトします）"
            );
            setTimeout(function () {
              console.log("リダレクト処理");
              history.push("/login");
            }, 3000);
            break;
          case "auth/user-disabled":
            setError("入力されたメールアドレスは無効（BAN）になっています。");
            break;
          default:
            //想定外
            setError(
              "失敗しました。通信環境がいい所で再度やり直してください。"
            );
        }

        //ボタンの有効化
        dispatch({
          type: "setIsButtonDisabled",
          payload: false,
        });
      })
      .finally(() => {
        dispatch({
          type: "setIsButtonDisabled",
          payload: false,
        });
      });
  }

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setEmail",
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };

  const handlePasswordConfirmChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: "setPasswordConfirm",
        payload: event.target.value,
      });
    };
  const handleDisplayNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setDisplayName",
      payload: event.target.value,
    });
  };
  formState.isSubmitted = false; //一回submittedになるとレンダリングが遅くなり、変な動きするので強制的にfalseにする

  return (
    <div className={classes.container}>
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        プロフィールの更新
      </Typography>
      <form noValidate autoComplete="off">
        <Paper style={{ padding: 16 }}>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {successMessage && <div variant="danger">{successMessage}</div>}
          <TextField
            error={state.isError}
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email"
            //placeholder="Email"
            margin="normal"
            value={state.email}
            onChange={handleEmailChange}
            inputRef={register({
              pattern:
                /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
            })}
          />
          {errors.email?.type === "pattern" && (
            <div style={{ color: "red" }}>
              メールアドレスの形式で入力されていません
            </div>
          )}
          <TextField
            error={state.isError}
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            margin="normal"
            onChange={handlePasswordChange}
            inputRef={register({ minLength: 6 })}
          />
          {errors.password?.type === "minLength" && (
            <div style={{ color: "red" }}>
              パスワードは6文字以上で入力してください
            </div>
          )}
          <TextField
            error={state.isError}
            fullWidth
            id="password-confirm"
            name="password-confirm"
            type="password"
            label="Password-confirm"
            placeholder="Password-confirm"
            margin="normal"
            onChange={handlePasswordConfirmChange}
            inputRef={register}
          />
          <TextField
            error={state.isError}
            fullWidth
            id="displayName"
            name="displayName"
            type="text"
            label="表示名"
            placeholder="ハンドル名を入力してください"
            margin="normal"
            value={state.displayName}
            onChange={handleDisplayNameChange}
            inputRef={register({ required: true, minLength: 4 })}
          />
          {errors.displayName?.type === "required" && (
            <div style={{ color: "red" }}>表示名を入力してください</div>
          )}
          {errors.displayName?.type === "minLength" && (
            <div style={{ color: "red" }}>
              表示名は4文字以上で入力してください
            </div>
          )}
          <Button
            variant="contained"
            size="large"
            fullWidth
            color="primary"
            className={classes.signupBtn}
            onClick={handleSubmit(handleUpdateProfile)}
            disabled={state.isButtonDisabled}
          >
            プロフィールを更新
          </Button>
        </Paper>
        <Typography paragraph>
          ※表示名とアバター以外は公表される事はありません
        </Typography>
        <Typography paragraph>
          <Link to="/member">会員ページ</Link>に戻る
        </Typography>
      </form>
    </div>
  );
};

export default UpdateProfile;
