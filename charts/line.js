function renderSpotPriceChart(data) {
    const container = d3.select("#line-chart");
    const valueKey = "Average Price (notTas-Snowy)";
    const validData = data
        .filter((row) => Number.isFinite(row.Year) && Number.isFinite(row[valueKey]))
        .sort((first, second) => first.Year - second.Year);

    if (validData.length === 0) {
        console.error("No valid average spot price data found.");
        return;
    }

    const formatPrice = d3.format("$,.1f");

    function draw() {
        container.selectAll("svg").remove();

        const width = container.node().clientWidth;
        const height = Math.max(260, Math.min(340, width * 0.65));
        const margin = { top: 48, right: 24, bottom: 48, left: 68 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;
        const svg = container.append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("role", "img")
            .attr("aria-label", "Average Australian spot power price from 1998 to 2024");

        svg.append("text")
            .attr("class", "spot-title")
            .attr("x", width / 2)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("Average spot price, 1998-2024");

        const x = d3.scaleLinear()
            .domain(d3.extent(validData, (row) => row.Year))
            .range([0, plotWidth]);
        const y = d3.scaleLinear()
            .domain([0, d3.max(validData, (row) => row[valueKey])])
            .nice()
            .range([plotHeight, 0]);
        const plot = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        plot.append("g")
            .attr("class", "spot-grid")
            .call(d3.axisLeft(y).ticks(5).tickSize(-plotWidth).tickFormat(() => ""));

        plot.append("g")
            .attr("class", "spot-axis")
            .call(d3.axisLeft(y).ticks(5).tickFormat((value) => `$${value}`));

        plot.append("g")
            .attr("class", "spot-axis")
            .attr("transform", `translate(0,${plotHeight})`)
            .call(d3.axisBottom(x).ticks(7).tickFormat(d3.format("d")));

        plot.append("text")
            .attr("class", "spot-axis-label")
            .attr("x", plotWidth / 2)
            .attr("y", plotHeight + 40)
            .attr("text-anchor", "middle")
            .text("Year");

        plot.append("text")
            .attr("class", "spot-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -plotHeight / 2)
            .attr("y", -48)
            .attr("text-anchor", "middle")
            .text("Average price ($/MWh)");

        const line = d3.line()
            .x((row) => x(row.Year))
            .y((row) => y(row[valueKey]));

        plot.append("path")
            .datum(validData)
            .attr("class", "spot-line")
            .attr("d", line);

        plot.selectAll("circle")
            .data(validData)
            .join("circle")
            .attr("class", "spot-point")
            .attr("cx", (row) => x(row.Year))
            .attr("cy", (row) => y(row[valueKey]))
            .attr("r", 3)
            .append("title")
            .text((row) => `${row.Year}: ${formatPrice(row[valueKey])} per MWh`);
    }

    draw();
    new ResizeObserver(draw).observe(container.node());
}

window.energyDataPromise
    .then(({ spotPrices }) => renderSpotPriceChart(spotPrices))
    .catch((error) => console.error("Failed to render spot price chart:", error));