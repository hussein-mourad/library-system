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
  WithListContext,
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
            <WithListContext
              render={({ data }) => (
                <SimpleList
                  data={data}
                  primaryText={(data) => data.book.title}
                  secondaryText={(data) =>
                    new Date(data.borrow_date).toLocaleString()
                  }
                  tertiaryText={(data) =>
                    new Date(data.return_date).toLocaleString()
                  }
                />
              )}
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
