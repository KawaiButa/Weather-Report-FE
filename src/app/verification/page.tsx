"use client";

import { verifyEmail } from "@/apis/verificationApis";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Page = () => {
  const [verifying, setVerifying] = useState(true);
  const [isError, setIsError] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const key = searchParams.get("key");
    const expire = searchParams.get("expire");
    if (!(key && expire)) {
      console.log("Missing field");
      setVerifying(false);
      setIsError(true);
    }

    verifyEmail(key!, Number.parseInt(expire!)).then((value) => {
      if (value == null) setIsError(true);
      setVerifying(false);
    });
  }, []);
  if (verifying)
    return (
      <Container sx={{ justifyContent: "center", alignContent: "center" }}>
        <CircularProgress></CircularProgress>
      </Container>
    );

  if (isError)
    return (
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          bgcolor="#f4f4f4"
          borderRadius="8px"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
          p={4}
        >
          <Stack spacing={2} alignItems="center">
            <ErrorOutlineIcon fontSize="large" color="error" />
            <Typography variant="h4" color="error" textAlign="center">
              Verification Error
            </Typography>
            <Typography variant="body1" textAlign="center">
              Oops! Something went wrong during the email verification process.
              Please try again.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </Stack>
        </Box>
      </Container>
    );
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="#f4f4f4"
        borderRadius="8px"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
        p={4}
      >
        <Stack spacing={2} alignItems="center">
          <CheckCircleOutlineIcon fontSize="large" color="success" />
          <Typography variant="h4" color="success.main" textAlign="center">
            Verification Successful
          </Typography>
          <Typography variant="body1" textAlign="center">
            Thank you for verifying your email address! Your account is now
            fully activated.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = "/home")}
          >
            Go to home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Page;
