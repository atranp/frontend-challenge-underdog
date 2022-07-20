import React from "react";

const PageControl = ({ handleNextPage, handlePrevPage, prevUrl, nextUrl }) => {
  return (
    <div className="pageControl">
      <button disabled={!prevUrl} onClick={handlePrevPage}>
        Previous 25
      </button>
      <button disabled={!nextUrl} onClick={handleNextPage}>
        Next 25
      </button>
    </div>
  );
};

export default PageControl;
