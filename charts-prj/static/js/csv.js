var getCsv = function(csv_link, category, quantity, agg, chartType){
               var data = [];
               d3.csv(csv_link, function(csv) {
                        csv.forEach(function(row){
                        var qnty_v; var ctgy_v; var i = 0;
                            while (i < Object.keys(row).length){
                                if (Object.keys(row)[i] == quantity){
                                    qnty_v = +Object.values(row)[i]
                                } else if (Object.keys(row)[i] == category){
                                    ctgy_v = Object.values(row)[i]
                                }
                            i++;
                            };
                            data.push({qnty : qnty_v , ctgy : ctgy_v });
                        })


               var dropZeros = function(dato){
                               return dato.filter(function(d){
                               if (d.qnty !== 0){
                                return d.qnty;
                               }})
               };

               function groupData_sum(dato){
                       return d3.nest().key(function(d) {return d.ctgy;})
                       .rollup(function(v) {return d3.sum(v, function(d) {return d.qnty;});})
                       .entries(dato);
               };

               function groupData_mean(dato){
                       return d3.nest().key(function(d) {return d.ctgy;})
                       .rollup(function(v) {return d3.mean(v, function(d) {return d.qnty;});})
                       .entries(dato);
               };

               function groupData_min(dato){
                       return d3.nest().key(function(d) {return d.ctgy;})
                       .rollup(function(v) {return d3.min(v, function(d) {return d.qnty;});})
                       .entries(dato);
               };

               function groupData_max(dato){
                       return d3.nest().key(function(d) {return d.ctgy;})
                       .rollup(function(v) {return d3.max(v, function(d) {return d.qnty;});})
                       .entries(dato);
               };

               function groupData_count(dato){
                       return d3.nest().key(function(d) {return d.ctgy;})
                       .rollup(function(v) { return v.length;})
                       .entries(dato);
               };


               var dati;
               if (agg == 0){
                    dati = groupData_sum(dropZeros(data));
               } else if (agg == 1){
                    dati = groupData_mean(dropZeros(data));
               } else if (agg == 2){
                    dati = groupData_count(dropZeros(data));
               } else if (agg == 3){
                    dati = groupData_max(dropZeros(data));
               } else if (agg == 4){
                    dati = groupData_min(dropZeros(data));
               };

               if (chartType == 0){
                   var bar = barChart()
                   .x('key')
                   .y('value')
                   d3.select("#chart_area")
                        .datum(dati)
                        .call(bar);
               } else if (chartType == 1){
                   var pie = pieChart(category, quantity)
                   .variable('value')
                   .category('key')
                   d3.select('#chart_area')
                      .datum(dati)
                      .call(pie);
               } else if (chartType == 2){
                   var donut = donutChart(category, quantity)
                   .variable('value')
                   .category('key')
                   d3.select('#chart_area')
                      .datum(dati)
                      .call(donut);
               }

               });
};






