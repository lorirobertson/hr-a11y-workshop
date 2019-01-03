/**
 * Charting functions for Deque accessibility dashboard
 * March 14, 2018 aG
 */
// Plotly reference: https://plot.ly/javascript/reference/
//
var fromDate,
    toDate,
    colors = [
        'rgba(0,119,200,1)', // lt blue
        'rgba(200,120,0,1)', // mustard
        'rgba(105,184,63,1)', // green
        'rgba(200,20,0, 1)', // red
        'rgba(140,0,200,1)', // purple
        'rgba(200,170,0,1)', // yellow
        'rgba(0,51,73,1)', // dk blue
        'rgba(255,115,0,1)', // orange
      ],
    issueLevels = [
      { dataName: 'totalCritical', title: 'Total Critical', color: colors[3] },
      { dataName: 'totalSerious', title: 'Total Serious', color: colors[1] },
      { dataName: 'totalModerate', title: 'Total Moderate', color: colors[6] },
      { dataName: 'totalMinor', title: 'Total Minor', color: colors[0] }
    ],
    pageLevels = [
      { dataName: 'pagesCritical', title: 'Critical Pages', color: colors[3] },
      { dataName: 'pagesSerious', title: 'Serious Pages', color: colors[1] },
      { dataName: 'pagesModerate', title: 'Moderate Pages', color: colors[6] },
      { dataName: 'pagesMinor', title: 'Minor Pages', color: colors[0] }
    ],
    commonLayout = {
      height: 600,
      autosize: true,
      font: {
        family: 'Roboto, Calibri, San Serif'
      },
      titlefont: {
        family: 'Roboto Condensed',
        size: 20
      }
    },
    options = {
      displaylogo: false,
      displayModeBar: false
    };

function chartOne(chart1, data) {  // Accessibility Score by Business Unit

  function processData(allRows) {

    var latestScanDate,
        uniqueScanNames = allRows.uniqueScanNames;

    var dates = [],
        scores = [];

    uniqueScanNames.forEach(proj => {
      var matchingRows = allRows.filter(row => row.scanName === proj),
          matchingDates = [],
          matchingScores = [];

      matchingRows.forEach(row => {
        matchingDates.push(row['scanDate']);
        matchingScores.push(Math.round(row['score']));
      })

      dates.push(matchingDates);
      scores.push(matchingScores);
    });

    if (!$.fn.DataTable.isDataTable('#chart1table')) {

      $('#chart1table').DataTable({
        data: data,
        columns: [
          { data: 'scanName', title: 'Scan Name', className: 'dt-center' },
          { data: 'scanDate', title: 'Scan Date', className: 'dt-center',
            render: data => {
              return formatDateForTable(data);
            }
          },
          { data: 'score', title: 'Score', className: 'dt-center' }
        ],
        searching: false,
        lengthChange: false,
        'dom': 'rltip'
      });

      $('#chart1table').prepend('<caption><b>Accessibility Score by Business Unit</b></caption');

    } else {
      var $datatable = $('#chart1table').DataTable();
      $datatable.clear();
      $datatable.rows.add(data);
      $datatable.draw();
    }

    makePlotly(dates, scores, uniqueScanNames);
  }

  function makePlotly(dates, scores, uniqueScanNames) {

    var xData = dates,
        yData = scores;

    var labels = uniqueScanNames;

    var data = [];

    for (var i = 0; i < xData.length; i++) {
      var thisX = xData[i],
          thisY = yData[i];
      var result = {
        x: thisX,
        y: thisY,
        type: 'scatter',
        mode: 'lines',
        line: {
          color: colors[i],
          width: 3
        },
        name: uniqueScanNames[i]
      };
      var result2 = {
        x: [thisX[0], thisX[thisX.length - 1]],
        y: [thisY[0], thisY[thisY.length - 1]],
        hoverinfo: 'none',
        type: 'scatter',
        mode: 'markers',
        marker: {
          color: colors[i],
          size: 12
        },
        name: uniqueScanNames[i],
      };
      data.push(result, result2);
    }

    var layout = Object.assign({}, commonLayout, {
      showlegend: false,
      width: $('#chart1').parent().width(),
      yaxis: {
        showgrid: false,
        zeroline: false,
        showline: false,
        showticklabels: false
      },
      margin: {
        autoexpand: true,
        l: 100,
        r: 20,
        t: 100
      },
      title: '<b>Accessibility Score by Business Unit</b>',
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top',
        text: 'Source: Deque WorldSpace',
        showarrow: false
      }]
    });

    for (var i = 0; i < xData.length; i++) {
      var lastVal = yData[i][yData[i].length - 1];
      var result = {
        xref: 'paper',
        x: 0.05,
        y: yData[i][0],
        xanchor: 'right',
        yanchor: 'middle',
        text: labels[i] + ' ' + yData[i][0] + '%',
        showarrow: false,
        font: {
          family: 'Roboto, Calibri, San Serif',
          size: 12,
          color: 'black'
        }
      };
      var result2 = {
        xref: 'paper',
        x: 0.95,
        y: lastVal,
        xanchor: 'left',
        yanchor: 'middle',
        text: lastVal + '%',
        font: {
          family: 'Roboto, Calibri, San Serif',
          size: 12,
          color: 'black'
        },
        showarrow: false
      };

      layout.annotations.push(result, result2);
    }

    Plotly.newPlot(chart1, data, layout, options);
  }

  processData(data);
}

