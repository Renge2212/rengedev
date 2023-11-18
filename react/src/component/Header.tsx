import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handlerLogin = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ログインテストできるサイト
          </Typography>
          <Button color="inherit" onClick={() => handlerLogin()}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
