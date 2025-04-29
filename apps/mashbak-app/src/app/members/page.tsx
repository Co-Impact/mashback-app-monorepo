import { Box, Container } from "@mui/material";
import { FC } from "react";
import { MemberItem } from "@/components/member/Member";

const MembersPage: FC = () => {
  const data = [
    {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
      company: "Tech Corp",
      profilePicture:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Product Manager",
      company: "Innovate Inc",
      profilePicture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3m972e8FEvBi7ETC03avlJcZDg8nT9dWLSw&s",
    },
    {
      id: 3,
      name: "Alice Johnson",
      position: "UX Designer",
      company: "Creative Studio",
      profilePicture:
        "https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg",
    },
    {
      id: 4,
      name: "Bob Brown",
      position: "Data Scientist",
      company: "Data Solutions",
      profilePicture:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
    {
      id: 5,
      name: "Charlie Davis",
      position: "DevOps Engineer",
      company: "Cloud Services",
      profilePicture:
        "https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg",
    },
  ];
  return (
    <Container>
      <Box>
        <h1>Members</h1>
        <p>List of members</p>
      </Box>
      <Box>
        {data.map(({ name, profilePicture, position, company, id }, index) => (
          <MemberItem
            key={index}
            name={name}
            position={position}
            company={company}
            profilePicture={profilePicture}
            path={`/members/${id}`}
          />
        ))}
      </Box>
    </Container>
  );
};

export default MembersPage;