function chartTwo(chart2, data) {  // Pages with Issues by Business Unit

  function processData(allRows) {

    var latestScanDate,
        uniqueScanNames = allRows.uniqueScanNames;

    var latestIssuePages = uniqueScanNames.map(proj => {
      var matchingRows = allRows.filter(row => row.scanName === proj);
      var mostRecent = matchingRows.sort(compareDates)[0];
      latestScanDate = mostRecent.scanDate;

      return {
        'scanName': proj,
        'pageCount': parseInt(mostRecent.pagesCritical) +
                     parseInt(mostRecent.pagesSerious) +
                     parseInt(mostRecent.pagesModerate) +
                     parseInt(mostRecent.pagesMinor)
      }
    });

    if (!$.fn.DataTable.isDataTable('#chart2table')) {

      $('#chart2table').DataTable({
        data: latestIssuePages,
        columns: [
          { data: 'scanName', title: 'Business Unit', className: 'dt-center' },
          { data: 'pageCount', title: 'Pages with Issues', className: 'dt-center' }
        ],
        searching: false,
        lengthChange: false,
        'dom': 'rltip'
      });

      $('#chart2table').prepend('<caption><b>Pages with Issues by Business Unit</b></caption');

    } else {
      var $datatable = $('#chart2table').DataTable();
      $datatable.clear();
      $datatable.rows.add(latestIssuePages);
      $datatable.draw();
    }

    makePlotly(latestIssuePages, latestScanDate);

  }

  function makePlotly(latestIssuePages, latestScanDate) {

    var data = [{
      values: latestIssuePages.map(row => row.pageCount),
      labels: latestIssuePages.map(row => row.scanName),
      type: 'pie',
      hole: 0.4,
      textinfo: 'label+value',
      insidetextfont: {
        size: 14
      },
      outsidetextfont: {
        size: 14
      },
      showlegend: false,
      marker: {
        colors: colors
      },
      textfont: {
        size: 48,
        color: '#000'
      },
      font: {
        family: 'Roboto, Calibri, San Serif',
      }
    }];

    var layout = Object.assign({}, commonLayout, {
      title: '<b>Pages with Issues by Business Unit</b>',
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top',
        text: 'Source: Deque WorldSpace - ' + new Date(latestScanDate).toLocaleDateString(),
        showarrow: false,
        font: {
          family: 'Roboto, Calibri, San Serif',
          size: 12
        }
      }]
    });

    Plotly.newPlot(chart2, data, layout, options);
  }

  processData(data);
}

