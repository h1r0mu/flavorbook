import React, { useEffect, useReducer, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
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
    forgotpasswordBtn: {
      marginTop: theme.spacing(2),
      margin: "auto",
      maxWidth: 200,
      background: "#5f4e44",
      color: "#fff",
    },
  })
);

//state type
type State = {
  email: string,
  isButtonDisabled: boolean,
  helperText: string,
  isError: boolean,
};

const initialState: State = {
  email: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setEmail", payload: string }
  | { type: "setIsButtonDisabled", payload: boolean }
  | { type: "forgotpasswordSuccess", payload: string }
  | { type: "forgotpasswordFailed", payload: string }
  | { type: "setIsError", payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "forgotpasswordSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "forgotpasswordFailed":
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

export default function ForgetPassword() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { register, handleSubmit, errors, trigger } = useForm();

  useEffect(() => {
    if (state.email.trim()) {
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

  async function handleForgotPassword() {
    // async function handleLogin(data) {
    try {
      setError("");
      setSuccessMessage("");
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });

      await resetPassword(state.email, state.password);
      dispatch({
        type: "forgotpasswordSuccess",
        payload: "ForgotPassword Successfully",
      });

      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });

      setSuccessMessage("パスワードを初期化しました");
    } catch (e) {
      console.log(e);

      switch (e.code) {
        case "auth/network-request-failed":
          setError(
            "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいいところでやり直してください"
          );
          break;
        case "auth/invalid-email":
          setError("メールアドレスまたはパスワードが正しくありません");
          break;
        case "auth/wrong-passsword":
          setError("メールアドレスまたはパスワードが正しくありません");
          break;
        case "auth/user-disabled":
          setError("入力されたメールアドレスは無効になってます。");
          break;
        default:
          setError(
            "処理に失敗しました。通信環境がいい所で再度やり直してください。"
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
          handleForgotPassword();
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

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Fade in={true} timeout={2000}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image="./static/coffee_forgetPassword.jpg"
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
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className={classes.forgotpasswordBtn}
                onClick={handleSubmit(handleForgotPassword)}
                disabled={state.isButtonDisabled}
              >
                パスワードを初期化
              </Button>
            </CardActions>
            <CardContent>
              アカウントがない場合は<Link to="/sign-up">こちら</Link>
            </CardContent>
          </div>
        </Card>
      </Fade>
    </form>
  );
}
