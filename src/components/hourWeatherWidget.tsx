import { Hour } from "@/interfaces/forecast";
import { Container, Typography } from "@mui/material";
import moment from "moment";

const HourWeatherWidget = ({hour}: {hour: Hour}) => {
    return (
        <Container>
            <Typography textAlign={'center'}>
                {moment(hour.time).format("hh:mm a")}
            </Typography>
            <img src={hour.condition.icon} alt="Hour weather icon" />
        </Container>
    );
}

export default HourWeatherWidget;