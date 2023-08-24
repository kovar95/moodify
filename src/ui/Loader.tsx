import { Box, CircularProgress, styled, Backdrop } from "@mui/material";

const LoadingSpinner = () => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
    }}
  >
    <CircularProgress
      sx={{
        color: "white",
      }}
    />
  </Box>
);

const StyledBackdrop = styled(Backdrop)(() => ({
  backgroundColor: "transparent",
  backdropFilter: "blur(2px)",
}));

const ScreenLoader = () => (
  <StyledBackdrop open>
    <LoadingSpinner />
  </StyledBackdrop>
);

export default ScreenLoader;
