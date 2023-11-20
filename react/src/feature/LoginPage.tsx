import axios from "axios";
import { useEffect, useState } from "react";
import { login } from "../function/login";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, styled } from "@mui/material";
import { WhiteTextField } from "../component/WhiteTextField";
import { WhiteButton } from "../component/WhiteButton";

function LoginPage() {
  const [data, setData] = useState(null);
  const [stateLogin, setStateLogin] = useState<string>("");

  const navigate = useNavigate();

  type FormProps = {
    id: string;
    password: string;
  };

  const StyledBox = styled(Box)(() => ({
    margin: 0,
    width: "100vw",
    height: "100vh",
  }));

  // const WhiteTextField = {
  //   "& .MuiOutlinedInput-root": {
  //     "& fieldset": {
  //       borderColor: "#CCCCCC", // 通常時のボーダー色(アウトライン)
  //     },
  //     "&:hover fieldset": {
  //       borderColor: "#DDDDDD", // ホバー時のボーダー色(アウトライン)
  //     },
  //   },
  // };

  // const styledTextField = styled(TextField)(whiteTextField);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
  });

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

  const fetchData = async () => {
    const result = await axios(
      `${process.env.REACT_APP_API_ENDPOINT}/api/getLoginData`
    );
    console.log(result.data);
    setData(result.data);
  };

  // 初期化
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: 0, width: "100vw", height: "60vh" }}
      >
        <Grid item>{data && <div>{JSON.stringify(data)}</div>}</Grid>
        <Grid item>
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
                sx={{ display: "flex", minWidth: 223 }}
                placeholder="ID"
                error={errors.id ? true : false}
                helperText={errors.id?.message as string}
              />
            )}
          />
        </Grid>
        <Grid item>
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
                sx={{ display: "flex", minWidth: 223 }}
                placeholder="パスワード"
                error={errors.password ? true : false}
                helperText={errors.password?.message as string}
              />
            )}
          />
        </Grid>
        <Grid item>
          <WhiteButton
            variant="outlined"
            onClick={handleSubmit(submit)}
            sx={{ display: "flex", minWidth: 223 }}
          >
            ログイン
          </WhiteButton>
        </Grid>
        <Grid item>
          <div>{stateLogin}</div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginPage;
