import { Box, Typography, useTheme } from "@mui/material";

const StatBox = ({ title, subtitle, icon, img }) => {
  return (
    <Box
      width="100%"
      p={3}
      sx={{
        backgroundColor: "rgb(242 240 240)",
        borderRadius: "4px",
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <img src={img} width="50px" height="50px" />
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#868181" }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: "#4cceac" }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
