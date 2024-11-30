import {FC} from "react";
import {Box} from "@mui/material";

interface Props {
    label: string
}
export const HomeCard: FC<Props> = ({label}) => {
return(
    <Box>
        <label>{label}</label>
</Box>
)}