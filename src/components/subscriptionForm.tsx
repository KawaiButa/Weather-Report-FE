"use client";
import { subscribe, unSubscribe } from "@/apis/verificationApis";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useState } from "react";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  async function handleSubscribe() {
    if (validateEmail(email)) {
      setLoading(true);
      await subscribe(email)
        .then((value) => {
          setMessage("Please check your email for the verification mail.");
          setIsError(false);
        })
        .catch((error) => {
          setMessage(error.message);
          setIsError(true);
        });
      setLoading(false);
      return;
    }
    setIsError(true);
    setMessage("The email is invalid");
  }
  async function handleUnsubscribe() {
    if (validateEmail(email)) {
      setLoading(true);
      await unSubscribe(email)
        .then((value) => {
          setMessage("The email has unsubscribed from our service");
          setIsError(false);
        })
        .catch((error) => {
          setIsError(true);
          setMessage(error.message);
        });
      setLoading(false);
      return;
    }
    setIsError(true);
    setMessage("The email is invalid");
  }
  return (
    <Container disableGutters={true}>
      <Typography variant="h6">Subscription</Typography>
      <TextField
        variant="outlined"
        label="Email"
        autoComplete="off"
        type="email"
        sx={{ backgroundColor: "#fff", width: "100%", marginBottom: 2 }}
        onChange={(value) => setEmail(value.target.value)}
      />
      {message && (
        <Typography
          sx={{ color: `${isError ? "red" : "green"}`, marginBottom: 0.2 }}
        >
          {message}
        </Typography>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleSubscribe()}
            >
              Subscription
            </Button>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => handleUnsubscribe()}
            >
              Unsubscription
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default SubscriptionForm;
