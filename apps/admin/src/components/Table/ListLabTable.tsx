// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import PeopleIcon from "@mui/icons-material/People";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
//
// const LabIcon = styled("img")({
//   width: "32px",
//   height: "32px",
// });
//
// const Status = styled(Typography)<{ status: string }>(({ status }) => ({
//   fontWeight: "400px",
//   color: getStatusColor(status),
// }));
//
// const LevelText = styled(Typography)<{ Level: string }>(({ Level }) => ({
//   fontWeight: "400",
//   color: getLevelColor(Level),
// }));
//
// const MoreDetailsButton = styled(Button)(() => ({
//   width: "230px",
//   height: "42px",
//   background: "linear-gradient(90deg, #1A73B6 0%, #1A3552 100%);",
//   color: "#FFFFFF",
//   textTransform: "capitalize",
//   padding: "20px",
//   borderRadius: "4px",
//   gab: "10px",
//   fontSize: "14px",
//   "&:hover": {
//     backgroundColor: "#0045E0",
//   },
// }));
//
// interface ListLabCardProps {
//   title: string;
//   labIcon: string;
//   Level: "Easy" | "Medium" | "Hard";
//   operatingSystem: "Linux" | "Windows" | "MacOS";
//   users: number;
//   status: "Not Started" | "Running" | "Completed";
//   points: 639;
// }
// const ListLabTable: React.FC<{ labs: ListLabCardProps[] }> = ({ labs }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage] = useState(5); // We want 5 items per page
//   const handleChangePage = (
//     _event: React.MouseEvent<HTMLButtonElement> | null,
//     newPage: number,
//   ) => {
//     setPage(newPage);
//   };
//
//   const displayedLabs = labs.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage,
//   );
//   return (
//     <Box>
//       <TableContainer
//         component={Paper}
//         sx={{
//           background: "transparent",
//           marginTop: "20px",
//           height: "auto",
//         }}
//       >
//         <Table
//           sx={{
//             width: "1519px",
//             maxWidth: "100%",
//             height: "auto",
//             tableLayout: "fixed",
//           }}
//         >
//           <TableHead>
//             <TableRow
//               sx={{ color: "#fff", borderBottom: "1px solid #73747533" }}
//             >
//               <TableCell
//                 sx={{ borderBottom: "1px solid #73747533", fontSize: "16px" }}
//               >
//                 LAB
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "#fff",
//                   borderBottom: "1px solid #73747533",
//                   fontSize: "16px",
//                 }}
//               >
//                 OS
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "#fff",
//                   borderBottom: "1px solid #73747533",
//                   fontSize: "16px",
//                 }}
//               >
//                 USERS
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "#fff",
//                   borderBottom: "1px solid #73747533",
//                   fontSize: "16px",
//                 }}
//               >
//                 STATUS
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "#fff",
//                   borderBottom: "1px solid #73747533",
//                   fontSize: "16px",
//                 }}
//               >
//                 POINTS GAINED
//               </TableCell>
//               <TableCell
//                 sx={{ color: "#fff", borderBottom: "1px solid #73747533" }}
//               ></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayedLabs.map((lab, index.tsx) => (
//               <TableRow key={index.tsx}>
//                 <TableCell
//                   sx={{
//                     width: "253px",
//                     color: "#fff",
//                     borderBottom: "1px solid #73747533",
//                   }}
//                 >
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <LabIcon src={lab.labIcon} alt={`${lab.title} Icon`} />
//                     <Box display={"flex"} flexDirection={"column"}>
//                       <Typography variant="body2"> {lab.title}</Typography>
//                       <LevelText Level={lab.Level}>
//                         <span style={{ color: "#fff" }}>Level :</span>{" "}
//                         {lab.Level}
//                       </LevelText>
//                     </Box>
//                   </Box>
//                 </TableCell>
//                 <TableCell
//                   sx={{ color: "#fff", borderBottom: "1px solid #73747533" }}
//                 >
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <LabIcon
//                       src={getOsIcon(lab.operatingSystem)}
//                       alt={`${lab.operatingSystem} Icon`}
//                     />
//                     <Typography>{lab.operatingSystem}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell
//                   sx={{ color: "#fff", borderBottom: "1px solid #73747533" }}
//                 >
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <PeopleIcon />
//                     <Typography>{lab.users}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell sx={{ borderBottom: "1px solid #73747533" }}>
//                   <Status status={lab.status}>{lab.status}</Status>
//                 </TableCell>
//                 <TableCell
//                   sx={{ color: "#fff", borderBottom: "1px solid #73747533" }}
//                 >
//                   {lab.points} 936
//                 </TableCell>
//                 <TableCell
//                   sx={{ color: "#fff", borderBottom: "1px solid #73747533" }}
//                 >
//                   <MoreDetailsButton href={""}>More Details</MoreDetailsButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//
//       {/* Pagination */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           alignItems: "center",
//           marginTop: "16px",
//         }}
//       >
//         <IconButton
//           onClick={(e) => handleChangePage(e, page - 1)}
//           disabled={page === 0}
//           sx={{
//             color: "white",
//             backgroundColor: "#1A73B6",
//             "&:hover": {
//               backgroundColor: "#0045E0",
//             },
//             marginRight: "8px",
//             borderRadius: "unset",
//           }}
//         >
//           <ChevronLeftIcon />
//         </IconButton>
//
//         <Typography sx={{ color: "white", marginRight: "8px" }}>
//           Page {page + 1} of {Math.ceil(labs.length / rowsPerPage)}
//         </Typography>
//         <IconButton
//           onClick={(e) => handleChangePage(e, page + 1)}
//           disabled={page >= Math.ceil(labs.length / rowsPerPage) - 1}
//           sx={{
//             color: "white",
//             backgroundColor: "#1A73B6",
//             "&:hover": {
//               backgroundColor: "#0045E0",
//             },
//             borderRadius: "unset",
//           }}
//         >
//           <ChevronRightIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };
//
// export default ListLabTable;
