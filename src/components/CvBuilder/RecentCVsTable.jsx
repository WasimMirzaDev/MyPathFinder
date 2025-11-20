import React from "react";
import { Table, Dropdown, Button, Pagination } from "react-bootstrap";

const RecentCVsTable = ({
  data,
  currentPage,
  setCurrentPage,
  lastPage,
  delResumeLoader,
  handleRenameCv,
  handleDeleteCv,
  compact = false // compact = dashboard mode, full = modal mode
}) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 cv-table">
          <thead className="table-light">
            <tr>
              <th className="text-start ps-0" style={{ maxWidth: compact ? 300 : "unset" }}>
                CV Title
              </th>
              <th>Date Created</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="text-start text-truncate" style={{ maxWidth: compact ? 300 : "unset" }}>
                  {item?.resume?.title || "Untitled"}
                </td>

                <td>{item?.created_at ? new Date(item.created_at).toLocaleDateString() : "Unknown date"}</td>

                <td className="text-end">
                  {/* Dashboard: dropdown | Modal: buttons */}
                  {compact ? (
                    <Dropdown drop="start" align="end">
                      <Dropdown.Toggle variant="outline-secondary" size="sm">
                        <i className="bi bi-three-dots-vertical"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href={`/cv-generate/${item?.resume?.id}`}>
                          <i className="bi bi-eye me-2"></i>View
                        </Dropdown.Item>

                        <Dropdown.Item href={`/cv-generate/${item?.resume?.id}`} target="_blank">
                          <i className="bi bi-download me-2"></i>Download
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() => handleRenameCv(item?.resume?.id, item?.resume?.title)}
                        >
                          <i className="bi bi-pencil me-2"></i>Rename
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item
                          onClick={() => handleDeleteCv(item?.resume?.id)}
                          disabled={delResumeLoader}
                          className={delResumeLoader ? "text-muted" : "text-danger"}
                        >
                          <i className="bi bi-trash me-2"></i>
                          {delResumeLoader ? "Deleting..." : "Delete"}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        href={`/cv-generate/${item?.resume?.id}`}
                      >
                        View
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        href={`/cv-generate/${item?.resume?.id}?download=true`}
                        target="_blank"
                      >
                        Download
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {lastPage > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination className="mb-0">
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} />

            {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
              let pageNum;

              if (lastPage <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= lastPage - 2) pageNum = lastPage - 4 + i;
              else pageNum = currentPage - 2 + i;

              return (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === currentPage}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              );
            })}

            <Pagination.Next
              onClick={() => setCurrentPage(Math.min(currentPage + 1, lastPage))}
              disabled={currentPage === lastPage}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(lastPage)}
              disabled={currentPage === lastPage}
            />
          </Pagination>
        </div>
      )}
    </>
  );
};

export default RecentCVsTable;
