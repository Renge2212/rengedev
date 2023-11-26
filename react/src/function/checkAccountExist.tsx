import axios from "axios";

export const checkAccountExist = async (id: string) => {
  console.log(
    `${process.env.REACT_APP_API_ENDPOINT}/api/checkAccountExist?id=${id}`
  );
  const result = await axios(
    `${process.env.REACT_APP_API_ENDPOINT}/api/checkAccountExist?id=${id}`
  );
  console.log(result.data);

  return result.data;
};
