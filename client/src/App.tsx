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
import { UserCreate, UserEdit, UserList, UserShow } from "@/components/admin/users";
import { ProfileCreate, ProfileEdit, ProfileList, ProfileShow } from "@/components/admin/profiles";
import { AuthorCreate, AuthorEdit, AuthorList, AuthorShow } from "./components/admin/authors";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "./components/admin/categories";
import { BorrowCreate, BorrowEdit, BorrowList, BorrowShow } from "./components/admin/borrows";
import { CommentCreate, CommentEdit, CommentList, CommentShow } from "./components/admin/comments";

const apiUrl = import.meta.env.VITE_API_URL as string;
const authProvider = jwtTokenAuthProvider({ obtainAuthTokenUrl: `${apiUrl}/token/`, refreshTokenUrl: `${apiUrl}/token/refresh/` })
const dataProvider = drfProvider(apiUrl, fetchJsonWithAuthJWTToken);

function App() {
  return (
    <Admin authProvider={authProvider} dataProvider={dataProvider} requireAuth>
      <Resource
        name="users"
        list={UserList}
        show={UserShow}
        edit={UserEdit}
        create={UserCreate}
        recordRepresentation="username"
        icon={UserIcon}
      />
      <Resource
        name="profiles"
        list={ProfileList}
        show={ProfileShow}
        edit={ProfileEdit}
        create={ProfileCreate}
        icon={AccountBoxIcon}
      />
      <Resource
        name="authors"
        list={AuthorList}
        show={AuthorShow}
        edit={AuthorEdit}
        create={AuthorCreate}
        recordRepresentation="name"
        icon={DriveFileRenameOutlineIcon}
      />
      <Resource
        name="categories"
        list={CategoryList}
        show={CategoryShow}
        edit={CategoryEdit}
        create={CategoryCreate}
        recordRepresentation="name"
        icon={CategoryIcon}
      />
      <Resource
        name="books"
        list={BookList}
        show={BookShow}
        edit={BookEdit}
        create={BookCreate}
        recordRepresentation="title"
        icon={LibraryBooksIcon}
      />
      <Resource
        name="borrows"
        list={BorrowList}
        show={BorrowShow}
        edit={BorrowEdit}
        create={BorrowCreate}
        icon={BookOnlineIcon}
      />
      <Resource
        name="comments"
        list={CommentList}
        show={CommentShow}
        edit={CommentEdit}
        create={CommentCreate}
        icon={CommentIcon}
      />
    </Admin>
  );
}

export default App;
