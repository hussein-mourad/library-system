import {
  Admin,
  CustomRoutes,
  AppBar,
  ToggleThemeButton,
} from "react-admin";
import Layout from "./layout";
import { Route } from "react-router-dom";

const Hello = () => {
  return <h1>Hello</h1>;
};

const PageAppBar = () => (
  <AppBar
    toolbar={
      <>
        <ToggleThemeButton />
      </>
    }
  ></AppBar>
);
const PageLayout = (props) => (
  <Layout {...props} appBar={PageAppBar}>
    {props.children}
  </Layout>
);

function BookList() {
  return <div>BookList</div>;
}

function Library({ dataProvider, authProvider }) {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={Layout}
    >
      <CustomRoutes>
        <Route path="/" element={<BookList />} />
      </CustomRoutes>
    </Admin>
  );
}

export default Library;
