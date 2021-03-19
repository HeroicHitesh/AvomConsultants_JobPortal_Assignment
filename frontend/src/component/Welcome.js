import { Grid, Typography } from "@material-ui/core";

const Welcome = () => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "90vh" }}
    >
      <Grid item>
        <Typography variant="h1">Welcome to Job Portal</Typography>
        <Typography variant="h4">Find your dream job with us!!!</Typography>
      </Grid>
    </Grid>
  );
};

export const ErrorPage = () => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "90vh", color: "red" }}
    >
      <Grid item>
        <Typography variant="h1">Error 404</Typography>
        <Typography variant="h4">Oops, something went wrong!!!</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
