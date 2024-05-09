import { Box, Grid } from "@mui/material";
import { ListBase, Pagination, useListContext } from "react-admin";
import Book from "./book";

export function BookListContent() {
  const { data: books } = useListContext();
  return (
    <Grid container spacing={3}>
      {books &&
        books.map((book) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="flex justify-center"
          >
            <Book key={book.id} book={book} />
          </Grid>
        ))}
    </Grid>
  );
}

function BookList() {
  return (
    <ListBase filter={{ status: "available" }}>
      <Box className="my-5">
        <BookListContent />
        <Pagination />
      </Box>
    </ListBase>
  );
}

export default BookList;
