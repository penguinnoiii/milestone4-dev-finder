import { TextField, Autocomplete } from "@mui/material";

type UserDataProps = {
    username: string[];
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}


function ListUsername({ username,setUsername } : UserDataProps) {
  return (
    <Autocomplete
      options={username}
      onInputChange={(event, value) => {
        setUsername(value);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Enter Github Username" variant="standard" />
      )}
    />
  );
}

export default ListUsername;
