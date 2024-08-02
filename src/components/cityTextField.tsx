"use client";

import { fetchLocationData } from "@/apis/locationApi";
import { Location } from "@/interfaces/location";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  ChangeEvent,
  Fragment,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
const limit = 3000;
function CityTextField() {
  const isDebounced = useRef(false);
  const [cityList, setCityList] = useState<Array<Location> | undefined>(
    undefined
  );
  const [param, setParam] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleOnChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    event.preventDefault();
    setLoading(true);
    setParam(event.target.value);
    if (isDebounced.current) return;
    fetchLocationData(event.target.value).then(setDebounce);
  }
  function setDebounce(value: Location[]) {
    setCityList(value);
    setLoading(false);
    isDebounced.current = true;
    setTimeout(() => {
      console.log("Done timeout");
      isDebounced.current = false;
    }, 3000);
  }
  useEffect(() => {
    if (loading == true) fetchLocationData(param ?? "").then(setDebounce);
  }, [loading, isDebounced]);

  function handleChangeSelectedLocation(
    event: SyntheticEvent<Element, Event>,
    value: Location | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Location> | undefined
  ): void {
    if (value) localStorage.setItem("location", JSON.stringify(value));
  }

  return (
    <Autocomplete
      id="combo-box-demo"
      options={cityList ?? []}
      getOptionLabel={(option) => `${option.name} - ${option.country}`}
      filterOptions={(x) => x}
      loading={loading}
      sx={{
        backgroundColor: "#fff",
      }}
      onChange={handleChangeSelectedLocation}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={handleOnChange}
          label="Location"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default CityTextField;
