import React, { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import * as Home from "@/containers/Home";
import { fetchEvents } from "@/apis";
import { Pagination } from "@/components/Design/Pagination";

interface DataItem {
  name: string;
  date: string;
  hour: string;
  location: string;
  explanation: string;
  id: number;
}

interface PaginatedResponse {
  data: DataItem[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}

const HomePage = () => {
  const router = useRouter();

  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [startDate, setStartDate] = useState<string>(
    format(new Date(), "1900-01-01")
  );
  const [endDate, setEndDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<DataItem[]>([]);

  const [page, setPage] = useState<number>(1);

  const { data } = useQuery<PaginatedResponse[]>({
    queryKey: ["events", page, startDate, endDate, searchQuery, sortOrder],
    queryFn: () => fetchEvents(page),
  });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    if (newQuery.length === 0) {
      setSearchResults([]);
    }
  };

  const performSearch = () => {
    const filteredData =
      filterData?.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ?? [];
    setSearchResults(filteredData);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setStartDate(e.target.value);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 입력된 값이 10자리(yyyy-MM-dd 형식)보다 작을 때만 endDate 변경
    if (inputValue.length <= 10) {
      setEndDate(inputValue);
    }
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
  };

  const filterData = data?.data
    .filter((item: DataItem) => {
      if (!startDate && !endDate) return true;
      const itemDate = parseISO(item.date);
      const start = startDate ? parseISO(startDate) : null;
      const end = endDate ? parseISO(endDate) : null;

      if (start && end) {
        return itemDate >= start && itemDate <= end;
      } else if (start) {
        return itemDate >= start;
      } else if (end) {
        return itemDate <= end;
      }

      return false;
    })
    .sort((a: DataItem, b: DataItem) => {
      const dateA = parseISO(a.date).getTime();
      const dateB = parseISO(b.date).getTime();
      return sortOrder === "ASC" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Home.Filter
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleSort={handleSort}
        sortOrder={sortOrder}
      />
      <Home.Search
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        performSearch={performSearch}
        handleKeyPress={handleKeyPress}
      />
      <button onClick={() => router.push("/post")}>이벤트 생성</button>

      <Home.Table data={searchQuery ? searchResults : filterData} />
      <Pagination
        defaultPage={page}
        count={data?.last}
        onChange={(_, page) => {
          console.log(page);
          setPage(page);
        }}
      />
    </div>
  );
};

export default HomePage;
