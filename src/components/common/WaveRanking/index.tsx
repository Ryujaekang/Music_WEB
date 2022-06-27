import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface WaveRankingProps {
  wave: number | null;
}

function WaveRanking({ wave }: WaveRankingProps) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {wave === null ? (
        <Typography
          color={theme.palette.primary.main}
          sx={{ fontWeight: 500, fontSize: '1.2rem', letterSpacing: 0.8 }}
        >
          NEW
        </Typography>
      ) : wave === 0 ? (
        <Typography>-</Typography>
      ) : wave < 0 ? (
        <>
          <FontAwesomeIcon
            icon={faCaretDown}
            color={theme.palette.error.main}
            style={{ fontSize: '1.8rem', marginRight: 5 }}
          />
          <Typography variant="subtitle2" color={theme.palette.error.main} sx={{ fontWeight: 500 }}>
            {wave && Math.abs(wave)}
          </Typography>
        </>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faCaretUp}
            color={theme.palette.success.main}
            style={{ fontSize: '1.8rem', marginRight: 5 }}
          />
          <Typography
            variant="subtitle2"
            color={theme.palette.success.main}
            sx={{ fontWeight: 500 }}
          >
            {wave && Math.abs(wave)}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default WaveRanking;
