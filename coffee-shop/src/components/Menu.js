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
        <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  alignItems="center"
                  spacing={1}
          >

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
        <Grid item xs={3} >
        <Paper
      sx={(theme) => ({
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#fff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#1A2027",
        }),
      })}
    >
      <Grid container spacing={2}>
        {/* 图片部分 */}
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
<Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
            
          }}
          onClick={() => navigate('/Menu/SubMenu')}
        >
          <ImageSrc style={{ backgroundImage: `url(${coffee})` }} />
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
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
        </Grid>

        {/* 文字部分 */}
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          spacing={1}
        >
          {/* ID */}
          <Grid item>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ID: 1030114
            </Typography>
          </Grid>

          {/* Remove */}
          <Grid item>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Remove
            </Typography>
          </Grid>

          {/* 价格 */}
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>
        <Grid item xs={3} >
        <Paper
      sx={(theme) => ({
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#fff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#1A2027",
        }),
      })}
    >
      <Grid container spacing={2}>
        {/* 图片部分 */}
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
<Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${coffee})` }} />
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
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
        </Grid>

        {/* 文字部分 */}
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          spacing={1}
        >
          {/* ID */}
          <Grid item>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ID: 1030114
            </Typography>
          </Grid>

          {/* Remove */}
          <Grid item>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Remove
            </Typography>
          </Grid>

          {/* 价格 */}
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>
        <Grid item xs={3} >
        <Paper
      sx={(theme) => ({
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#fff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#1A2027",
        }),
      })}
    >
      <Grid container spacing={2}>
        {/* 图片部分 */}
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
<Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${coffee})` }} />
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
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
        </Grid>

        {/* 文字部分 */}
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          spacing={1}
        >
          {/* ID */}
          <Grid item>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ID: 1030114
            </Typography>
          </Grid>

          {/* Remove */}
          <Grid item>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Remove
            </Typography>
          </Grid>

          {/* 价格 */}
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>
        <Grid item xs={3} >
        <Paper
      sx={(theme) => ({
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#fff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#1A2027",
        }),
      })}
    >
      <Grid container spacing={2}>
        {/* 图片部分 */}
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
<Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${coffee})` }} />
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
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
        </Grid>

        {/* 文字部分 */}
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          spacing={1}
        >
          {/* ID */}
          <Grid item>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ID: 1030114
            </Typography>
          </Grid>

          {/* Remove */}
          <Grid item>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Remove
            </Typography>
          </Grid>

          {/* 价格 */}
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>
               <Grid item xs={3} >
        <Paper
      sx={(theme) => ({
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#fff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#1A2027",
        }),
      })}
    >
      <Grid container spacing={2}>
        {/* 图片部分 */}
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
<Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${coffee})` }} />
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
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
        </Grid>

        {/* 文字部分 */}
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          spacing={1}
        >
          {/* ID */}
          <Grid item>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ID: 1030114
            </Typography>
          </Grid>

          {/* Remove */}
          <Grid item>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Remove
            </Typography>
          </Grid>

          {/* 价格 */}
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>
        <Grid item xs={3} >
        <Paper
      sx={(theme) => ({
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#fff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#1A2027",
        }),
      })}
    >
      <Grid container spacing={2}>
        {/* 图片部分 */}
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
<Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${coffee})` }} />
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
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
        </Grid>

        {/* 文字部分 */}
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          spacing={1}
        >
          {/* ID */}
          <Grid item>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ID: 1030114
            </Typography>
          </Grid>

          {/* Remove */}
          <Grid item>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Remove
            </Typography>
          </Grid>

          {/* 价格 */}
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>
        <Grid item xs={3} >
        <Paper
      sx={(theme) => ({
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#fff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#1A2027",
        }),
      })}
    >
      <Grid container spacing={2}>
        {/* 图片部分 */}
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
 <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${coffee})` }} />
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
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
        </Grid>

        {/* 文字部分 */}
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          spacing={1}
        >
          {/* ID */}
          <Grid item>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ID: 1030114
            </Typography>
          </Grid>

          {/* Remove */}
          <Grid item>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Remove
            </Typography>
          </Grid>

          {/* 价格 */}
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>
        <Grid item xs={3} >
        <Paper
      sx={(theme) => ({
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#fff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#1A2027",
        }),
      })}
    >
      <Grid container spacing={2}>
        {/* 图片部分 */}
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
<Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${coffee})` }} />
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
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
        </Grid>

        {/* 文字部分 */}
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          spacing={1}
        >
          {/* ID */}
          <Grid item>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ID: 1014
            </Typography>
          </Grid>

          {/* Remove */}
          <Grid item>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Remove
            </Typography>
          </Grid>

          {/* 价格 */}
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>
      </Grid>
  );
}
