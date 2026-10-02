function renderBarChart(data) {
    const container = d3.select("#bar-chart");
    const valueKey = "Mean(Labelled energy consumption (kWh/year))";
    const validData = data.filter((row) =>
        row.Screen_Tech && Number.isFinite(row[valueKey])
    );

    if (validData.length === 0) {
        console.error("No valid 55-inch TV energy values found.");
        return;
    }

    const color = d3.scaleOrdinal()
        .domain(validData.map((row) => row.Screen_Tech))
        .range(["#4d796b", "#e3a641", "#cb6850", "#6387a5"]);
    const formatValue = d3.format(",.1f");

    function draw() {
        container.selectAll("svg").remove();

        const width = container.node().clientWidth;
        const height = Math.max(260, Math.min(340, width * 0.65));
        const margin = { top: 48, right: 20, bottom: 48, left: 66 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;
        const svg = container.append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("role", "img")
            .attr("aria-label", "Mean annual energy consumption by screen technology for 55-inch TVs");

        svg.append("text")
            .attr("class", "bar-title")
            .attr("x", width / 2)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("55-inch TV energy by technology");

        const x = d3.scaleBand()
            .domain(validData.map((row) => row.Screen_Tech))
            .range([0, plotWidth])
            .padding(0.28);
        const y = d3.scaleLinear()
            .domain([0, d3.max(validData, (row) => row[valueKey])])
            .nice()
            .range([plotHeight, 0]);
        const plot = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        plot.append("g")
            .attr("class", "bar-grid")
            .call(d3.axisLeft(y).ticks(5).tickSize(-plotWidth).tickFormat(() => ""));

        plot.append("g")
            .attr("class", "bar-axis")
            .call(d3.axisLeft(y).ticks(5));

        plot.append("g")
            .attr("class", "bar-axis")
            .attr("transform", `translate(0,${plotHeight})`)
            .call(d3.axisBottom(x));

        plot.append("text")
            .attr("class", "bar-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -plotHeight / 2)
            .attr("y", -48)
            .attr("text-anchor", "middle")
            .text("Mean energy consumption (kWh/year)");

        plot.selectAll("rect")
            .data(validData)
            .join("rect")
            .attr("class", "energy-bar")
            .attr("x", (row) => x(row.Screen_Tech))
            .attr("y", (row) => y(row[valueKey]))
            .attr("width", x.bandwidth())
            .attr("height", (row) => plotHeight - y(row[valueKey]))
            .attr("fill", (row) => color(row.Screen_Tech))
            .append("title")
            .text((row) => `${row.Screen_Tech}: ${formatValue(row[valueKey])} kWh/year`);

        plot.selectAll(".bar-value")
            .data(validData)
            .join("text")
            .attr("class", "bar-value")
            .attr("x", (row) => x(row.Screen_Tech) + x.bandwidth() / 2)
            .attr("y", (row) => y(row[valueKey]) - 7)
            .attr("text-anchor", "middle")
            .text((row) => formatValue(row[valueKey]));
    }

    draw();
    new ResizeObserver(draw).observe(container.node());
}

window.energyDataPromise
    .then(({ televisionEnergy55InchByScreenType }) => renderBarChart(televisionEnergy55InchByScreenType))
    .catch((error) => console.error("Failed to render bar chart:", error));