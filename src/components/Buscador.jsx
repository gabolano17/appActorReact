import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const Buscador = ({ valor, buscar }) => {
  const [data, setData] = useState(null);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/actor/listar`)
      .then((res) => res.json())
      .then((res) => setActors(res));
  }, []);

  const handleChange = (e, data) => {
    e.preventDefault();
    setData(data);
    const { actor_id } = data || {};
    valor(actor_id);
  };

  return (
    <Stack>
      <Autocomplete
        className="autocomplete"
        id="actors"
        getOptionLabel={(actor) => `${actor.first_name} ${actor.last_name}`}
        options={actors}
        isOptionEqualToValue={(option, value) =>
            option.first_name === value.first_name
          }
        renderOption={(props, actors) => (
          <Box component="li" {...props} key={actors.actor_id}>
            {actors.first_name} {actors.last_name}
          </Box>
        )}
        freeSolo
        renderInput={(params) => (
            <TextField {...params} label="search actors" />
          )}
        onChange={handleChange}
        value={data}
      />
      <div className="py-3">
        <Button type="submit" color="info" onClick={buscar} className="col-md-8">Search</Button>
        <Button type="button" color="warning" onClick={() => window.location.reload()} className="col-md-4">Refresh</Button>
      </div>
    </Stack>
  );
};

export default Buscador;
