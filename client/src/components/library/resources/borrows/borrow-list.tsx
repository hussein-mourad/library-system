import { Box, Grid } from "@mui/material";
import {
  ListBase,
  Pagination,
  useListContext,
  useGetIdentity,
  useGetOne,
} from "react-admin";
import Book from "../books/book";

export function BorrowedBook({ borrow }) {
  const { data: book } = useGetOne("books", { id: borrow?.book });
  return book && <Book book={book} borrow={borrow} />;
}

export function BorrowListContent() {
  const { data: borrows } = useListContext();
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
            className="flex justify-center"
          >
            <BorrowedBook key={borrow.id} borrow={borrow} />
          </Grid>
        ))}
    </Grid>
  );
}
function BorrowList() {
  const { data: user } = useGetIdentity();
  return (
    <ListBase filter={{ user: user?.id, status: "available" }}>
      <Box className="my-5">
        <BorrowListContent />
        <Pagination />
      </Box>
    </ListBase>
  );
}

export default BorrowList;
