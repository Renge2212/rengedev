import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const myStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff", // 通常時のボーダー色(アウトライン)
    },
    // "&:hover fieldset": {
    //   borderColor: "#DDDDDD", // ホバー時のボーダー色(アウトライン)
    // },
  },
};

export const WhiteTextField = styled(TextField)(myStyle);
