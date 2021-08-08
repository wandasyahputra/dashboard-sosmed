import React from "react";
import { Table } from "react-bootstrap";
import ErrorPage from "components/error-page";
import { Link } from "react-router-dom";

export const TableGrid = (props) => {
  const { columns, data, status, fetchData } = props;

  const renderLoading = () => {
    return (
      <>
        <tr>
          <td>
            <div className="shine me-2 shine-checkbox d-inline-block"></div>
          </td>
          {columns.map((_col, keyColumn) => (
            <td key={`loading-${keyColumn}`}>
              <div className="shine me-2 shine-line"></div>
            </td>
          ))}
        </tr>
        <tr>
          <td>
            <div className="shine me-2 shine-checkbox d-inline-block"></div>
          </td>
          {columns.map((_col, keyColumn) => (
            <td key={`loading-${keyColumn}`}>
              <div className="shine me-2 shine-line"></div>
            </td>
          ))}
        </tr>
        <tr>
          <td>
            <div className="shine me-2 shine-checkbox d-inline-block"></div>
          </td>
          {columns.map((_col, keyColumn) => (
            <td key={`loading-${keyColumn}`}>
              <div className="shine me-2 shine-line"></div>
            </td>
          ))}
        </tr>
      </>
    );
  };

  const renderCell = (col, item) => {
    if (col.link) {
      return (
        <Link to={col.link(item)}>
          {!col.template ? item[col.binding] : col.template(item)}
        </Link>
      );
    } else {
      return !col.template ? item[col.binding] : col.template(item);
    }
  };

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <td>No</td>
            {columns.map((item, key) => (
              <td key={key}>{item.name}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {status === "loading" && renderLoading()}
          {status === "idle" &&
            data.map((item, keyRow) => (
              <tr key={`${item.name}-${keyRow}`}>
                <td>{keyRow + 1}</td>
                {columns.map((col, keyColumn) => (
                  <td key={`${col.binding}-${keyColumn}`}>
                    {renderCell(col, item)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
      {status === "error" && <ErrorPage reFetch={fetchData} />}
    </>
  );
};
