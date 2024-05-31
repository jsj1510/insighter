import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Table = styled.table`
  width: 530px;
  min-height: 750px;
  display: table;
  justify-content: center;
  flex-direction: column;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const Tbody = styled.tbody`
  vertical-align: top;
`;

export const THead = styled.thead`
  width: 100%;
`;

export const Tr = styled.tr`
  width: 100%;
  height: 100px;
  vertical-align: middle;
`;

export const Th = styled.th`
  width: 20%;
  height: 100px;
  vertical-align: middle;
`;
export const Td = styled.td`
  width: 20%;
  text-align: center;
  height: 100px;
  vertical-align: middle;
`;
