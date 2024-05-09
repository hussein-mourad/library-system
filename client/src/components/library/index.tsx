import { Admin, Resource } from "react-admin";
import Layout from "./layout";
import { Route } from "react-router-dom";
import BookList from "./books/book-list";

function BookItem() {
  return <h1>Book item</h1>;
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
