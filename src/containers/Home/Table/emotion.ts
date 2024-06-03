import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Table = styled.table`
  width: 800px;
  min-height: 500px;
  display: table;
  justify-content: center;
  flex-direction: column;
  border-collapse: collapse;
  table-layout: fixed;
  margin-top: 20px;
`;

export const Tbody = styled.tbody`
  vertical-align: top;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const THead = styled.thead`
  width: 100%;
`;

export const Tr = styled.tr`
  width: 100%;
  vertical-align: middle;
  height: 50px;
`;

export const Th = styled.th`
  width: 20%;
  vertical-align: middle;
`;
export const Td = styled.td`
  width: 20%;
  text-align: center;
  vertical-align: middle;
  height: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