function chartThree(chart3, data) {  // Issues by Business Unit

  function processData(allRows) {

    var latestScanDate,
        uniqueScanNames = allRows.uniqueScanNames;

    var latestTotals = uniqueScanNames.map(proj => {
      var matchingRows = allRows.filter(row => row.scanName === proj);
      var mostRecent = matchingRows.sort(compareDates)[0];
      latestScanDate = mostRecent.scanDate;
      return {
        'scanName': proj,
        'scores': [mostRecent.totalCritical, mostRecent.totalSerious, mostRecent.totalModerate, mostRecent.totalMinor]
      };
    });

    if (!$.fn.DataTable.isDataTable('#chart3table')) {

      $('#chart3table').DataTable({
        data: latestTotals,
        columns: [
          { data: 'scanName', title: 'Business Unit', className: 'dt-center' },
          { data: 'scores.0', title: issueLevels[0].title, className: 'dt-center' },
          { data: 'scores.1', title: issueLevels[1].title, className: 'dt-center' },
          { data: 'scores.2', title: issueLevels[2].title, className: 'dt-center' },
          { data: 'scores.3', title: issueLevels[3].title, className: 'dt-center' }
        ],
        searching: false,
        lengthChange: false,
        'dom': 'rltip'
      });

      $('#chart3table').prepend('<caption><b>Issues by Business Unit</b></caption');

    } else {
      var $datatable = $('#chart3table').DataTable();
      $datatable.clear();
      $datatable.rows.add(latestTotals);
      $datatable.draw();
    }

    makePlotly(uniqueScanNames, latestTotals, latestScanDate);
  }

  function makePlotly(projects, latestTotals, latestScanDate) {

    var data = issueLevels.map((lvl, i) => {
      return {
        x: projects,
        y: latestTotals.map(row => row.scores[i]),
        name: lvl.title,
        type: 'bar',
        marker: {
          color: issueLevels[i].color
        }
      };
    })

    var layout = Object.assign({}, commonLayout, {
      title: '<b>Issues by Business Unit</b>',
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top',
        text: 'Source: Deque WorldSpace - ' + new Date(latestScanDate).toLocaleDateString(),
        showarrow: false,
        font: {
          family: 'Roboto, Calibri, San Serif',
          size: 12
        }
      }],
      barmode: 'stack',
      showlegend: true
    });

    Plotly.newPlot(chart3, data, layout, options);
  }

  processData(data);
}

function chartFour(chart4, data) {  // Issues by Impact

  function processData(allRows) {

    var latestScanDate,
        uniqueScanNames = allRows.uniqueScanNames;

    var latestTotals = uniqueScanNames.map(proj => {
      var matchingRows = allRows.filter(row => row.scanName === proj);
      var mostRecent = matchingRows.sort(compareDates)[0];
      latestScanDate = mostRecent.scanDate;
      return {
        'scanName': proj,
        'scores': [mostRecent.totalCritical, mostRecent.totalSerious, mostRecent.totalModerate, mostRecent.totalMinor]
      };
    });

    if (!$.fn.DataTable.isDataTable('#chart4table')) {

      $('#chart4table').DataTable({
        data: latestTotals,
        columns: [
          { data: 'scanName', title: 'Business Unit', className: 'dt-center' },
          { data: 'scores.0', title: issueLevels[0].title, className: 'dt-center' },
          { data: 'scores.1', title: issueLevels[1].title, className: 'dt-center' },
          { data: 'scores.2', title: issueLevels[2].title, className: 'dt-center' },
          { data: 'scores.3', title: issueLevels[3].title, className: 'dt-center' }
        ],
        searching: false,
        lengthChange: false,
        'dom': 'rltip'
      });

      $('#chart4table').prepend('<caption><b>Issues by Impact</b></caption');

    } else {
      var $datatable = $('#chart4table').DataTable();
      $datatable.clear();
      $datatable.rows.add(latestTotals);
      $datatable.draw();
    }

    makePlotly(latestTotals, latestScanDate);
  }

  function makePlotly(latestTotals, latestScanDate) {

    var data = latestTotals.map((row, i) => {
      return {
        x: issueLevels.map(row => row.title),
        y: row.scores,
        name: row.scanName,
        type: 'bar',
        marker: {
          color: colors[i]
        }
      };
    })

    var layout = Object.assign({}, commonLayout, {
      title: '<b>Issues by Impact</b>',
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top',
        text: 'Source: Deque WorldSpace - ' + new Date(latestScanDate).toLocaleDateString(),
        showarrow: false,
        font: {
          family: 'Roboto, Calibri, San Serif',
          size: 12
        }
      }],
      barmode: 'stack',
      showlegend: true
    });

    Plotly.newPlot(chart4, data, layout, options);
  }

  processData(data);
}

