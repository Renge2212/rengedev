import axios from "axios";
import { useEffect, useState } from "react";
import { login } from "../function/login";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { WhiteTextField } from "../component/WhiteTextField";
import { WhiteButton } from "../component/WhiteButton";

function LoginPage() {
  /**
   * useState
   */
  const [data, setData] = useState(null);
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

  /**
   * styled
   */
  const StyledBox = styled(Box)(() => ({
    margin: 0,
    width: "100vw",
    height: "100vh",
  }));

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

  // TODO: ログイン機能が完成したら削除
  //テスト用データ取得・設定処理
  const testGetAccount = async () => {
    const result = await axios(
      `${process.env.REACT_APP_API_ENDPOINT}/api/getLoginData`
    );
    console.log(result.data);
    setData(result.data);
  };

  // 初期化処理
  useEffect(() => {
    testGetAccount();
  }, []);

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
            <Grid item xs>
              {data && <div>{JSON.stringify(data)}</div>}
            </Grid>
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
