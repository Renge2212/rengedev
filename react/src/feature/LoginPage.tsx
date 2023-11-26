import { useState } from "react";
import { login } from "../function/login";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Grid, Typography, styled } from "@mui/material";
import { WhiteTextField } from "../component/WhiteTextField";
import { WhiteButton } from "../component/WhiteButton";

function LoginPage() {
  /**
   * useState
   */
  const [stateLogin, setStateLogin] = useState<string>("");

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
  };

  // 入力欄宣言
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
  });

  // ログインボタン押下時処理
  const submit: SubmitHandler<FormProps> = (data) => {
    console.log(data);
    console.log("ログイン開始");
    login(data.id, data.password).then((result) => {
      console.log(result["verify"]);
      if (!result["verify"]) {
        console.log("ログイン失敗");
        setStateLogin("ログイン失敗");
      } else {
        console.log("ログイン成功");
        setStateLogin("ログイン成功");
        navigate("/service");
      }
      console.log("ログイン完了");
    });
  };

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
              <Typography variant="h3">Login</Typography>
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
                    sx={{ minWidth: 223 }}
                    placeholder="ID"
                    error={errors.id ? true : false}
                    helperText={errors.id?.message as string}
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
                }}
                render={({ field, formState: { errors } }) => (
                  <WhiteTextField
                    {...field}
                    variant="outlined"
                    sx={{ minWidth: 223 }}
                    placeholder="パスワード"
                    error={errors.password ? true : false}
                    helperText={errors.password?.message as string}
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
                ログイン
              </WhiteButton>
            </Grid>
            <Grid item xs={12}>
              <div>{stateLogin}</div>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
