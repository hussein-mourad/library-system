import "./App.css";
import {
  Admin,
  EditGuesser,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
import UserIcon from "@mui/icons-material/Group";
import CommentIcon from '@mui/icons-material/Comment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CategoryIcon from '@mui/icons-material/Category';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {
  BookEdit,
  BookList,
  BookCreate,
  BookShow,
} from "@/components/admin/books";
// import dataProvider from "@/providers/data-provider";
// import authProvider from "@/providers/auth-provider";
// import { CommentList } from "@/components/admin/comments"
// console.log(authProvider);
//
import drfProvider from "@/providers/drf-provider";
import jwtTokenAuthProvider, { fetchJsonWithAuthJWTToken } from "@/providers/auth-provider";

const apiUrl = import.meta.env.VITE_API_URL as string;
const authProvider = jwtTokenAuthProvider({ obtainAuthTokenUrl: `${apiUrl}/token/`, refreshTokenUrl: `${apiUrl}/token/refresh/` })
const dataProvider = drfProvider(apiUrl, fetchJsonWithAuthJWTToken);

function App() {
  return (
    <Admin authProvider={authProvider} dataProvider={dataProvider} requireAuth>
      <Resource
        name="users"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        icon={UserIcon}
      />
      <Resource
        name="profiles"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        icon={AccountBoxIcon}
      />
      <Resource
        name="authors"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="name"
        icon={DriveFileRenameOutlineIcon}
      />
      <Resource
        name="categories"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="name"
        icon={CategoryIcon}
      />
      <Resource
        name="books"
        list={BookList}
        show={BookShow}
        edit={BookEdit}
        create={BookCreate}
        icon={LibraryBooksIcon}
      />
      <Resource
        name="borrows"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        icon={BookOnlineIcon}
      />
      <Resource
        name="comments"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        icon={CommentIcon}
      />
    </Admin>
  );
}

export default App;
