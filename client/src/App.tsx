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
import AttributionIcon from '@mui/icons-material/Attribution';
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
import { dataProvider } from "@/providers/data-provider";
// import { CommentList } from "@/components/admin/comments"

function App() {
  return (
    <Admin dataProvider={dataProvider}>
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
