import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "../../../components/iconify";

import AppTasks from "../app-tasks";
import AppNewsUpdate from "../app-news-update";
import AppOrderTimeline from "../app-order-timeline";
import AppCurrentVisits from "../app-current-visits";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";
import AppTrafficBySite from "../app-traffic-by-site";
import AppCurrentSubject from "../app-current-subject";
import AppConversionRates from "../app-conversion-rates";
import axios from "axios";
import bag from "../../../../public/assets/icons/glass/ic_glass_bag.png";
import buy from "../../../../public/assets/icons/glass/ic_glass_buy.png";
import shoes from "../../../../public/assets/icons/glass/shoes.png";
import user from "../../../../public/assets/icons/glass/ic_glass_users.png";

// ----------------------------------------------------------------------

function AppView() {

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Đang thí nghiệm lô lô lô lô"
            total="55"
            color="success"
            icon={<img alt="icon" src={bag} />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AppView;
