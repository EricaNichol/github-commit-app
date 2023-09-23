// @ts-nocheck
import React, { memo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { activityStore } from "@/stores/activity";
import { StyledContainer } from "./styles";
import { options } from "./constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface activityChartProps {
  activities: [];
  forwardRef: React.RefObject<HTMLCanvasElement>;
}

const ActivityChart = ({ activities, forwardRef }: activityChartProps) => {
  const { constructDataSet } = activityStore((state: any) => ({
    constructDataSet: state.constructDataSet,
  }));

  const datasets = constructDataSet(activities);

  const getWeekLabel = (weekNumber: number) => {
    if (weekNumber < 1 || weekNumber > 52) {
      throw new Error("Week number must be between 1 and 52");
    }

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const d = new Date();
    // Set the date to the start of the year
    // + (week number * 7) days - some offset to get
    // the start of the week
    d.setFullYear(
      d.getFullYear(),
      0,
      1 + (weekNumber - 1) * 7 - d.getDay() + 1
    );

    const month = monthNames[d.getMonth()];
    const date = d.getDate();
    const year = d.getFullYear();

    return `Week of ${month} ${date}, ${year}`;
  };

  const data = {
    labels: [...Array(52).keys()].map((num) => `${getWeekLabel(num + 1)}`), // Labels for 52 weeks
    datasets,
  };

  return (
    <StyledContainer>
      <Line options={options as any} ref={forwardRef} data={data} />
    </StyledContainer>
  );
};

export default memo(ActivityChart);
