const Pagination = ({ page, setPage, totalPages }) => {
  const getPageNumbers = () => {
    const pages = [];

    if (page > 2) pages.push(1);
    if (page > 3) pages.push("...");

    // Generate an array of page numbers
    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (page < totalPages - 2) pages.push("...");
    if (page < totalPages - 1) pages.push(totalPages);
    return pages;
  };

  return (
    <div>
      <button
        className="btn"
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      >
        Prev
      </button>

      <button
        className={`btn ${page === 1 ? "btn-active btn-primary" : ""}`}
        onClick={() => setPage(1)}
      >
        1
      </button>

      {getPageNumbers().map((p, idx) =>
        p === "..." ? (
          <button key={idx} className="btn btn-disabled">
            ...
          </button>
        ) : (
          <button
            key={idx}
            className={`btn ${page === p ? "btn-active btn-primary" : ""}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className="join-item btn"
        disabled={page === totalPages}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
