import axios from "axios";
import { useEffect, useState } from "react";
import { login } from "../function/login";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState(null);
  const [stateLogin, setStateLogin] = useState<string>("");

  const navigate = useNavigate();

  type Inputs = {
    id: string;
    pass: string;
  };

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log("ログイン開始");
    login(data.id, data.pass).then((result) => {
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
    <div>
      <div>{data && <div>{JSON.stringify(data)}</div>}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        id
        <input {...register("id")} />
        pass
        <input {...register("pass")} />
        <input type="submit" value="login" />
      </form>
      <div>{stateLogin}</div>
    </div>
  );
}

export default Login;
