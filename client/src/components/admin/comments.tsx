import { List, TextField, Datagrid, ReferenceField, DateField } from "react-admin"

export const CommentList = () => {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <ReferenceField source="book" reference="books" link="show" />
        <TextField source="content" />
        <DateField source="created_at" />
        {/* <ReferenceField source="user" /> */}
      </Datagrid>
    </List>
  )
}

