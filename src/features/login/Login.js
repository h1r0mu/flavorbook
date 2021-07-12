import { useHistory, Link } from "react-router-dom";
import React, { useEffect, useReducer, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
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
    loginBtn: {
      margin: "auto",
      marginTop: theme.spacing(2),
      maxWidth: 200,
      background: "#5f4e44",
      color: "#fff",
    },
    links: {
      width: 400,
      textAlign: "right",
    },
    toSignUp: {
      width: 400,
      marginTop: 50,
    },
    toForget: {
      width: 400,
      marginTop: 10,
    },
  })
);

type State = {
  email: string,
  password: string,
  passwordconfirm: string,
  isButtonDisabled: boolean,
  helperText: string,
  isError: boolean,
};

const initialState: State = {
  email: "",
  password: "",
  passwordconfirm: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setEmail", payload: string }
  | { type: "setPassword", payload: string }
  | { type: "setPasswordConfirm", payload: string }
  | { type: "setIsButtonDisabled", payload: boolean }
  | { type: "loginSuccess", payload: string }
  | { type: "loginFailed", payload: string }
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
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginFailed":
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

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { register, handleSubmit, errors, trigger } = useForm();
  const history = useHistory();

  useEffect(() => {
    if (state.email.trim() && state.password.trim()) {
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
  }, [state.email, state.password]);

  async function handleLogin() {
    // async function handleLogin(data) {
    try {
      setError("");
      setSuccessMessage("");
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });

      await login(state.email, state.password);
      dispatch({
        type: "loginSuccess",
        payload: "Login Successfully",
      });

      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });

      setSuccessMessage("ログインに成功しました");
      history.push("/member");
    } catch (e) {
      console.log(e.code);

      switch (e.code) {
        case "auth/network-request-failed":
          setError(
            "通信がエラー、またはタイムアウトになりました。通信環境がいいところでやり直してください"
          );
          break;
        case "auth/invalid-email":
          setError("メールアドレスまたはパスワードが正しくありません");
          break;
        case "auth/wrong-password":
          setError("メールアドレスまたはパスワードが正しくありません");
          break;
        case "auth/user-disabled":
          setError("入力されたメールアドレスは無効になってます。");
          break;
        case "auth/user-not-found":
          setError("入力されたメールアドレスに該当するユーザはいません");
          break;
        default:
          setError(
            "ログインに失敗しました。通信環境にいい所でやりなしてください。"
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
          handleLogin();
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

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Fade in={true} timeout={2000}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image="./static/coffee_login.jpg"
            title="Login"
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
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                className={classes.loginBtn}
                onClick={handleSubmit(handleLogin)}
                disabled={state.isButtonDisabled}
              >
                ログイン
              </Button>
            </CardActions>
            <CardContent className={classes.links}>
              <div className={classes.toSignUp}>
                アカウントがない場合は
                <Link to="sign-up">こちら</Link>
              </div>
              <div className={classes.toForget}>
                パスワードを忘れた場合は
                <Link to="forget">こちら</Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </Fade>
    </form>
  );
};

export default Login;
