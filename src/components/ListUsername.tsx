import { TextField, Autocomplete } from "@mui/material";

type UserDataProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
};



function ListUsername({ username, setUsername, options }: UserDataProps) {
  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options}
      value={username}
      onInputChange={(event, value) => {
        setUsername(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Github Username"
          type="search"
        />
      )}
    />
  );
}

export default ListUsername;
