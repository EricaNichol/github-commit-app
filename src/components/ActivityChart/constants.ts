import { externalTooltipHandler } from "./ActivityToolTip";

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      position: "nearest",
      external: externalTooltipHandler,
      callbacks: {
        afterBody: function (context: any) {
          return "commits";
        },
      },
    },
  },
  layout: {
    padding: {
      top: 25, // padding at the top
      bottom: 25, // padding at the bottom
      left: 25, // padding on the left
      right: 25, // padding on the right
    },
  },
  scales: {
    x: {
      border: {
        width: 3,
        color: "#37374A",
      },
      ticks: {
        display: false,
      },
      grid: {
        drawTicks: true,
        tickLength: -10,
        tickColor: "black",
        tickWidth: 3,
        drawOnChartArea: false,
        tickBorderWidth: 10,
      },
    },
    y: {
      beginAtZero: true,
      min: 0,
      ticks: {
        display: false,
      },
      grid: {
        drawTicks: true,
        tickLength: -10,
        tickColor: "black",
        tickWidth: 3,
        drawOnChartArea: false,
        tickBorderWidth: 10,
      },
      border: {
        width: 3,
        color: "#37374A",
      },
    },
  },
};
