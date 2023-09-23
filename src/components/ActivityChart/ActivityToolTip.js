import feather from "feather-icons";

// UPDATED FROM CHARTJS EXAMPLE. need to create element in javascript
export const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "white";
    tooltipEl.style.borderRadius = "3px";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";
    tooltipEl.style.boxShadow = "0px 3px 12px rgba(0, 0, 0, 0.08)";

    const table = document.createElement("table");
    table.style.margin = "0px";

    tooltipEl.appendChild(table);
    tooltipEl.className = "my-custom-tooltip";
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableHead = document.createElement("thead");

    titleLines.forEach((title) => {
      const tr = document.createElement("tr");
      tr.style.borderWidth = 0;

      const th = document.createElement("th");
      th.style.borderWidth = 0;
      th.style.color = "#6D6D90";
      th.style.fontSize = "14px";
      th.style.fontFamily = "Roboto";
      th.style.fontWeight = 400;
      th.style.wordWrap = "break-word";

      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement("tbody");
    bodyLines.forEach((body, i, arr) => {
      const colors = tooltip.labelColors[i];

      const colorIndicator = document.createElement("span");
      colorIndicator.style.background = colors.borderColor; // adjust to show up
      colorIndicator.style.borderWidth = "2px";
      colorIndicator.style.marginRight = "10px";
      colorIndicator.style.height = "10px";
      colorIndicator.style.width = "10px";
      colorIndicator.style.display = "inline-block";

      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      tr.style.borderWidth = 0;

      const td = document.createElement("td");
      td.style.borderWidth = 0;
      td.style.color = "#37374A";
      td.style.fontWeight = 700;
      td.style.fontFamily = "Roboto";
      td.style.display = "flex";
      td.style.flexDirection = "row";
      td.style.alignItems = "center";
      td.style.justifyContent = "center";

      // Main change from example
      const bodyText = body === 1 ? `${body} Commit` : `${body} Commits`;
      // Create a new div element
      const iconDiv = document.createElement("div");
      iconDiv.style.marginTop = "4px";
      iconDiv.style.marginRight = "5px";

      // Add the git-commit icon from Feather
      const iconHTML = feather.icons["git-commit"].toSvg();
      iconDiv.innerHTML = iconHTML;

      const text = document.createTextNode(bodyText);

      if (arr.length > 1) td.appendChild(colorIndicator);
      td.appendChild(iconDiv);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector("table");

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 20 + "px";
  tooltipEl.style.top = positionY + tooltip.caretY - 100 + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = "8px 16px 4px";
};
