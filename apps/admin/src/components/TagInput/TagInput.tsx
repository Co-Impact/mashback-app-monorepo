import { Box, Chip, TextField } from '@mui/material';
import { useState, KeyboardEvent, ChangeEvent, FC } from 'react';


export const TagInput: FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
      event.preventDefault();
    }
  };

  const handleDelete = (tagToDelete: string) => () => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box>
      <TextField
        label="Enter tags"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        variant="outlined"
        fullWidth
      />
      <Box mt={2}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={handleDelete(tag)}
            style={{ margin: '0.5rem 0.5rem 0 0' }}
          />
        ))}
      </Box>
    </Box>
  );
};
