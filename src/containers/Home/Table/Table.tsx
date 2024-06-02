import React from "react";
import { parseISO, format } from "date-fns";

import * as S from "./emotion";

interface TableProps {
  data: Array<{
    eventName: string;
    date: string;
    hour: string;
    location: string;
    explanation: string;
    id: number;
  }>;
}

const InfinityScrollBoard: React.FC<TableProps> = ({ data }) => (
  <S.Container>
    <S.Table>
      <S.THead>
        <S.Tr>
          <S.Th>
            <text>순서</text>
          </S.Th>

          <S.Th>
            <text>제목</text>
          </S.Th>

          <S.Th>
            <text>작성자</text>
          </S.Th>

          <S.Th>Date</S.Th>

          <S.Th>
            <text>조회</text>
          </S.Th>
        </S.Tr>
      </S.THead>

      <S.Tbody>
        {data.map((item) => (
          <S.Tr key={item.id}>
            <S.Td>{format(parseISO(item.date), "yyyy-MM-dd")}</S.Td>
            <S.Td>{item.eventName}</S.Td>
            <S.Td>{item.hour}</S.Td>
            <S.Td>{item.location}</S.Td>
            <S.Td>{item.explanation}</S.Td>
          </S.Tr>
        ))}
      </S.Tbody>
    </S.Table>
  </S.Container>
);

export default InfinityScrollBoard;
