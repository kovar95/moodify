import { Box, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";

export const StyledMenuItem = styled(MenuItem)<{ opened: number }>(
  ({ theme, opened }) => ({
    color: theme.palette.primary.light,
    ":hover": {
      backgroundColor: theme.palette.primary.contrastText,
    },
    transition: "all .9s ease",
    paddingRight: 0,
    paddingLeft: opened ? 16 : 8,
  })
);

export const StyledInput = styled(TextField)(({ theme }) => ({
  "& input": {
    color: theme.palette.text.primary,
    fontSize: "14px",
    padding: "7px",
    outline: `0.5px ${theme.palette.info.main} solid`,
    width: "125px",
    borderRadius: "4px",
  },
  "& fieldset.MuiOutlinedInput-notchedOutline": {
    borderColor: `${theme.palette.info.main} !important`,
  },
}));

export const StyledColorField = styled(Box)<{ palette?: string }>(
  ({ palette, theme }) => ({
    borderRadius: "50px",
    width: "25px",
    height: "25px",
    marginLeft: "6px",
    position: "relative",
    backgroundColor: palette ?? theme.palette.common.white,
    color: palette ?? theme.palette.common.black,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  })
);

export const StyledColorBox = styled(Box)<{ show: number }>(
  ({ show, theme }) => ({
    backgroundColor: theme.palette.info.light,
    borderRadius: "50px",
    padding: "24px 2px 0",
    position: "absolute",
    top: 0,
    width: "100%",
    visibility: show ? "visible" : "hidden",
    height: show ? "auto" : "0",
  })
);

export const StyledBox = styled(Box)<{ palette?: string }>(
  ({ palette, theme }) => ({
    width: "18px",
    height: "18px",
    margin: "6px auto",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: "0.8",
    backgroundColor: palette ?? theme.palette.common.white,
    "&:hover": {
      opacity: "1",
    },
  })
);

export const AddButton = styled(AddIcon)(({ theme }) => ({
  marginLeft: "8px",
  color: theme.palette.info.main,
}));
