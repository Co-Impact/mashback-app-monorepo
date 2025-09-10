import { ChatRounded } from "@mui/icons-material"
import { Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import { FC } from "react";

interface DashboardStatCardProps {
    title: string;
    count: number|string;
    icon?: React.ReactNode;
    color?: string;
    subtitle?: string;
    subTitleCount?: number|string;
}

const DashboardStatCard:FC<DashboardStatCardProps> = ({title, count, icon, color, subtitle, subTitleCount }) => {
    return (
        <Stack color={'text.contrastText'} spacing={2} sx={{bgcolor: color, borderRadius: 2, padding: 2, boxSizing: 'border-box', flex: 1, width: '100%' }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack>
                    <Typography variant="h6" fontWeight={600}>
                       {title}
                    </Typography>
                    <Typography variant="h4" fontWeight={600}>{count}</Typography>
                </Stack>
                {icon}
            </Stack>

            {subtitle && (
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <Typography variant="body1" fontWeight={600}>
                        {subtitle}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>{subTitleCount}</Typography>
                </Stack>
            )}

        </Stack>
    )
}

export default DashboardStatCard