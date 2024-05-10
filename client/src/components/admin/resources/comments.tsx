import { useMediaQuery, Theme } from "@mui/material";
import {
  Create,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Show,
  SimpleForm,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

const commentsFilters = [
  <TextInput source="search" label="Search" alwaysOn />,
  <ReferenceInput source="user" label="User" reference="users" />,
  <ReferenceInput source="book" label="Book" reference="books" />,
];

export const CommentList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={commentsFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.content}
          secondaryText={(record) => record.user}
          tertiaryText={(record) => record.book}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="content" />
          <ReferenceField source="book" reference="books" link="show" />
          <ReferenceField source="user" reference="users" link="show" />
          <DateField source="created_at" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export const CommentShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="content" />
      <ReferenceField source="book" reference="books" link="show" />
      <ReferenceField source="user" reference="users" link="show" />
      <DateField source="created_at" />
    </SimpleShowLayout>
  </Show>
);

export const CommentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        className="sm:w-96"
        source="id"
        InputProps={{ disabled: true }}
      />
      <TextInput className="sm:w-96" source="content" multiline rows={5} />
    </SimpleForm>
  </Edit>
);

export const CommentCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput className="sm:w-96" source="content" multiline rows={5} />
      <ReferenceInput className="sm:w-96" source="book" reference="books">
        <SelectInput className="sm:w-96" source="book" />
      </ReferenceInput>
      <ReferenceInput className="sm:w-96" source="user" reference="users">
        <SelectInput className="sm:w-96" source="user" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
