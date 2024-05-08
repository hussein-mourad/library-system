import { Admin, Resource } from "react-admin";
import UserIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CategoryIcon from "@mui/icons-material/Category";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { BookEdit, BookList, BookCreate, BookShow } from "./resources/books";
import { UserCreate, UserEdit, UserList, UserShow } from "./resources/users";
import {
  ProfileCreate,
  ProfileEdit,
  ProfileList,
  ProfileShow,
} from "./resources/profiles";
import { AuthorCreate, AuthorEdit, AuthorList, AuthorShow } from "./resources/authors";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./resources/categories";
import { BorrowCreate, BorrowEdit, BorrowList, BorrowShow } from "./resources/borrows";
import {
  CommentCreate,
  CommentEdit,
  CommentList,
  CommentShow,
} from "./resources/comments";
import { Dashboard } from "./dashboard";
import drfProvider from "@/providers/drf-provider";
import jwtTokenAuthProvider, {
  fetchJsonWithAuthJWTToken,
} from "@/providers/auth-provider";
import LoginPage from "./login";

const apiUrl = import.meta.env.VITE_API_URL as string;
const authProvider = jwtTokenAuthProvider({
  obtainAuthTokenUrl: `${apiUrl}/token/`,
  refreshTokenUrl: `${apiUrl}/token/refresh/`,
});
const dataProvider = drfProvider(apiUrl, fetchJsonWithAuthJWTToken);

const resources = [
  {
    name: 'users',
    list: UserList,
    show: UserShow,
    edit: UserEdit,
    create: UserCreate,
    recordRepresentation: 'username',
    icon: UserIcon,
  },
  {
    name: 'profiles',
    list: ProfileList,
    show: ProfileShow,
    edit: ProfileEdit,
    create: ProfileCreate,
    icon: AccountBoxIcon,
  },
  {
    name: 'authors',
    list: AuthorList,
    show: AuthorShow,
    edit: AuthorEdit,
    create: AuthorCreate,
    recordRepresentation: 'name',
    icon: DriveFileRenameOutlineIcon,
  },
  {
    name: 'categories',
    list: CategoryList,
    show: CategoryShow,
    edit: CategoryEdit,
    create: CategoryCreate,
    recordRepresentation: 'name',
    icon: CategoryIcon,
  },
  {
    name: 'books',
    list: BookList,
    show: BookShow,
    edit: BookEdit,
    create: BookCreate,
    recordRepresentation: 'title',
    icon: LibraryBooksIcon,
  },
  {
    name: 'borrows',
    list: BorrowList,
    show: BorrowShow,
    edit: BorrowEdit,
    create: BorrowCreate,
    icon: BookOnlineIcon,
  },
  {
    name: 'comments',
    list: CommentList,
    show: CommentShow,
    edit: CommentEdit,
    create: CommentCreate,
    icon: CommentIcon,
  },
];

function AdminPanel() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
      basename="/admin"
      loginPage={LoginPage}
      requireAuth
    >
      {resources.map((resource, index) => (
        <Resource key={index} {...resource} />
      ))}
    </Admin>
  );
}

export default AdminPanel;