function chartFive(chart5, data) {  // Pages by Business Unit

  function processData(allRows) {

    var latestScanDate,
        uniqueScanNames = allRows.uniqueScanNames;

    var latestTotals = uniqueScanNames.map(proj => {
      var matchingRows = allRows.filter(row => row.scanName === proj);
      var mostRecent = matchingRows.sort(compareDates)[0];
      latestScanDate = mostRecent.scanDate;
      return {
        'scanName': proj,
        'scores': [mostRecent.pagesCritical, mostRecent.pagesSerious, mostRecent.pagesModerate, mostRecent.pagesMinor]
      };
    });

    if (!$.fn.DataTable.isDataTable('#chart5table')) {

      $('#chart5table').DataTable({
        data: latestTotals,
        columns: [
          { data: 'scanName', title: 'Business Unit', className: 'dt-center' },
          { data: 'scores.0', title: 'Critical Pages', className: 'dt-center' },
          { data: 'scores.1', title: 'Serious Pages', className: 'dt-center' },
          { data: 'scores.2', title: 'Moderate Pages', className: 'dt-center' },
          { data: 'scores.3', title: 'Minor Pages', className: 'dt-center' }
        ],
        searching: false,
        lengthChange: false,
        'dom': 'rltip'
      });

      $('#chart5table').prepend('<caption><b>Pages by Business Unit</b></caption');

    } else {
      var $datatable = $('#chart5table').DataTable();
      $datatable.clear();
      $datatable.rows.add(latestTotals);
      $datatable.draw();
    }

    makePlotly(uniqueScanNames, latestTotals, latestScanDate);
  }

  function makePlotly(projects, latestTotals, latestScanDate) {

    var data = issueLevels.map((lvl, i) => {
      return {
        x: projects,
        y: latestTotals.map(row => row.scores[i]),
        name: lvl.title,
        type: 'bar',
        marker: {
          color: pageLevels[i].color
        }
      };
    })

    var layout = Object.assign({}, commonLayout, {
      title: '<b>Pages by Business Unit</b>',
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top',
        text: 'Source: Deque WorldSpace - ' + new Date(latestScanDate).toLocaleDateString(),
        showarrow: false,
        font: {
          family: 'Roboto, Calibri, San Serif',
          size: 12
        }
      }],
      barmode: 'stack',
      showlegend: true
    });

    Plotly.newPlot(chart5, data, layout, options);
  }

  processData(data);
}

function dataTableOne(data) {

  $('#datatable').DataTable({
    responsive: {
      breakpoints: [
        { name: 'lg', width: Infinity },
        { name: 'md', width: 1200 },
        { name: 'sm', width: 992 },
        { name: 'xs', width: 768 }
      ]
    },
    data: data,
    columns: [
      { data: 'scanName', title: 'Scan Name', className: 'all dt-center' },
      { data: 'scanDate', title: 'Scan Date', className: 'all dt-center',
        render: data => {
          return formatDateForTable(data);
        }
      },
      { data: 'uniqueLocations', title: 'Unique Locations', className: 'all dt-center' },
      { data: 'score', title: 'Score', className: 'all dt-center' },
      { data: 'totalCritical', title: 'Total Critical', className: 'lg md dt-center' },
      { data: 'totalSerious', title: 'Total Serious', className: 'lg md dt-center' },
      { data: 'totalModerate', title: 'Total Moderate', className: 'lg md dt-center' },
      { data: 'totalMinor', title: 'Total Minor', className: 'lg md dt-center' },
      { data: 'pagesCritical', title: 'Critical Pages', className: 'lg md dt-center' },
      { data: 'pagesSerious', title: 'Serious Pages', className: 'lg md dt-center' },
      { data: 'pagesModerate', title: 'Moderate Pages', className: 'lg md dt-center' },
      { data: 'pagesMinor', title: 'Minor Pages', className: 'lg md dt-center' }
    ],
    searching: false
  });
}

