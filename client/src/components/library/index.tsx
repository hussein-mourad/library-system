import { Admin, Resource } from "react-admin";
import Layout from "./layout";
import { Route } from "react-router-dom";
import BorrowCreate from "./resources/borrows/borrow-create";
import BookList from "./resources//books/book-list";

function Library({ dataProvider, authProvider }) {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={Layout}
      darkTheme={{ palette: { mode: "dark" } }}
    >
      <Resource name="books" list={BookList}>
        <Route path=":id/borrow" element={<BorrowCreate />} />
      </Resource>
      <Resource name="authors" recordRepresentation="name" />
      <Resource name="categories" recordRepresentation="name" />
    </Admin>
  );
}

export default Library;
