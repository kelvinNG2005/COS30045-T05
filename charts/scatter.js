function renderScatterPlot(data) {
    const container = d3.select("#scatter-plot");
    const validData = data.filter((row) =>
        Number.isFinite(row.energy_consumpt) && Number.isFinite(row.star2)
    );

    if (validData.length === 0) {
        console.error("No valid energy consumption and star rating values found.");
        return;
    }

    function draw() {
        container.selectAll("svg").remove();

        const width = container.node().clientWidth;
        const height = Math.max(240, Math.min(360, width * 0.6));
        const margin = { top: 48, right: 24, bottom: 56, left: 68 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("role", "img")
            .attr("aria-label", "Energy consumption versus star rating scatter plot");

        svg.append("text")
            .attr("class", "chart-title")
            .attr("x", width / 2)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("Energy consumption vs star rating");

        const x = d3.scaleLinear()
            .domain([0, d3.max(validData, (row) => row.star2)])
            .nice()
            .range([0, plotWidth]);

        const y = d3.scaleLinear()
            .domain(d3.extent(validData, (row) => row.energy_consumpt))
            .nice()
            .range([plotHeight, 0]);

        const plot = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        plot.append("g")
            .attr("class", "scatter-grid")
            .attr("transform", `translate(0,${plotHeight})`)
            .call(d3.axisBottom(x).ticks(6).tickSize(-plotHeight).tickFormat(() => ""));

        plot.append("g")
            .attr("class", "scatter-axis")
            .attr("transform", `translate(0,${plotHeight})`)
            .call(d3.axisBottom(x).ticks(6));

        plot.append("g")
            .attr("class", "scatter-axis")
            .call(d3.axisLeft(y).ticks(5));

        plot.append("text")
            .attr("class", "axis-label")
            .attr("x", plotWidth / 2)
            .attr("y", plotHeight + 44)
            .attr("text-anchor", "middle")
            .text("Star rating");

        plot.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -plotHeight / 2)
            .attr("y", -48)
            .attr("text-anchor", "middle")
            .text("Energy consumption (kWh/year)");

        plot.selectAll("circle")
            .data(validData)
            .join("circle")
            .attr("cx", (row) => x(row.star2))
            .attr("cy", (row) => y(row.energy_consumpt))
            .attr("r", 3.5)
            .append("title")
            .text((row) => `${row.brand} (${row.screen_tech})\nEnergy: ${row.energy_consumpt} kWh/year\nStar rating: ${row.star2}`);
    }

    draw();
    new ResizeObserver(draw).observe(container.node());
}

window.energyDataPromise
    .then(({ televisionEnergy }) => renderScatterPlot(televisionEnergy))
    .catch((error) => console.error("Failed to render scatter plot:", error));