function updateSummary(data) {

  var greenup   = ' <img src="images/green-up.gif" alt="trending up">',
      greendown = ' <img src="images/green-down.gif" alt="trending down">',
      redup     = ' <img src="images/red-up.gif" alt="trending up">',
      reddown   = ' <img src="images/red-down.gif" alt="trending down">';

  var allScanNames = data.map(row => {
    return row.scanName;
  });

  var uniqueScanNames = Array.from(new Set(allScanNames));

  var latestScanDate;

  var previousTotals = uniqueScanNames.map(proj => {
    var matchingRows = data.filter(row => row.scanName === proj);
    var previous = matchingRows.sort().reverse()[1];

    if (!previous) {
      return null;
    }

    return {
      'name': proj,
      'scanDate': latestScanDate,
      'score': parseInt(previous.score),
      'totalIssues': parseInt(previous.totalCritical) +
                     parseInt(previous.totalSerious) +
                     parseInt(previous.totalModerate) +
                     parseInt(previous.totalMinor),
      'totalPages': parseInt(previous.pagesCritical) +
                    parseInt(previous.pagesSerious) +
                    parseInt(previous.pagesModerate) +
                    parseInt(previous.pagesMinor),
      'pagesCritial': parseInt(previous.totalCritical)
    }
  });

  var prevAverageScore = Math.round(previousTotals.map(item => item.score).reduce((prev, next) => prev + next) / previousTotals.length);
  var prevSumTotalIssues = previousTotals.map(item => item.totalIssues).reduce((prev, next) => prev + next);
  var prevSumTotalPages = previousTotals.map(item => item.totalPages).reduce((prev, next) => prev + next);
  var prevSumPagesCritical = previousTotals.map(item => item.pagesCritial).reduce((prev, next) => prev + next);

  var latestTotals = uniqueScanNames.map(proj => {
    var matchingRows = data.filter(row => row.scanName === proj);
    var mostRecent = matchingRows.sort().reverse()[0];
    latestScanDate = mostRecent.scanDate;
    return {
      'name': proj,
      'scanDate': latestScanDate,
      'score': parseInt(mostRecent.score),
      'totalIssues': parseInt(mostRecent.totalCritical) +
                     parseInt(mostRecent.totalSerious) +
                     parseInt(mostRecent.totalModerate) +
                     parseInt(mostRecent.totalMinor),
      'totalPages': parseInt(mostRecent.pagesCritical) +
                    parseInt(mostRecent.pagesSerious) +
                    parseInt(mostRecent.pagesModerate) +
                    parseInt(mostRecent.pagesMinor),
      'pagesCritial': parseInt(mostRecent.totalCritical)
    }
  });

  var averageScore = Math.round(latestTotals.map(item => item.score).reduce((prev, next) => prev + next) / latestTotals.length);
  var sumTotalIssues = latestTotals.map(item => item.totalIssues).reduce((prev, next) => prev + next);
  var sumTotalPages = latestTotals.map(item => item.totalPages).reduce((prev, next) => prev + next);
  var sumPagesCritical = latestTotals.map(item => item.pagesCritial).reduce((prev, next) => prev + next);

  $('#score').html(averageScore + ' ' + (averageScore > prevAverageScore ? greenup : reddown));
  $('#total-issues').html(sumTotalIssues + ' ' + (sumTotalIssues > prevSumTotalIssues ? redup : greendown));
  $('#pages-fixed').html(sumTotalPages + ' ' + (sumTotalPages > prevSumTotalPages ? redup : greendown));
  $('#pages-critical').html(sumPagesCritical + ' ' + (sumPagesCritical > prevSumPagesCritical ? redup : greendown));

  $('#summaryDate').text('Summary statistics as of ' + new Date(latestScanDate).toLocaleDateString());
}

