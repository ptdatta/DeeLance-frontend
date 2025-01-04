import AsyncSelect from "react-select/async";
import axios from "axios";
import debounce from "debounce-promise";
import { useEffect, useState } from "react";
import { BASE_URL } from "utils/constants";
import Button from "./Button";

export default function CountrySelect() {
  const [user, setUser] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  useEffect(() => {
    // Ottenere le informazioni dell'utente autenticato
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const fetchedUser = response.data.user;
          setUser(fetchedUser);

          if (fetchedUser && fetchedUser.country) {
            setSelectedCountry({
              label: fetchedUser.country,
              value: fetchedUser.country,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const fetchData = (inputValue: any) => {
    return new Promise((resolve) => {
      axios
        .get(`https://restcountries.com/v3.1/name/${inputValue}?fields=name`)
        .then((res) => {
          const updatedData = res.data.map((item: any) => {
            return { label: item.name.common, value: item.name.common };
          });
          resolve(updatedData);
        })
        .catch((error) => {
          console.error("Fetching countries error: ", error);
          resolve([]);
        });
    });
  };

  const loadingOptions = debounce(fetchData, 2000);

  const changeHandler = (selectedOption: any) => {
    setSelectedCountry(selectedOption);
  };

  const saveCountry = () => {
    console.log("Saving country: ", selectedCountry);
    const token = localStorage.getItem("token");
    if (token && user && selectedCountry) {
      axios
        .patch(
          `${BASE_URL}/user/${user._id}/country`,
          { country: selectedCountry.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Country updated successfully: ", response.data);
        })
        .catch((error) => {
          console.error("Error updating country: ", error);
        });
    }
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadingOptions as any}
        onChange={changeHandler}
        value={selectedCountry}
      />
      <Button
        onClick={saveCountry}
        className="mt-4 max-w-[6rem] w-full ml-auto"
      >
        Save
      </Button>
    </div>
  );
}
