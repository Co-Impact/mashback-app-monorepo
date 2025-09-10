import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type CustomNodeData = {
  title: string;
  steps: string[];
  buttonText: string;
  icon?: string;
  url?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const CustomNode = memo(({ id, data }: NodeProps<CustomNodeData>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Card variant="outlined" sx={{ width: 250, borderRadius: 2, position: 'relative' }}>
      <IconButton
        size="small"
        sx={{ position: 'absolute', top: 4, right: 4 }}
        onClick={handleMenuClick}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu open={openMenu} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={() => { handleClose(); data.onEdit(id); }}>Edit</MenuItem>
        <MenuItem onClick={() => { handleClose(); data.onDelete(id); }}>Delete</MenuItem>
      </Menu>

      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          {data.icon && <Avatar src={data.icon} alt={data.title} />}
          <Typography variant="h6">{data.title}</Typography>
        </Box>

        <Typography variant="body2" fontWeight="bold">Steps:</Typography>
        <List dense>
          {data.steps.map((step, idx) => (
            <ListItem key={idx} sx={{ pl: 1 }}>- {step}</ListItem>
          ))}
        </List>

        {data.url && (
          <Button
            variant="contained"
            fullWidth
            size="small"
            sx={{ mt: 1 }}
            onClick={() => window.open(data.url, '_blank')}
          >
            {data.buttonText}
          </Button>
        )}
      </CardContent>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
});

export default CustomNode;
