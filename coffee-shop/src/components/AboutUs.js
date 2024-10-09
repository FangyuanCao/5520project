import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import coffee from './picture/coffee.jpg';


export default function AboutUsPage() {
  return (
<Box sx={{ width: '100%', height: '100%',mt:5,px:10}}> {/* 设置 Box 高度为全屏 */}
  <Box>
  <Grid container>
    <Grid item xs={6}> {/* 左侧占据屏幕的一半 */}
      <Box sx={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color='#5d4037' textAlign="left" height='360'>


        Welcome to [Coffee Shop Name]!

At [Coffee Shop Name], we believe every cup of coffee tells a story. Established in [Year] by [Founder’s Name], our mission is to serve high-quality coffee in a warm and inviting atmosphere.

We carefully select premium coffee beans from around the world, using both traditional and modern brewing methods to ensure each cup is exceptional.

Join us for a quiet moment or a lively chat with friends, and don’t miss our regular events and workshops. We’re excited to share our passion for coffee with you
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}> {/* 右侧占据屏幕的另一半 */}

    <Card sx={{width:"60%",mt:5}} >
      <CardMedia
        component="img"
        alt="advertisement"
        height="360"
        image={coffee}
      />
      </Card>

    </Grid>
  </Grid>
  </Box>
  <Box sx={{width: '100%', height: '100%',mt:5}}>
        {[1, 2, 3].map((index) => (
          <Grid container key={index} sx={{ mb: 5 }}>
            <Grid item xs={6}> {/* 左侧图片 */}
              <Card sx={{ width: "100%", mx: "auto" }}>
                <CardMedia
                  component="img"
                  alt={`Story Image ${index}`}
                  height="300"
                  image={coffee}
                />
              </Card>
            </Grid>
            <Grid item xs={6}> {/* 右侧文字 */}
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%'}}>
                <Typography variant="body1" color='#5d4037' textAlign="left" sx={{width:"60%",mt:5,px:5 }}>
                  {index === 1 && (
                    <>
                      <strong>Our Coffee Journey:</strong> From farm to cup, we take pride in sourcing the best beans, ensuring sustainability and quality in every sip.
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <strong>Brewing Techniques:</strong> Blending the traditional with the innovative, our expert baristas craft each cup with care, ensuring consistency and flavor.
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <strong>Community & Events:</strong> More than just a coffee shop, we host regular workshops, events, and tastings, bringing people together over their love for coffee.
                    </>
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Box>
</Box>
  );
}