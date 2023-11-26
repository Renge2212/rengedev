import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import { WhiteTextField } from "../component/WhiteTextField";
import { WhiteButton } from "../component/WhiteButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createAccount } from "../function/createAccount";
import { checkAccountExist } from "../function/checkAccountExist";

function CreateAccount() {
  /**
   * useState
   */
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [openSnackbarDuplicate, setOpenSnackbarDuplicate] = useState(false);
  const [openSnackbarIdExist, setOpenSnackbarIdExist] = useState(false);

  /**
   * useNavigate
   */
  const navigate = useNavigate();

  /**
   * type
   */
  type FormProps = {
    id: string;
    password: string;
    passwordAgain: string;
  };

  /**
   * form
   */
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
  });

  /**
   * function
   */
  // スナックバー:パスワード重複時表示
  const handleOpenSnackbarDuplicate = () => {
    setOpenSnackbarDuplicate(true);
  };

  const handleCloseSnackbarDuplicate = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarDuplicate(false);
  };

  // スナックバー:アカウント重複時表示
  const handleOpenSnackbarIdExist = () => {
    setOpenSnackbarIdExist(true);
  };

  const handleCloseSnackbarIdExist = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarIdExist(false);
  };

  // ログインボタン押下時処理
  const submit: SubmitHandler<FormProps> = async (data) => {
    console.log(data);

    console.log("パスワード重複チェック開始");
    if (data.password !== data.passwordAgain) {
      handleOpenSnackbarDuplicate();
      console.log("パスワード重複");
      return;
    }
    console.log("パスワード重複チェック完了");
    console.log("既存アカウント重複チェック開始");
    await checkAccountExist(data.id).then((result) => {
      console.log(result["exist"]);
      if (result["exist"]) {
        console.log("アカウント重複");
        handleOpenSnackbarIdExist();
        return;
      } else {
        console.log("アカウント非重複");
        // アカウント登録処理
        createAccount(data.id, data.password).finally(() => {
          console.log("アカウント作成完了");
          // ログイン画面へ遷移
          navigate("/login");
        });
      }
      console.log("既存アカウント重複チェック終了");
      return;
    });
  };

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleMouseDownPassword(event: any) {
    event.preventDefault();
  }

  function handleClickShowPasswordAgain() {
    setShowPasswordAgain(!showPasswordAgain);
  }

  function handleMouseDownPasswordAgain(event: any) {
    event.preventDefault();
  }

  /**
   * HTML
   */
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "60vh",
      }}
    >
      <Grid item>
        <Box
          component="form"
          onSubmit={handleSubmit(submit)}
          sx={{
            width: "223px",
            height: "400px",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs sx={{ textAlign: "left" }}>
              <Typography variant="h3">SignUp</Typography>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Controller
                name="id"
                control={control}
                defaultValue=""
                rules={{
                  required: { value: true, message: "必須入力" },
                }}
                render={({ field, formState: { errors } }) => (
                  <WhiteTextField
                    {...field}
                    variant="outlined"
                    placeholder="ID"
                    error={errors.id ? true : false}
                    helperText={errors.id?.message as string}
                    sx={{ minWidth: 223 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: { value: true, message: "必須入力" },
                  maxLength: {
                    value: 20,
                    message: "20文字以下で入力",
                  },
                }}
                render={({ field, formState: { errors } }) => (
                  <WhiteTextField
                    {...field}
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    placeholder="パスワード"
                    error={errors.password ? true : false}
                    helperText={errors.password?.message as string}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ minWidth: 223 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="passwordAgain"
                control={control}
                defaultValue=""
                rules={{
                  required: { value: true, message: "必須入力" },
                  maxLength: {
                    value: 20,
                    message: "20文字以下で入力",
                  },
                }}
                render={({ field, formState: { errors } }) => (
                  <WhiteTextField
                    {...field}
                    type={showPasswordAgain ? "text" : "password"}
                    variant="outlined"
                    placeholder="確認パスワード"
                    error={errors.passwordAgain ? true : false}
                    helperText={errors.passwordAgain?.message as string}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordAgain}
                            onMouseDown={handleMouseDownPasswordAgain}
                            edge="end"
                          >
                            {showPasswordAgain ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ minWidth: 223 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <WhiteButton
                variant="outlined"
                onClick={handleSubmit(submit)}
                sx={{ minWidth: 223 }}
              >
                登録
              </WhiteButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Snackbar
        open={openSnackbarDuplicate}
        autoHideDuration={6000}
        onClose={handleCloseSnackbarDuplicate}
      >
        <Alert
          onClose={handleCloseSnackbarDuplicate}
          severity="warning"
          sx={{ width: "100%" }}
        >
          入力されたパスワードが同じではありません、入力し直してください。
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbarIdExist}
        autoHideDuration={6000}
        onClose={handleCloseSnackbarIdExist}
      >
        <Alert
          onClose={handleCloseSnackbarIdExist}
          severity="warning"
          sx={{ width: "100%" }}
        >
          入力されたIDは他のユーザーが既に使用しています。異なるIDを入力し直してください。
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default CreateAccount;
