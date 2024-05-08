import {
  Admin,
  CustomRoutes,
  List,
  Resource,
} from "react-admin";
import Layout from "./layout";
import { Route } from "react-router-dom";

function BookList() {
  return (
    <List>

    </List>);
}

function Library({ dataProvider, authProvider }) {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={Layout}
      darkTheme={{ palette: { mode: "dark" } }}
    >
      <Resource name="books" list={BookList} />
      {/* <CustomRoutes> */}
      {/*   <Route path="/" element={<BookList />} /> */}
      {/* </CustomRoutes> */}
    </Admin>
  );
}

export default Library;
