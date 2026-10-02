// t04-5-bars.js
const createBarChart = (data) => {
    const viewW = 500;
    const viewH = Math.max(220, data.length * 28);
    const displayW = 640;
    const displayH = Math.min(480, data.length * 24 + 40);
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
            .attr("viewBox", `0 0 ${viewW} ${viewH}`)
            .attr("width", displayW)
            .attr("height", displayH)
            .style("border", "1px solid #ccc")

    // --- Scales (from T04-6) ---
    const xMax = d3.max(data, d => d.count);
    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, viewW]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand)) 
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

/*
    // Bars
    svg.selectAll("rect")

        // connect the dataset to the rectangles
        .data(data)

        // Create rectangles for data and update existing rectangles
        .join("rect")

        // Assign a general class and a count-specific class to each bar
        .attr("class", d => `bar bar-${d.count}`)

        // Start every bar from the left edge of the SVG
        .attr("x", 0)

        // Position each bar vertically according to its brand
        .attr("y", d => yScale(d.brand))

        // Convert each count into a scaled bar width
        .attr("width", d => xScale(d.count))

        // Use the height calculated by the band scale
        .attr("height", yScale.bandwidth())

        // Set the colour of the bars
        .attr("fill", "steelblue");
*/

    // --- NEW in T04-7: group per row (bar + labels move together) ---
    // Using x = 100 so labels align at 100 and bars start there too.
    const labelX = 100;
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
            .attr("transform", d => `translate(0, ${yScale(d.brand)})`);
    
        // --- Bar rectangle inside the group ---
    // y is 0 because the group sets vertical position via transform.
    barAndLabel
        .append("rect")
            .attr("x", labelX) // bar starts at x = 100
            .attr("y", 0)
            .attr("width", d => xScale(d.count)) // scaled width fits the viewBox
            .attr("height", yScale.bandwidth()) // bar thickness from band scale
            .attr("fill", "steelblue");

    // --- Category text (left of bar, right-aligned at x=100) ---
    barAndLabel
        .append("text")
            .text(d => d.brand) // change if your category column differs
            .attr("x", labelX)
            .attr("y", 15) // adjust to center in the band
            .attr("text-anchor", "end") // right-align so text ends at x=100
            .style("font-family", "sans-serif")
            .style("font-size", "13px");

    // --- Value text (at the end of each bar) ---
    barAndLabel
        .append("text")
            .text(d => d.count) // numeric label
            .attr("x", d => labelX + xScale(d.count) + 4) // just past bar end
            .attr("y", 12) // adjust as needed
            .style("font-family", "sans-serif")
            .style("font-size", "13px");
};