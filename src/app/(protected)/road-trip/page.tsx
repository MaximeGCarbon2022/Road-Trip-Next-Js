import { RoadTripView } from "@/features/roadtrip/components/roadTripView/RoadTripView";
import { getRoadTrip } from "@/features/roadtrip/services/service";
import { Divider, Paper, Typography } from "@mui/material";
import { FC } from "react";

const RoadTripPage: FC = async () => {
  const roadTrip = await getRoadTrip();
  const countries = roadTrip?.countries ?? [];

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Mes Road Trips
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <RoadTripView countries={countries} />
    </Paper>
  );
};

export default RoadTripPage;
