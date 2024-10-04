import * as React from 'react';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import coffee from "./picture/coffee.jpg";
import {useNavigate} from 'react-router-dom';


<<<<<<< Updated upstream
const events = Array(12).fill({
  title: "wt",
  image: coffee,  // 这里你可以替换成不同的图片路径
});
=======



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
>>>>>>> Stashed changes

const Img = styled("img")({
  margin: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
});

const images = [
  {
    url: '/static/images/buttons/breakfast.jpg',
    title: 'Breakfast',
    width: '100%',
  },
  
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF',
      dark: '#0066CC',
    },
  },
});
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
export default function FullWidthGrid() {
  const navigate = useNavigate();

const handleClick = () => {
  navigate('/');}
    
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} container direction="column" alignItems="center" spacing={1}>
          <ThemeProvider theme={theme}>
            <Box 
              sx={{
                width: "100%",
                height: 80,
                bgcolor: 'primary.main', 
                display: 'flex', 
                alignItems: 'center',
                justifyContent:'center',
                userSelect: 'none' ,
              }}>
              <Typography variant="h3" color='#5d4037' textAlign="center">
                Menu
              </Typography>
            </Box>
          </ThemeProvider>
        </Grid>
    
        {/* 在这里开始渲染 12 个物品，每行 4 个 */}
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}> {/* 每行 4 个物品 */}
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: "#fff",
              }}
            >
              <ImageButton
                focusRipple
                style={{
                  width: "100%",  // 调整物品宽度
                }}
                onClick={() => navigate('/Menu/SubMenu')}
              >
                <ImageSrc style={{ backgroundImage: `url(${event.image})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={(theme) => ({
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: `calc(${theme.spacing(1)} + 6px)`,
                    })}
                  >
                    {event.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );}
