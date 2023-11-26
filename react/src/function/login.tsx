import axios from "axios";

export const login = async (id: string, pass: string) => {
  console.log(
    `${process.env.REACT_APP_API_ENDPOINT}/api/login?id=${id}&password=${pass}`
  );
  const result = await axios(
    `${process.env.REACT_APP_API_ENDPOINT}/api/login?id=${id}&password=${pass}`
  );
  console.log(result.data);

  return result.data;
};
