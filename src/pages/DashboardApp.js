// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { CustomLoader } from '../components/common/customLoader/customLoader';

// components
import Page from '../components/Page';
// sections
import { AppCurrentVisits, AppWidgetSummary, AppConversionRates } from '../sections/@dashboard/app';
import Protected from '../utils/protected';

// ----------------------------------------------------------------------

function unAuthorizedComponent() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>
        This is only visible to Admins
        <br />
        Login to View Dashboard
      </h1>
    </div>
  );
}

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <>
      {/* loader with its own internal handling */}
      {/* todo add target feature redux name later */}
      <CustomLoader />
      <Protected allowedRoles={'admin'} unAuthorizedComponent={unAuthorizedComponent()}>
        <Page title="Dashboard">
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
              Hi, Welcome back
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4}>
                <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:user-outlined'} />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <AppWidgetSummary title="New Shops" total={714000} icon={'ant-design:shop'} />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <AppWidgetSummary title="Sales" total={1723315} color="warning" icon={'ant-design:dollar-outlined'} />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Current Visits"
                  chartData={[
                    { label: 'America', value: 4344 },
                    { label: 'Asia', value: 5435 },
                    { label: 'Europe', value: 1443 },
                    { label: 'Africa', value: 4443 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.chart.blue[0],
                    theme.palette.chart.violet[0],
                    theme.palette.chart.yellow[0],
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Conversion Rates"
                  subheader="(+43%) than last year"
                  chartData={[
                    { label: 'Italy', value: 400 },
                    { label: 'Japan', value: 430 },
                    { label: 'China', value: 448 },
                    { label: 'Canada', value: 470 },
                    { label: 'France', value: 540 },
                    { label: 'Germany', value: 580 },
                    { label: 'South Korea', value: 690 },
                    { label: 'Netherlands', value: 1100 },
                    { label: 'United States', value: 1200 },
                    { label: 'United Kingdom', value: 1380 },
                  ]}
                />
              </Grid>
            </Grid>
          </Container>
        </Page>
      </Protected>
    </>
  );
}
