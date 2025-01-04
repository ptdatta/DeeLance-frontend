import Typography from "./Typography";
import SelectBox from "./SelectBox";
import { useTranslation } from "react-i18next";

function PerPageItemsSelector({
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
}: any) {
  const { t } = useTranslation();

  const handleItemsPerPageChange = (e: any) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Resetta alla prima pagina ogni volta che cambia il numero di elementi per pagina
  };

  return (
    <div className="flex items-center [&>*:not(:last-child)]:me-2 flex-1">
      <Typography>{t("Show")}</Typography>
      <SelectBox
        // wrapperClassName="max-w-[4.4rem] w-full"
        className="rounded-md px-4 py-1"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        // options={[{ value: 5 }, { value: 10 }, { value: 15 }, { value: 20 }]}
      />
      <Typography>{t("entries")}</Typography>
    </div>
  );
}

export default PerPageItemsSelector;
