import React, { useState, useRef } from "react";
import { Center } from "../../layouts/Line.js";
// import TextField from "../../components/TextField.js";
import searchStocks from "../../api/searchStocks.js";
import DatesPicker from "../../components/DatesPicker.js";
import { useDispatch, useSelector } from "react-redux";
import { setSearchSymbol, setDates, setStockData } from "./searchSlice.js";
import LineChartComponent from "../../components/LineChartComponent.js";
import { Box } from "../../layouts/Box.js";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import "./Search.css";

function SearchDatesRange() {
  const dispatch = useDispatch();
  const [dates, setDates] = useState("");
  const { stockData } = useSelector((state) => state.search);
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(false);

  console.log(chartData);

  const handleDatesPick = (event) => {
    setDates(event);
    // dispatch(setDates(event.target.value));
  };

  const handleSubmit = async () => {
    const searchObj = {
      searchQuery: stockData.symbol,
      startMonth: dates[0].$M + 1,
      startDate: dates[0].$D,
      startYear: dates[0].$y,
      endMonth: dates[1].$M + 1,
      endDate: dates[1].$D,
      endYear: dates[1].$y,
    };
    try {
      const response = await searchStocks.getStockData(searchObj, "1", "month");
      if (response === false) {
        return setError(true);
      }

      const { quotes } = response;

      const data = {
        date: quotes.map((item) => item.date),
        close: quotes.map((item) => item.close),
      };

      if (response.meta.dataGranularity === "1mo") {
        data.date = data.date.map((dateStr) => {
          const dateObj = new Date(dateStr);
          return dateObj.toLocaleString("default", { month: "long" });
        });
      }

      // console.log(data);
      setChartData(data);
    } catch (error) {
      console.log("Error while getting historical data API ", error);
      return setError(true);
    }
  };

  return (
    <div>
      <Center>
        {error ? (
          <Alert severity="error">Error while fetching data</Alert>
        ) : null}
        <DatesPicker onChange={handleDatesPick} />
        <div className="Button">
          <Button className="Button" onClick={handleSubmit} variant="contained">
            Search
          </Button>
        </div>
      </Center>
      <Center>
        <LineChartComponent chartData={chartData} />
      </Center>
    </div>
  );
}

export default SearchDatesRange;
