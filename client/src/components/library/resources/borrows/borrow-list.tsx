import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import {
  ListBase,
  Pagination,
  useListContext,
  useGetIdentity,
  useGetOne,
  LoadingPage,
} from "react-admin";
import Book from "../books/book";
import LoadingScreen from "@/components/common/loading-screen";

export function BorrowedBook({ borrow }) {
  const { data: book } = useGetOne("books", { id: borrow?.book });
  return book && <Book book={book} borrow={borrow} />;
}

export function BorrowListContent() {
  const { data: borrows, isLoading } = useListContext();
  if (isLoading) return <LoadingScreen />;
  if (!borrows.length)
    return (
      <Typography mt={5} variant="h6" textAlign="center">
        No books are borrowed now
      </Typography>
    );
  console.log(borrows);

  return (
    <Grid container spacing={3}>
      {borrows &&
        borrows.map((borrow) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={borrow.id}
            className="flex justify-center"
          >
            <BorrowedBook borrow={borrow} />
          </Grid>
        ))}
    </Grid>
  );
}
function BorrowList() {
  const { data: user } = useGetIdentity();
  return (
    <ListBase filter={{ user: user?.id, returned: false }}>
      <Box className="my-5">
        <BorrowListContent />
        <Pagination />
      </Box>
    </ListBase>
  );
}

export default BorrowList;
