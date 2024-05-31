import React, { useState } from "react";
import { parseISO, format } from "date-fns";

import { useRouter } from "next/navigation";

import * as Home from "@/containers/Home";

interface DataItem {
  eventName: string;
  date: string;
  hour: string;
  location: string;
  explanation: string;
  id: number;
}

const data: DataItem[] = [
  {
    eventName: "안녕하세요 1",
    date: "2024-05-01",
    hour: "09:00",
    location: "Location 1",
    explanation: "안녕하세요 1",
    id: 1,
  },
  {
    eventName: "감사합니다 2",
    date: "2024-05-02",
    hour: "10:00",
    location: "Location 2",
    explanation: "안녕하세요 2",
    id: 2,
  },
  {
    eventName: "고마워요 3",
    date: "2024-05-03",
    hour: "11:00",
    location: "Location 3",
    explanation: "안녕하세요 감사합니다 3",
    id: 3,
  },
  {
    eventName: "고맙습니다 4",
    date: "2024-05-04",
    hour: "12:00",
    location: "Location 4",
    explanation: "안녕하세요 고맙습니다 4",
    id: 4,
  },
  {
    eventName: "다음에봐요 5",
    date: "2024-05-05",
    hour: "13:00",
    location: "Location 5",
    explanation: "안녕하세요 5",
    id: 5,
  },
];

const HomePage = () => {
  const router = useRouter();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<DataItem[]>([]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    if (newQuery.length === 0) {
      setSearchResults([]);
    }
  };

  const performSearch = () => {
    const filteredData = filterData.filter((item) =>
      item.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filterData = data
    .filter((item) => {
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
    .sort((a, b) => {
      const dateA = parseISO(a.date).getTime();
      const dateB = parseISO(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
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

      <Home.InfinityScrollBoard
        data={searchQuery ? searchResults : filterData}
      />
    </div>
  );
};

export default HomePage;
