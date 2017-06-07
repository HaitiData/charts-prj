function barChart(cat, qnt){
        var width = 860,
            height = 500,
            padding = 5,
            xScale = d3.scaleBand(),
            yScale = d3.scaleLinear(),
            colour = d3.scaleOrdinal(d3.schemeCategory20),
            x,
            y,
            margin = { top: 15, bottom: 20, left: 60, right: 20 },
            xAxis = d3.axisBottom(xScale),
            yAxis = d3.axisLeft(yScale);

        function my(selection){

          selection.each(function(data) {

            var svg = selection.append('svg')
                .attr("width", width)
                .attr("height", height);

            var g = svg.selectAll("g")
              .data([1]);
            g = g.enter().append("g")
              .merge(g)
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top +")");

            var innerWidth = width - margin.left - margin.right - 20;
            var innerHeight = height - margin.top - margin.bottom - 20;

            xScale
              .domain(data.map(function (d){ return d[x]; }))
              .range([0, innerWidth]);

            yScale
              .domain([0, d3.max(data, function (d){ return d[y] ;})])
              .range([innerHeight, 0]);

            var xAxisG = g.selectAll(".x-axis").data([1]);
            xAxisG.enter().append("g")
                .attr("class", "x-axis")
              .merge(xAxisG)
                .attr("transform", "translate(0," + innerHeight +")")
                .call(xAxis);

            g.append("text")
                .attr("transform", "translate(" + (innerWidth/2) + ", " + (innerHeight + margin.top + 20) + ")")
                .style("font-size", "12px")
                .style("text-anchor", "middle")
                .text(cat);

            var yAxisG = g.selectAll(".y-axis").data([1]);
            yAxisG.enter().append("g")
                .attr("class", "y-axis")
               .merge(yAxisG)
                .call(yAxis);

            g.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", 0 - (innerHeight/2))
                .attr("y", 0 - margin.left)
                .attr("dy", "1em")
                .style("font-size", "12px")
                .style("text-anchor", "middle")
                .text(qnt);

            var rects = g.selectAll("rect")
              .data(data);
            rects.exit().remove();
            rects.enter().append("rect")
              .merge(rects)
                .attr("x", function (d){ return xScale(d[x]) + padding; })
                .attr("y", function (d){ return yScale(d[y]); })
                .attr("fill", function(d) { return colour(xScale(d[x])); })
                .attr("width", xScale.bandwidth() - padding)
                .attr("height", function (d){
                  return innerHeight - yScale(d.value);
                });
          });
        }

        my.x = function (_){
          return arguments.length ? (x = _, my) : x;
        };

        my.y = function (_){
          return arguments.length ? (y = _, my) : y;
        };

        my.width = function (_){
          return arguments.length ? (width = _, my) : width;
        };

        my.height = function (_){
          return arguments.length ? (height = _, my) : height;
        };

        my.padding = function (_){
          return arguments.length ? (xScale.padding(_), my) : xScale.padding();
        };

        return my;
      }


