import {
  Card,
  CardContent,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  ListBase,
  ReferenceField,
  SimpleList,
  TextField,
} from "react-admin";

function RecentBorrows() {
  const isSmall = useMediaQuery<Theme>((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="primary" gutterBottom>
          Recent Borrows
        </Typography>
        <ListBase
          resource="borrows"
          filter={{ returned: false, perPage: 5 }}
          sort={{ field: "borrow_date", order: "ASC" }}
        >
          {isSmall ? (
            <SimpleList
              primaryText={
                <ReferenceField source="book" reference="books" link="show">
                  <TextField source="title" />
                </ReferenceField>
              }
              secondaryText={(data) =>
                `Due ${new Date(data.return_date).toDateString()}`
              }
              tertiaryText={
                <ReferenceField
                  className="float-end"
                  source="user"
                  reference="users"
                  link="show"
                >
                  <TextField source="username" />
                </ReferenceField>
              }
            />
          ) : (
            <Datagrid rowClick="show">
              <TextField source="id" />
              <ReferenceField
                source="user"
                reference="users"
                link="show"
                sortable={false}
              />
              <ReferenceField
                source="book"
                reference="books"
                link="show"
                sortable={false}
              />
              <DateField source="borrow_date" />
              <DateField source="return_date" sortable={false} />
              <BooleanField source="returned" sortable={false} />
              <EditButton />
            </Datagrid>
          )}
        </ListBase>
      </CardContent>
    </Card>
  );
}

export default RecentBorrows;
