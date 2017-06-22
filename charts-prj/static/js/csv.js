var getCsv = function(csv_link, category, quantity, agg, chartType){
               var data = [];
               d3.csv(csv_link, function(error, csv) {
                        if (error) throw error;
                        csv.forEach(function(row){
                        var qnty_v; var ctgy_v; var i = 0;
                            while (i < Object.keys(row).length){
                                if (Object.keys(row)[i] == quantity){
                                    qnty_v = +Object.values(row)[i]
                                } else if (Object.keys(row)[i] == category){
                                        if (Object.values(row)[i].length >= 20){

                                            ctgy_v = Object.values(row)[i].substring(0, 17) + "...";
                                        } else {
                                            ctgy_v = Object.values(row)[i];
                                        };
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


               // Alternate sorting
               function alt_sort(dato){
                    dato_sort = [];
                    do {
                    var lowest = Number.POSITIVE_INFINITY; var low_cat; var min_obj={ key: "", value: 0};
                    var highest = Number.NEGATIVE_INFINITY; var high_cat; var max_obj={ key: "", value: 0};
                    var tmp; var tmp_cat;
                    for (var i=dato.length-1; i>=0; i--) {
                        tmp = dato[i].value; min_obj.value = tmp;
                        tmp_cat = dato[i].key; min_obj.key = tmp_cat;
                        if (dato.length == 1) {
                        tmp = dato[i].value;
                        tmp_cat = dato[i].key;
                        dato_sort.push(min_obj);
                        dato.pop();
                        break;
                        }
                        if (tmp < lowest) {lowest = tmp; min_obj.key = tmp_cat; min_obj.value = tmp }
                        if (tmp > highest) {highest = tmp; max_obj.key = tmp_cat; max_obj.value = tmp}
                    }console.log(highest, lowest, min_obj, max_obj, dato);
                    dato_sort.push(min_obj);
                    dato.pop();
                    dato_sort.push(max_obj);
                    dato.shift();
                    } while (dato.length > 0)
                    console.log(dato_sort)
                    return dato_sort;
               }


               function descendent(a,b){
                if (a.value < b.value) return 1;
                if (a.value > b.value) return -1;
               return 0;
               }

               var dati;
               var title;
               if (agg == 0){
                    dati = groupData_sum(dropZeros(data)).sort(descendent);
                    title = "Sum";
               } else if (agg == 1){
                    dati = groupData_mean(data).sort(descendent);
                    title = "Mean";
               } else if (agg == 2){
                    dati = groupData_count(data).sort(descendent);
                    title = "Count";
               } else if (agg == 3){
                    dati = groupData_max(dropZeros(data)).sort(descendent);
                    title = "Maximum";
               } else if (agg == 4){
                    dati = groupData_min(data).sort(descendent);;
                    title = "Minimum";
               };

               if (chartType == 0){
                   if (dati.length > 20){
                        while (dati.length >= 20) { dati.pop(); };
                        window.alert("Output limited to 20 categories");
                   };
                   var bar = barChart(category, quantity, title)
                   .x('key')
                   .y('value')
                   d3.select("#chart_area")
                        .datum(dati)
                        .call(bar);
               } else if (chartType == 1){
                   if (dati.length > 10){
                        while (dati.length >= 10) { dati.pop(); };
                        window.alert("Output limited to 10 categories");
                   };
                   var pie = pieChart(category, quantity, title)
                   .variable('value')
                   .category('key')
                   d3.select('#chart_area')
                      .datum(dati)
                      .call(pie);
               } else if (chartType == 2){
                   if (dati.length > 10){
                        while (dati.length >= 10) { dati.pop(); };
                        window.alert("Output limited to 10 categories");
                   };
                   var donut = donutChart(category, quantity, title)
                   .variable('value')
                   .category('key')
                   d3.select('#chart_area')
                      .datum(dati)
                      .call(donut);
               } else if (chartType == 3){
                   if (dati.length > 10){
                        while (dati.length >= 10) { dati.pop(); };
                        window.alert("Output limited to 10 categories");
                   };
                   var line = lineChart(category, quantity, title)
                   .variable('value')
                   .category('key')
                   d3.select('#chart_area')
                      .datum(dati)
                      .call(line);
               }

               });
};






