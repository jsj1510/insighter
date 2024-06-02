/*
 * Created on Thu Dec 14 2023
 *
 * Copyright (c) 2023 Your Company
 */

import React, { useMemo, useState } from "react";

interface IPaginationProps {
  count: number;
  defaultPage?: number;
  siblingCount?: number;
  boundaryCount?: number;
  onChange?: (ev: React.ChangeEvent<unknown>, page: number) => void;
}

export default function Pagination({
  defaultPage = 1,

  ...props
}: IPaginationProps) {
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const totalList = useMemo(() => {
    const arr = Array.from({ length: props.count }, (_, index) => index + 1);

    return arr;
  }, [props.count, currentPage]);

  return (
    <div
      style={{
        display: "flex",
        margin: `20px 0px`,
        width: `calc(100% - 600px)`,
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <button
        onClick={(ev) => {
          const prevPage = Math.max(currentPage - 10, 1);
          setCurrentPage(Number(prevPage));
          props.onChange?.(ev, Number(prevPage));
        }}
      >
        {"<"}
      </button>
      {totalList.map((page) => {
        return (
          <li key={page} style={{ flexDirection: "row" }}>
            <button
              disabled={`${currentPage}` === `${page}`}
              onClick={(ev) => {
                setCurrentPage(Number(page));
                props.onChange?.(ev, Number(page));
              }}
            >
              {page}
            </button>
          </li>
        );
      })}
      <button
        onClick={(ev) => {
          const nextPage = Math.min(currentPage + 10, props.count);
          setCurrentPage(Number(nextPage));
          props.onChange?.(ev, Number(nextPage));
        }}
      >
        {">"}
      </button>
    </div>
  );
}
