import React from "react";

import Pagination from "@mui/material/Pagination";
function PaginationComponet({ perPage, totalProducts, setCurrentPage }) {
 
  const NoOfPage = Math.ceil(totalProducts / perPage);


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
