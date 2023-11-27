import { createTheme } from "@mui/material";
import { forwardRef } from "react";
import { LinkProps } from "@mui/material/Link";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

declare module "@mui/material/styles" {
  interface CommonColors {
    red: string;
    borderGray: string;
    gray: string;
  }
}

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

LinkBehavior.displayName = "LinkBehavior";

const baseTextColor = "#101828";
const primaryColor = "#468bd1";
const baseBorderColor = "#646F793D";
const baseFontSize = 18;

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
      styleOverrides: {
        root: {
          textDecoration: "none",
          borderRadius: 2,
          fontSize: baseFontSize,
          fontFamily: ["Catamaran", "sans-serif"].join(","),
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
        disableRipple: true,
      },
    },
    MuiListItemButton: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontSize: baseFontSize,
          fontWeight: 600,
        },
      },
      variants: [
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            borderColor: "#318dde",
          },
        },
      ],
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${baseBorderColor}`,
          backgroundColor: "#ffffff",
          borderRadius: 4,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& legend": { display: "none" },
          "& .MuiOutlinedInput-root": {
            paddingRight: 0,
            "& fieldset, &:hover fieldset, &.Mui-focused fieldset": {
              top: 0,
              border: `1px solid ${baseBorderColor}`,
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            padding: "8px 14px",
            backgroundColor: "#ffffff",
          },
          "label + &": {
            marginTop: 24,
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: baseFontSize,
          color: baseTextColor,
          transform: "unset !important",
        },
      },
    },
  },
  palette: {
    text: {
      primary: baseTextColor,
      secondary: "#8A8C8E",
      disabled: "#C7C8CA",
    },
    common: {
      red: "#E11B22",
      gray: "#646F79",
      borderGray: baseBorderColor,
    },
    success: {
      main: "#68B561",
      contrastText: "#ffffff",
    },
    primary: {
      main: primaryColor,
    },
  },
  typography: {
    fontFamily: ["Catamaran", "sans-serif"].join(","),
    fontSize: baseFontSize,
    h3: {
      fontSize: 24,
      fontWeight: 700,
    },
    h2: {
      fontSize: 28,
      fontWeight: 700,
    },
    h4: {
      fontSize: 20,
      fontWeight: 700,
    },
    h1: {
      fontSize: 40,
      fontWeight: 400,
    },
    caption: {
      fontSize: 12,
    },
    subtitle1: {
      fontSize: 16,
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
