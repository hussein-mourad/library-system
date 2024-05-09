import { Admin, ListGuesser, Resource } from "react-admin";
import Layout from "./layout";
import { Route } from "react-router-dom";
import BookList from "./books/book-list";
import { BorrowCreate } from "../admin/resources/borrows";

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
        <Route path=":id/borrow" element={<BookItem />} />
      </Resource>
      <Resource name="borrows" list={ListGuesser} create={BorrowCreate}>
        <Route path=":id/return" element={<BookItem />} />
      </Resource>
    </Admin>
  );
}

export default Library;
