import axios from "axios";
import { useEffect, useState } from "react";
import { login } from "../function/login";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField } from "@mui/material";

type FormProps = {
  id: string;
  password: string;
};

function LoginPage() {
  const [data, setData] = useState(null);
  const [stateLogin, setStateLogin] = useState<string>("");

  const navigate = useNavigate();

  type Inputs = {
    id: string;
    pass: string;
  };

  // const { register, handleSubmit } = useForm<Inputs>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onBlur", // blur イベントからバリデーションがトリガーされます。
    criteriaMode: "all", // all -> 発生した全てのエラーが収集されます。
    shouldFocusError: false, //true -> エラーのある最初のフィールドがフォーカスされます。
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {data && <div>{JSON.stringify(data)}</div>}
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="id"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: '必須入力' }
            }}
            render={({ field, formState: { errors } }) => (
              <TextField
                {...field}
                label="id"
                variant="outlined"
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
              required: { value: true, message: '必須入力' }
            }}
            render={({ field, formState: { errors } }) => (
              <TextField
                {...field}
                label="password"
                variant="outlined"
                placeholder="パスワード"
                error={errors.password ? true : false}
                helperText={errors.password?.message as string}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleSubmit(submit)}>ログイン</Button>
        </Grid>
        <Grid item xs={12}>
          <div>{stateLogin}</div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginPage;
