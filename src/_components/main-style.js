import { createMuiTheme } from "@material-ui/core/styles";

const primaryColor = "#C40093";
const secondaryColor = "#4F4F4F";
const bodyBackground = "#F8FCFF";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Nunito',
      'sans-serif',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: bodyBackground
        },
        ".MuiInputBase-root": {
          backgroundColor: "white",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline":{
            borderColor: primaryColor
          },
        },
        ".MuiFormLabel-root.Mui-focused, .MuiTypography-colorPrimary, a": {
          color: primaryColor
        },
        ".MuiButton-containedPrimary, .MuiFab-primary, .MuiFab-primary:hover, .MuiButton-containedPrimary, .MuiButton-containedPrimary:hover": {
          backgroundColor: primaryColor
        }
      }
    },
    MuiTypography: {
      root:{
        marginBottom: "1em",
        lineHeight: "1.5",
      }
    },
  }
});

export {
    theme,
    primaryColor,
    secondaryColor,
    bodyBackground,
    // title,
  };
  