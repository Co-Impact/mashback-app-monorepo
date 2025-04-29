import { Box, Container } from "@mui/material";
import Link from "next/link";

const discussionPage = () => {
  return (
    <Container>
      <Box>
        <h1>Discussion</h1>
        <p>Welcome to the discussion page!</p>
      </Box>
      <Box>
        <Link href={`/discussion/sadfasd}`}>
          <h1>Discussion List</h1>
        </Link>
      </Box>
    </Container>
  );
};

export default discussionPage;
