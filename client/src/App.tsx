import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from "react-admin"
import { dataProvider } from "@/providers/data-provider"
import { BookEdit, BookList, BookCreate, BookShow } from "@/components/admin/books"
import "./App.css"
import { Group } from "@material-ui/icons"
// import { CommentList } from "@/components/admin/comments"


function App() {
  return <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} icon={<Group />} />
    <Resource name="profiles" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
    <Resource name="authors" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} recordRepresentation="name" />
    <Resource name="categories" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} recordRepresentation="name" />
    <Resource name="books" list={BookList} show={BookShow} edit={BookEdit} create={BookCreate} />
    <Resource name="borrows" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
    <Resource name="comments" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
  </Admin>
}

export default App
