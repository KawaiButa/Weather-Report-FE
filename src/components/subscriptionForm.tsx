import { Button, Container, Grid, TextField, Typography } from "@mui/material";

const SubscriptionForm = () => {
  return (
    <Container disableGutters={true}>
      <Typography variant="h6">Subscription</Typography>
      <TextField
        variant="outlined"
        label="Email"
        sx={{ backgroundColor: "#fff", width: "100%", marginBottom: 2 }}
      />
      <Grid container spacing={2}>
        <Grid item>
          <Button fullWidth variant="contained">
            Subscription
          </Button>
        </Grid>
        <Grid item>
          <Button fullWidth variant="contained" color="secondary">
            Unsubscription
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SubscriptionForm;