function initDates(data) {

  var dates = data.map(d => {
    return d.scanDate;
  });

  fromDate = d3.min(dates).substring(0, 10);
  toDate = d3.max(dates).substring(0, 10);

  $('#from-date')
    .val(fromDate)
    .attr('min', fromDate)
    .attr('max', toDate);

  $('#to-date')
    .val(toDate)
    .attr('min', fromDate)
    .attr('max', toDate);
}

function positionDates() {
  $('#dates').insertAfter($(window).width() < 992 ? '#table' : '#heading');
}

function compareDates(a, b) {
  return new Date(b.scanDate) - new Date(a.scanDate);
}

function formatDateForTable(data) {
  return '<span style="display:none">' + data + '</span>' + new Date(data).toLocaleDateString();
}

function getUniqueScanNames(data) {
  var allScanNames = data.map(row => { return row.scanName });
  return Array.from(new Set(allScanNames));
}

$(document).ready(function() {

  var chart1 = Plotly.d3.select('#chart1').node(),
      chart2 = Plotly.d3.select('#chart2').node(),
      chart3 = Plotly.d3.select('#chart3').node(),
      chart4 = Plotly.d3.select('#chart4').node(),
      chart5 = Plotly.d3.select('#chart5').node(),
      d;

  // look for data param in url, else bank as default (index.html?data=telco)
  var dataParam = new URL(window.location.href).searchParams.get('data');
  var datafile = 'data/' + (dataParam ? dataParam : 'bank') + '.csv';

  Plotly.d3.csv(datafile, data => {

    data.uniqueScanNames =  getUniqueScanNames(data);

    chartOne(chart1, data);
    chartTwo(chart2, data);
    chartThree(chart3, data);
    chartFour(chart4, data);
    chartFive(chart5, data);
    dataTableOne(data);
    initDates(data);
    updateSummary(data);

    d = data;
  });

  function resizeElements() {
    Plotly.Plots.resize(chart1);
    Plotly.Plots.resize(chart2);
    Plotly.Plots.resize(chart3);
    Plotly.Plots.resize(chart4);
    Plotly.Plots.resize(chart5);
    positionDates();
  }

  window.addEventListener('resize', resizeElements);

  resizeElements();

  $('#dateUpdate').on('click', function() {

    var from = $('#from-date').val(),
        to = $('#to-date').val();

    var fromAsDate = new Date(from + 'Z'),
        toAsDate = new Date(to + 'Z');

    var restrictRange = false;

    if (restrictRange && fromAsDate >= toAsDate.setMonth(toAsDate.getMonth() - 1)) {

      alert('Date range must be at least one month in length.  Please try again.');
      $('#from-date').val(fromDate);
      $('#to-date').val(toDate);

    } else {

      var match = d.filter(d => d.scanDate >= from && d.scanDate.substring(0, 10) <= to);

      match.uniqueScanNames =  getUniqueScanNames(match);

      chartOne(chart1, match);
      chartTwo(chart2, match);
      chartThree(chart3, match);
      chartFour(chart4, match);
      chartFive(chart5, match);

      updateSummary(match);
      resizeElements();
      fromDate = from;
      toDate = to;

      $('#from-date').attr('max', $('#to-date').val());
      $('#to-date').attr('min', $('#from-date').val());
    }
  })

  $('#score-header').on('mouseover focus', function() {
    $('#score-tip').show();
  }).on('mouseout blur', function() {
    $('#score-tip').hide();
  });

  $('.chart-toggle').on('click', e => {
    $(e.target)
      .closest('button')
      .children()
      .toggle() // button icons
      .end()
      .next()
      .toggle() // chart
      .next()
      .toggle(); // table
  });
});