import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: 'dark' });

export const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: `"Noto Sans KR",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif`,
          body1: {
            fontSize: '1.6rem',
          },
          body2: {
            fontSize: '1.6rem',
          },
          subtitle1: {
            fontSize: '1.6rem',
            fontWeight: 500,
            lineHeight: 1.3,
          },
          subtitle2: {
            fontSize: '1.6rem',
            fontWeight: 400,
            lineHeight: 1.3,
          },
          h6: {
            fontSize: '2rem',
          },
          h5: {
            fontSize: '2.4rem',
          },
          button: {
            fontSize: '1.6rem',
          },
        },
        zIndex: {
          appBar: 100,
          drawer: 200,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => React.useContext(ColorModeContext);
