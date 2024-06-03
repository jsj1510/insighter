import React from "react";
import { parseISO, format } from "date-fns";

import * as S from "./emotion";

interface DataItem {
  name: string;
  date: string;
  hour: string;
  location: string;
  explanation: string;
  id: string;
}

interface TableProps {
  data?: Array<{
    name: string;
    date: string;
    hour: string;
    location: string;
    explanation: string;
    id: string;
  }>;
  handleEdit: (id: string) => void;
  toggleModal: (item: DataItem) => void;
}

const InfinityScrollBoard: React.FC<TableProps> = ({
  data,
  handleEdit,
  toggleModal,
}) => {
  return (
    <S.Container>
      <S.Table>
        <S.THead>
          <S.Tr>
            <S.Th>날짜</S.Th>
            <S.Th>이벤트이름</S.Th>
            <S.Th>시간</S.Th>
            <S.Th>장소</S.Th>
            <S.Th>설명</S.Th>
            <S.Th>수정</S.Th>
            <S.Th>삭제</S.Th>
          </S.Tr>
        </S.THead>

        <S.Tbody>
          {data?.map((item) => (
            <S.Tr key={item.id}>
              <S.Td>{format(parseISO(item.date), "yyyy-MM-dd")}</S.Td>
              <S.Td>{item.name}</S.Td>
              <S.Td>{item.hour}</S.Td>
              <S.Td>{item.location}</S.Td>
              <S.Td>{item.explanation}</S.Td>

              <S.Td>
                <button onClick={() => handleEdit(item.id)}>수정</button>
              </S.Td>
              <S.Td>
                <button onClick={() => toggleModal(item)}>삭제</button>
              </S.Td>
            </S.Tr>
          ))}
        </S.Tbody>
      </S.Table>
    </S.Container>
  );
};

export default InfinityScrollBoard;
