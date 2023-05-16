import vars from "./variables";
import { createTheme } from "@mui/material/styles";

const {
  primaryFont,
  whiteColor,
  outlinedBtnBorderColor,
  outlinedBtnTextColor,
  secondaryBg,
  blackColor,
  primaryBg,
  chipPrimaryColor,
  chipSecondaryColor,
  textErrorColor,
  tabActiveColor
} = vars;

let theme = createTheme();

theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: primaryFont,
    }
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        *, body {
          font-family: ${primaryFont};
          box-sizing: border-box
        }
      `,
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: '0 0 1rem 0'
        }
      }
    },

    MuiTreeView: {
      styleOverrides: {
        root: {
          '& .MuiTreeItem-root': {
            '&:last-of-type': {
              '&:before': {
                height: 'calc(100% - 2.8125rem)'
              }
            }
          }
        }
      }
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 0,
          color: outlinedBtnTextColor,
          borderBottomColor: secondaryBg,
          lineHeight: '150%',
          padding: '0.5rem 0.75rem',
        },
        body: {
        },
        head: {
          background: secondaryBg,
          fontSize: '0.75rem',
        }
      }
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
        }
      }
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          border: `0.0625rem solid ${secondaryBg}`,
          marginBottom: '0.5rem'
        }
      }
    },

    MuiTable: {
      styleOverrides: {
        root: {
        }
      }
    },

    MuiTreeItem: {
      styleOverrides: {
        group: {
          paddingTop: '0.25rem',
          marginLeft: '1.25rem',
        },
        root: {
          position: 'relative',
          padding: 0,
          '&:not([aria-expanded])': {
            '& .MuiTreeItem-iconContainer': {
              position: 'absolute',
              left: '-0.78125rem',
              top: '-0.25rem',
            },
          },
          '&[aria-expanded="true"]': {
            '&:before': {
              content: "''",
              position: 'absolute',
              left: '0.5rem',
              top: '1.25rem',
              backgroundColor: primaryBg,
              height: 'calc(100% - 1rem)',
              width: '0.0625rem',
            }
          }

        },
        content: {
          padding: '0.125rem 0',
          // cursor: 'auto',

          '&:hover': {
            backgroundColor: 'transparent'
          },

          '&.Mui-selected': {
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent'
            },
            '&.Mui-focused': {
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent'
              }
            },
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent'
            }
          },
        },
        iconContainer: {
          marginRight: 0,
          width: 'auto'
        },
        label: {
          paddingLeft: 0,
          userSelect: 'none',
          fontWeight: 400,
          fontSize: '1rem',
          lineHeight: '125%',
          color: outlinedBtnTextColor,

          '& > div > p': {
            flex: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow:'hidden',
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              right: 0,
              width: '5.5rem',
              height: '100%',
              background: 'linear-gradient(270deg, #222222 0%, rgba(34, 34, 34, 0) 26.7%)',

              [theme.breakpoints.up('lg')]: {
                background: 'linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 26.7%)',
              }
            }
          }
        }
      }
    },


    MuiAccordion: {
      styleOverrides: {
        root: {
          background: 'transparent',
          padding: 0,
          color: whiteColor,
          minHeight: 0,
          boxShadow: 'none',

          '&.Mui-expanded': {
            margin: 0
          },

          '&.Mui-expanded:before': {
            opacity: 1,
          },

          // '&:first-of-type:before': {
          //   display: 'block'
          // },

          // '&:last-of-type:before': {
          //   display: 'none'
          // },

          '&:before': {
            backgroundColor: secondaryBg,
            // top: 'auto',
            // bottom: 0,
          },
        }
      }
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 0,
          padding: 0,

          '&.Mui-expanded': {
            minHeight: 0,
          }
        },
        gutters: {
          padding: 0
        },
        contentGutters: {
          padding: 0,
          margin: '1rem 0',
        },
        content: {
          margin: '1rem 0',
          '&.Mui-expanded': {
            margin: '1rem 0',
          },
          '& .MuiTypography-root': {
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: '129%',
            color: outlinedBtnTextColor,
          }
        }
      }
    },

    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        grouped: {
          minWidth: '1.75rem',
          borderRadius: '0.25rem',
          padding: 0,

          '&:not(:last-of-type)': {
            borderColor: blackColor
          }
        }
      }
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontSize: '0.75rem',
          lineHeight: '140%',
          color: whiteColor,
          padding: '0.375rem 0.5rem',

          '&:hover': {
            background: primaryBg
          }
        }
      }
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          background: secondaryBg,
          boxShadow: '0 1.25rem 1.5rem -0.25rem rgba(16, 24, 40, 0.08), 0 0.5rem 0.5rem -0.25rem rgba(16, 24, 40, 0.03)',
          borderRadius: '0.375rem',
          padding: '0.5rem'
        },
        list: {
          padding: 0,
          margin: '0 -0.5rem'
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          fontWeight: 400,
          borderRadius: '0.5rem',
          textTransform: 'none',
          height: '2.125rem',
        },

        text: {
          borderRadius: 0,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }
        },

        contained: {
          boxShadow: 'none',
          height: '1.75rem',
          borderRadius: '0.25rem',
          padding: '0 0.5rem'
        },

        containedSecondary: {
          backgroundColor: primaryBg,
          '&:hover': {
            backgroundColor: primaryBg,
          }
        },

        outlinedInfo: {
          fontSize: '0.75rem',
          height: '1.75rem',
          borderColor: tabActiveColor,
          letterSpacing: '-0.005em',
          color: tabActiveColor,
          borderRadius: '0.25rem',
          minWidth: '3.5rem',
          padding: 0,
        },

        textError: {
          fontSize: '0.75rem',
          height: '1.75rem',
          letterSpacing: '-0.005em',
          color: textErrorColor,
          borderRadius: '0.25rem',
          minWidth: '3.5rem',
          padding: 0,
        },

        textPrimary: {
          color: outlinedBtnTextColor,

          '&.active': {
            color: whiteColor,
            fontWeight: 500,
          }
        },

        outlined: {
          '& svg': {
            marginRight: '0.5rem'
          }
        },

        outlinedPrimary: {
          border: `0.0625rem solid ${outlinedBtnBorderColor}`,
          color: outlinedBtnTextColor,
          '&:hover': {
            borderColor: outlinedBtnBorderColor,
            backgroundColor: outlinedBtnBorderColor,
            color: whiteColor
          }
        }
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          color: whiteColor,

          '&::before': {
            display: 'none'
          },

          '&::after': {
            display: 'none'
          },
        },

        input: {
          '&::placeholder': {
            opacity: 0.8,
          },
        }
      }
    },

    MuiChip: {
      styleOverrides: {
        root: {
          height: '1.5rem',
          padding: '0 0.5rem',

          '& svg': {
            marginRight: '0.5rem'
          }
        },

        colorPrimary: {
          background: chipPrimaryColor,

          '& .MuiChip-label': {
            color: secondaryBg
          }
        },

        colorSecondary: {
          background: chipSecondaryColor
        },

        label: {
          padding: 0,
          fontWeight: 400,
          fontSize: '0.75rem',
          lineHeight: '133%',
          color: whiteColor,


        },

        colorDefault: {
          background: secondaryBg
        },
      }
    },

    MuiLink: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          fontWeight: 400,
          color: whiteColor,

          '&:not(:first-of-type)': {
            marginTop: '0.75rem',
            [theme.breakpoints.up('lg')]: {
              marginLeft: '1.5rem',
              marginTop: 0,
            },

          }
        }
      }
    }
  },
});

export default theme;