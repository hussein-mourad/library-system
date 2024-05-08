import { Typography } from "@mui/material"
import { Link } from "react-admin"

function HelloWorld() {
  return (
    <div className="m-10">
      <Typography variant="h4">Hello world</Typography>
      <Link to="/admin">Admin Page</Link>
    </div>
  )
}

export default HelloWorld
