import axios from "axios";

export const createAccount = async (id: string, password: string) => {
  console.log(
    `${process.env.REACT_APP_API_ENDPOINT}/api/createAccount?id=${id}&password=${password}`
  );
  const result = await axios(
    `${process.env.REACT_APP_API_ENDPOINT}/api/createAccount?id=${id}&password=${password}`
  );
  console.log(result.data);

  return result.data;
};
