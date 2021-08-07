import React from "react";
import { Table } from "react-bootstrap";

export const TableShimmer = () => (
  <Table>
    <tr>
      <th className="w-0">
        <div className="shine me-2 shine-checkbox d-inline-block"></div>
      </th>
      <th>
        <div className="shine me-2 shine-line"></div>
      </th>
      <th>
        <div className="shine me-2 shine-line"></div>
      </th>
      <th>
        <div className="shine me-2 shine-line"></div>
      </th>
      <th>
        <div className="shine me-2 shine-line"></div>
      </th>
    </tr>
    <tr>
      <td>
        <div className="shine me-2 shine-checkbox d-inline-block"></div>
      </td>
      <td>
        <div className="shine me-2 shine-line"></div>
      </td>
      <td>
        <div className="shine me-2 shine-line"></div>
      </td>
      <td>
        <div className="shine me-2 shine-line"></div>
      </td>
      <td>
        <div className="shine me-2 shine-line"></div>
      </td>
    </tr>
    <tr>
      <td>
        <div className="shine me-2 shine-checkbox d-inline-block"></div>
      </td>
      <td>
        <div className="shine me-2 shine-line"></div>
      </td>
      <td>
        <div className="shine me-2 shine-line"></div>
      </td>
      <td>
        <div className="shine me-2 shine-line"></div>
      </td>
      <td>
        <div className="shine me-2 shine-line"></div>
      </td>
    </tr>
  </Table>
);
