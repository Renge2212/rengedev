import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { IsDesktop } from "../App";
import { WhiteButton } from "../component/WhiteButton";
import { useNavigate } from "react-router-dom";

function EntryPage() {
  /**
   * useContext
   */
  const isDesktop = useContext(IsDesktop);

  /**
   * useNavigate
   */
  const navigate = useNavigate();

  /**
   * function
   */
  const handlerLogin = () => {
    navigate("/login");
  };

  const handlerCreateAccount = () => {
    navigate("/createAccount");
  };

  /**
   * HTML
   */
  return (
    <Grid container>
      <Grid item>
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "10%",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              {isDesktop ? (
                <Typography variant="h4" height="auto">
                  RengeDev
                </Typography>
              ) : (
                <Typography variant="h5" height="auto">
                  RengeDev
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {isDesktop ? (
                <Typography variant="h4" height="auto">
                  新感覚のログイン体験
                </Typography>
              ) : (
                <Typography variant="h5" height="auto">
                  新感覚のログイン体験
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <WhiteButton
                variant="outlined"
                onClick={() => handlerLogin()}
                sx={{ minWidth: 223, marginTop: 10 }}
              >
                今すぐログイン
              </WhiteButton>
            </Grid>
            <Grid item xs={12}>
              <WhiteButton
                variant="outlined"
                onClick={() => handlerCreateAccount()}
                sx={{ minWidth: 223 }}
              >
                アカウント登録
              </WhiteButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EntryPage;
