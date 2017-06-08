function barChart(cat, qnt, title){
        var width = 860,
            height = 500,
            padding = 5,
            xScale = d3.scaleBand(),
            yScale = d3.scaleLinear(),
            colour = d3.scaleOrdinal(d3.schemeCategory20),
            x,
            y,
            margin = { top: 30, bottom: 20, left: 60, right: 60 },
            floatFormat = d3.format("." + d3.precisionFixed(0.5) + "f"),
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
                .attr("transform", "translate(" + (innerWidth/2) + ", " + (innerHeight + margin.top) + ")")
                .style("font-size", "12px")
                .style("text-anchor", "middle")
                .text(cat);

            var yAxisG = g.selectAll(".y-axis").data([1]);
            yAxisG.enter().append("g")
                .attr("class", "y-axis")
               .merge(yAxisG)
                .call(yAxis);

            var yLabel = function(){
                         if (title == "Count"){
                            return "Count";
                         } else {
                            return qnt;
                         }};

            g.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", 0 - (innerHeight/2))
                .attr("y", 0 - margin.left)
                .attr("dy", "1em")
                .style("font-size", "12px")
                .style("text-anchor", "middle")
                .text(yLabel);

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

            var chart_title = function(){
                                if (title == "Count"){
                                    return title + " of elements for "  + cat;
                                } else {
                                  return title + " of " + qnt + " for " + cat;
                                }};

            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 + (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("text-decoration", "underline")
                .text(chart_title);

            var legend = svg.selectAll(".legend")
                .data(data)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", function(d) { return colour(xScale(d[x]))} );

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d){ return d[x] + ": " + floatFormat(d[y]); });


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


