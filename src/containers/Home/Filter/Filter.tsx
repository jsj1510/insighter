import React from "react";

import * as S from "./emotion";

interface FilterProps {
  startDate: string;
  endDate: string;
  handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortOrder: "asc" | "desc";
  handleSort: () => void;
}

const Filter: React.FC<FilterProps> = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  sortOrder,
  handleSort,
}) => (
  <S.Container>
    <label>
      <S.FilterInput
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
      />
    </label>
    ~
    <label>
      <S.FilterInput
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
      />
    </label>
    <label>
      날짜 정렬 :
      <button onClick={handleSort}>
        {sortOrder === "asc" ? "오름차순" : "내림차순"}
      </button>
    </label>
  </S.Container>
);

export default Filter;
