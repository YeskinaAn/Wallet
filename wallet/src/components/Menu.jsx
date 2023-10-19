import { Box, Button, Link } from "@mui/material";
import { useHistory } from "react-router-dom";

const Menu = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <Box
      position="fixed"
      width="100%"
      p={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      top={0}>
      <Box>
        <Link mr={2} href="/costs">
          Costs
        </Link>
        <Link href="/expenses">Expenses</Link>
      </Box>
      <Button sx={{ mr: "40px" }} onClick={logout}>
        Log out
      </Button>
    </Box>
  );
};

export default Menu;
