function renderDonutChart(data) {
    const container = d3.select("#donut-chart");
    const validData = data.filter((row) =>
        row.Screen_Tech && Number.isFinite(row["Mean(Labelled energy consumption (kWh/year))"])
    );

    if (validData.length === 0) {
        console.error("No valid screen technology energy values found.");
        return;
    }

    const valueKey = "Mean(Labelled energy consumption (kWh/year))";
    const color = d3.scaleOrdinal()
        .domain(validData.map((row) => row.Screen_Tech))
        .range(["#4d796b", "#e3a641", "#cb6850", "#6387a5"]);
    const formatValue = d3.format(",.1f");

    function draw() {
        container.selectAll("svg").remove();

        const width = container.node().clientWidth;
        const height = Math.max(260, Math.min(340, width * 0.65));
        const radius = Math.min(104, height * 0.34, width * 0.27);
        const centerX = width * 0.32;
        const centerY = height * 0.54;
        const svg = container.append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("role", "img")
            .attr("aria-label", "Mean annual energy consumption by screen technology for all TV sizes");

        svg.append("text")
            .attr("class", "donut-title")
            .attr("x", width / 2)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("Energy consumption by screen technology");

        const pie = d3.pie()
            .sort(null)
            .value((row) => row[valueKey]);
        const arc = d3.arc()
            .innerRadius(radius * 0.62)
            .outerRadius(radius);
        const chart = svg.append("g")
            .attr("transform", `translate(${centerX},${centerY})`);

        chart.selectAll("path")
            .data(pie(validData))
            .join("path")
            .attr("d", arc)
            .attr("fill", (slice) => color(slice.data.Screen_Tech))
            .attr("stroke", "#fffdf7")
            .attr("stroke-width", 2)
            .append("title")
            .text((slice) => `${slice.data.Screen_Tech}: ${formatValue(slice.data[valueKey])} kWh/year`);

        svg.append("text")
            .attr("class", "donut-center-label")
            .attr("x", centerX)
            .attr("y", centerY - 4)
            .attr("text-anchor", "middle")
            .text("Mean annual");

        svg.append("text")
            .attr("class", "donut-center-label donut-center-unit")
            .attr("x", centerX)
            .attr("y", centerY + 14)
            .attr("text-anchor", "middle")
            .text("kWh");

        const legend = svg.append("g")
            .attr("transform", `translate(${width * 0.61},${centerY - (validData.length * 26) / 2})`);
        const legendRow = legend.selectAll("g")
            .data(validData)
            .join("g")
            .attr("transform", (_, index) => `translate(0,${index * 26})`);

        legendRow.append("circle")
            .attr("r", 5)
            .attr("cy", -4)
            .attr("fill", (row) => color(row.Screen_Tech));

        legendRow.append("text")
            .attr("class", "donut-legend-label")
            .attr("x", 12)
            .text((row) => row.Screen_Tech);

        legendRow.append("text")
            .attr("class", "donut-legend-value")
            .attr("x", 12)
            .attr("y", 14)
            .text((row) => `${formatValue(row[valueKey])} kWh/year`);
    }

    draw();
    new ResizeObserver(draw).observe(container.node());
}

window.energyDataPromise
    .then(({ televisionEnergyAllSizesByScreenType }) => renderDonutChart(televisionEnergyAllSizesByScreenType))
    .catch((error) => console.error("Failed to render donut chart:", error));