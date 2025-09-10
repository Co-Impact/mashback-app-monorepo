import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    Avatar,
    SvgIconTypeMap,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import ScienceIcon from "@mui/icons-material/Science";
import EmailIcon from "@mui/icons-material/Email";
import { useGetSystemHealth } from "../../api/systemHealthRequests/getSystemHealth";
import ShowSkeleton from "../../components/Skeleton/ShowSkeleton";
import { useEffect, useState } from "react";
import { green, red } from "@mui/material/colors";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Table } from "../../components/Table/GenericTable";
import { fakeEventLogs } from "./data/fakeEventLogs";
import { EventLogColumns } from "./EventLogColumns";
import PsychologyIcon from '@mui/icons-material/Psychology';
import CardV2 from "../../components/Card/CardV2";

export enum SystemHealthStatus {
    UP = "up",
    DOWN = "down",
}

const eventTypes = ["all", "log", "fatal", "error", "warn", "debug"];

const serviceMeta = {
    auth: {
        name: "Auth Service",
        description: "Handles authentication and authorization.",
        icon: SecurityIcon,
    },
    labs: {
        name: "Labs Service",
        description: "Manages lab environments and resources.",
        icon: ScienceIcon,
    },
    mailer: {
        name: "Mailer Service",
        description: "Sends transactional and notification emails.",
        icon: EmailIcon,
    },
    aiCore: {
        name: "AI Core Service",
        description: "AI services",
        icon: PsychologyIcon,
    },
};

export interface ServiceType {
    key: string;
    name: string;
    status: SystemHealthStatus;
    description: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const HealthCheckPage = () => {
    const { data, isLoading, error } = useGetSystemHealth();
    const [services, setServices] = useState<ServiceType[]>([]);



    const [filterType, setFilterType] = useState("all");

    const filteredData =
        filterType === "all"
            ? fakeEventLogs
            : fakeEventLogs.filter((log) => log.type === filterType);


    useEffect(() => {
        const details = data?.details
            ? Object.entries(data.details).map(([key, value]) => ({
                key,
                status: value.status === SystemHealthStatus.UP ? SystemHealthStatus.UP : SystemHealthStatus.DOWN,
                ...serviceMeta[key as keyof typeof serviceMeta],
                description: serviceMeta[key as keyof typeof serviceMeta]?.description || "No description available.",
            }))
            : [];
        setServices(details)
    }, [data]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {isLoading ? (
                <ShowSkeleton viewType="card" cardCount={3} />
            ) : (
                <Grid container spacing={3}>
                    {services.map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.name}>
                            <CardV2
                                title={service.name}
                                subheader={`Status: ${service.status === SystemHealthStatus.UP ? 'Healthy' : 'Down'}`}
                                description="Handles all persistent storage operations."
                                icon={
                                    <service.icon sx={{ fill: theme => service.status === SystemHealthStatus.UP  ? theme.palette.mode === 'dark' ? 'white' : 'black' : red[700] }} />
                                }
                                titleTypographyProps={{
                                    sx: { color: service.status === SystemHealthStatus.UP  ? 'inherit' : red[700] },
                                    variant: 'h6',
                                }}
                                subheaderTypographyProps={{
                                    sx: { color: service.status === SystemHealthStatus.UP  ? 'success.dark' : 'error.main' },
                                }}
                                descriptionTypographyProps={{
                                    sx: { color: service.status === SystemHealthStatus.UP ? 'text.primary' : red[700] },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            <Box width={'100%'} mt={6}>
                <Stack flexDirection={"row"} justifyContent="end" alignItems="center" mb={2}>
                    <FormControl sx={{ mb: 1, minWidth: 200, }}>
                        <InputLabel>Filter by Event Type</InputLabel>
                        <Select
                            value={filterType}
                            label="Filter by Event Type"
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            {eventTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                <Table data={filteredData} columnsProp={EventLogColumns} />
            </Box>
        </Container>
    );
};

export default HealthCheckPage;
