import { Admin, Resource } from "react-admin";
import Layout from "./layout";
import { Route, useParams } from "react-router-dom";
import BookList from "./resources/books/book-list";
import BorrowCreate from "./resources/borrows/borrow-create";

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
    </Admin>
  );
}

export default Library;
