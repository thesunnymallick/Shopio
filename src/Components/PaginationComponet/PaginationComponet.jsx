import React from "react";

import Pagination from "@mui/material/Pagination";
function PaginationComponet({ perPage, totalProducts, setCurrentPage }) {
  console.log("page", perPage, totalProducts);
  const NoOfPage = Math.ceil(totalProducts / perPage);
  console.log(NoOfPage);

  const handleChange = (e, p) => {
    setCurrentPage(p);
  };
  return (
    <div id="Pagination">
      <Pagination count={NoOfPage} color="secondary" onChange={handleChange} />
    </div>
  );
}

export default PaginationComponet;
