import { FC, useState } from 'react';
import { Button,  Stack, Typography } from '@mui/material';
import { teamData, colors } from './data';
import { grey } from '@mui/material/colors';
import GlobalAreaChart from '../../Charts/GlobalAreaChart/GlobalAreaChart';

interface StatisticsProps {
    height: number;
}
const Statistics: FC<StatisticsProps> = ({ height }) => {
    const [selectedTeam, setSelectedTeam] = useState<'red' | 'blue' | 'purple'>('red');

    return (
        <GlobalAreaChart
            data={teamData[selectedTeam]}
            tooltipLabelPrefix="Local "
            dataKey="value"
            labelKey="month"
            height={height - 92}
            color={colors[selectedTeam]}
            header={
                <Stack mb={2} direction={'row'} gap={2} justifyContent={'space-between'}>
                    <Typography sx={{ color: 'text.primary' }} fontWeight={700} variant="h6" mb={1} color="text.primary" gutterBottom>
                        Statistics
                    </Typography>
                    <Stack direction={'row'}
                        sx={{
                            border: '1px solid grey',
                            p: 0.5,
                            borderRadius:0.5
                        }}
                        spacing={0.5}
                    >
                        {(['red', 'blue', 'purple'] as const).map((team) => (
                            <Button
                                disableElevation
                                size="medium"
                                key={team}
                                onClick={() => setSelectedTeam(team)}
                                sx={{
                                    backgroundColor: selectedTeam === team ? colors[team] : 'transparent',
                                    color: selectedTeam === team ? 'white' : 'text.primary',
                                    fontSize: '12px',
                                    border: '1px solid grey', 
                                    borderColor: grey[600],
                                    '&:hover': {
                                        borderColor: grey[700], // Adds hover effect for a border
                                    },
                                }}
                            >
                                {`${team.charAt(0).toUpperCase()}${team.slice(1)} Team`}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            }
        />
    )
}

export default Statistics