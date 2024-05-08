import {
  Admin,
  CustomRoutes,
  List,
  Resource,
  useListContext,
} from "react-admin";
import Layout from "./layout";
import { Route } from "react-router-dom";
import Book from "./books/book";
import { Grid } from "@mui/material";
import { useEffect } from "react";

function BookListContent() {
  const { data: books, isLoading } = useListContext();
  return (
    <Grid container spacing={3}>
      {books && books.map((book) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Book key={book.id} book={book} />
        </Grid>
      ))}
    </Grid>
  )

}

function BookList() {
  return (
    <List>
      <BookListContent />
    </List>
  );
}

function BookItem() {
  return (
    <h1>Book item</h1>
  );
}


function Library({ dataProvider, authProvider }) {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={Layout}
      darkTheme={{ palette: { mode: "dark" } }}
    >
      <Resource name="books" list={BookList}>
        <Route path="/books/:id" element={<BookItem />} />
      </Resource>
    </Admin>
  );
}

export default Library;

