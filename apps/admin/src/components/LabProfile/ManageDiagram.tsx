import { Add, Edit } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { ILab } from "../../api/types";
import { FC } from "react";
import * as yup from "yup";
import { useModal } from "../../hooks/useModal";

const schema = yup.object({
  diagram: yup.mixed(),
});

export type FormValues = yup.InferType<typeof schema>;

interface ManageDiagramProps {
  data: ILab;
}
const ManageDiagram: FC<ManageDiagramProps> = ({ data }) => {
  const { open } = useModal();
  function handleEditDiagram() {
    open();
  }
  function handleCreateDiagram() {
    open();
  }

  return (
    <Stack
      borderRadius={2}
      spacing={3}
      sx={{ p: 2, bgcolor: "background.paper", color: "text.primary" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ color: "text.primary", fontWeight: 600 }}
          variant="h6"
          gutterBottom
        >
          Diagram
        </Typography>
        {data?.diagram ? (
          <Button
            variant="contained"
            endIcon={<Edit fontSize="small" />}
            onClick={handleEditDiagram}
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<Add fontSize="small" />}
            onClick={handleCreateDiagram}
          >
            Add
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ManageDiagram;
