import { Box, Grid, Stack } from "@mui/material";
import {
  FilterButton,
  FilterForm,
  ListBase,
  Pagination,
  ReferenceInput,
  TextInput,
  Title,
  useListContext,
} from "react-admin";
import Book from "./book";

export function BookListContent() {
  const { data: books } = useListContext();
  return (
    <Grid container spacing={3}>
      {books &&
        books.map((book) => (
          <Grid
            item
            key={book.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="flex justify-center"
          >
            <Book book={book} />
          </Grid>
        ))}
    </Grid>
  );
}

function BookList() {
  const booksFilters = [
    <TextInput source="search" label="Search" alwaysOn />,
    <ReferenceInput source="author" label="Author" reference="authors" />,
    <ReferenceInput
      source="category"
      label="Category"
      reference="categories"
    />,
    <TextInput source="year" label="Year" />,
  ];

  return (
    <ListBase filter={{ status: "available" }}>
      <Title title="Books" />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <FilterForm filters={booksFilters} />
        <div>
          <FilterButton filters={booksFilters} />
        </div>
      </Stack>
      <Box className="my-5">
        <BookListContent />
        <Pagination />
      </Box>
    </ListBase>
  );
}

export default BookList;
