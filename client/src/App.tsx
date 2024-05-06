import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from "react-admin"
import { dataProvider } from "./data-provider"

function App() {
  return <Admin dataProvider={dataProvider}>
    <Resource name="books" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
  </Admin>
}

export default App
