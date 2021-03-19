import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = (location) => {
    history.push(location);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick("/")}
        >
          Job Portal
        </Typography>
        <>
          <Button color="inherit" onClick={() => handleClick("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => handleClick("/signup")}>
            Signup
          </Button>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
