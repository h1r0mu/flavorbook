import React, { useEffect, useReducer, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 900,
      height: 400,
      margin: "auto",
      marginTop: 100,
    },
    card: {
      marginTop: theme.spacing(10),
      display: "flex",
    },
    cover: {
      width: 450,
    },
    details: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
    },
    signupBtn: {
      margin: "auto",
      marginTop: theme.spacing(2),
      maxWidth: 200,
      background: "#5f4e44",
      color: "#fff",
    },
    toLogin: {
      marginTop: 20,
      textAlign: "right",
    },
  })
);

//ステートの型指定
type State = {
  email: string,
  password: string,
  passwordconfirm: string,
  isButtonDisabled: boolean,
  helperText: string,
  isError: boolean,
};

//ステートの初期値入力
const initialState: State = {
  email: "",
  password: "",
  passwordconfirm: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

// アクションの型指定
type Action =
  | { type: "setEmail", payload: string }
  | { type: "setPassword", payload: string }
  | { type: "setPasswordConfirm", payload: string }
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

const Signup = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { register, handleSubmit, errors, trigger } = useForm();

  useEffect(() => {
    // stateのemail,password,passwordconfirmが変化した時のみ再びレンダー

    if (state.password.trim() !== state.passwordconfirm.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    } else if (state.email.trim() && state.password.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.email, state.password, state.passwordconfirm]);

  async function handleSignup() {
    // 非同期処理

    try {
      setError("");
      setSuccessMessage("");
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });

      await signup(state.email, state.passwordconfirm);
      // 非同期処理がうまく行った場合に実行する

      dispatch({
        type: "signupSuccess",
        payload: "Signup Successfully",
      });

      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });

      setSuccessMessage("アカウントの作成に成功しました");
    } catch (e) {
      console.log(e);

      switch (e.code) {
        case "auth/network-request-failed":
          setError(
            "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいいところでやり直してください"
          );
          break;
        case "auth/weak-password":
          setError("パスワードが短すぎます。6文字以上を入力してください。");
          break;
        case "auth/invalid-email":
          setError("メールアドレスが正しくありません");
          break;
        case "auth/email-already-in-use":
          setError(
            "メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください"
          );
          break;
        case "auth/user-disabled":
          setError("入力されたメールアドレスは無効になってます。");
          break;
        default:
          setError(
            "アカウントの作成に失敗しました。通信環境にいい所でやりなしてください。"
          );
      }

      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      if (!state.isButtonDisabled) {
        handleKeyPresstrigger();
        if (errors) {
          <div>error</div>;
        } else {
          handleSignup();
        }
      }
    }
  };

  async function handleKeyPresstrigger() {
    const result = await trigger();
    return result;
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

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Fade in={true} timeout={2000}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image="./static/coffee_signup.jpg"
            title="Sign Up"
          />
          <div className={classes.details}>
            <CardContent>
              <div>
                {error && <div variant="danger">{error}</div>}
                {successMessage && <div variant="danger">{successMessage}</div>}
                <TextField
                  error={state.isError}
                  fullWidth
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  margin="normal"
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
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
                  helperText={state.helperText}
                  onChange={handlePasswordChange}
                  onKeyPress={handleKeyPress}
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
                  type="password"
                  label="Password(もう一度入力してください)"
                  placeholder="Password-confirm"
                  margin="normal"
                  helperText={state.helperText}
                  onChange={handlePasswordConfirmChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className={classes.signupBtn}
                onClick={handleSubmit(handleSignup)}
                disabled={state.isButtonDisabled}
              >
                新規登録
              </Button>
            </CardActions>
            <CardContent>
              <div className={classes.toLogin}>
                もしアカウントがあるなら<Link to="/login">ログイン</Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </Fade>
    </form>
  );
};

export default Signup;
