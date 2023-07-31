google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
  var spreadsheets = [
    // Spreadsheet 1
    {
      spreadsheetId: '1A-y1pv2KU5JWRGWbBjuMv3VKUJKVxaVdg8ZimwTMAm0',
      range: 'Sheet3!A2:G4',
      chartId: 'chart1',
      title: 'Kematian',
      width: 500,
      height: 300,
      chartType: 'BarChart',
      vAxis: 'Type dan Tahun',
      hAxis: 'Jumlah Kematian',
      conclusion: 'Kesimpulan:  Grafik di atas menampilkan jumlah kejadian berbagai jenis bencana di Indonesia dari tahun 2000 hingga 2022 Bencana alam memiliki jumlah kejadian yang cukup tinggi pada tahun 2005 dan 2006, tetapi cenderung menurun setelahnya. Sementara itu, bencana non alam dan penyakit mengalami peningkatan signifikan dari tahun ke tahun terutama pada periode 2010 hingga 2022. Bencana sosial, meskipun jarang terjadi, juga menunjukkan beberapa puncak kejadian pada tahun 2010 dan 2021.'
    },
  ];

  spreadsheets.forEach(function (spreadsheet) {
    var query = new google.visualization.Query(
      'https://docs.google.com/spreadsheets/d/' +
        spreadsheet.spreadsheetId +
        '/gviz/tq?gid=0&range=' +
        spreadsheet.range
    );
    query.send(function (response) {
      handleQueryResponse(response, spreadsheet);
    });
  });
}

function handleQueryResponse(response, spreadsheet) {
  if (response.isError()) {
    console.error('Error: ' + response.getMessage());
    return;
  }

  var data = response.getDataTable();
  drawChart(data, spreadsheet);
}

function drawChart(data, spreadsheet) {
  var options = {
    title: spreadsheet.title,
    width: spreadsheet.width,
    height: spreadsheet.height,
    vAxis: { title: spreadsheet.vAxis },
    hAxis: { title: spreadsheet.hAxis }
  };
  

  var chart;
  if (spreadsheet.chartType === 'ColumnChart') {
    chart = new google.visualization.ColumnChart(
      document.getElementById(spreadsheet.chartId)
    );
  } else if (spreadsheet.chartType === 'BarChart') {
    chart = new google.visualization.BarChart(
      document.getElementById(spreadsheet.chartId)
    );
  } else if (spreadsheet.chartType === 'LineChart') {
    chart = new google.visualization.LineChart(
      document.getElementById(spreadsheet.chartId)
    );
  } else if (spreadsheet.chartType === 'AreaChart') {
    chart = new google.visualization.AreaChart(
      document.getElementById(spreadsheet.chartId)
    );
  }
  
  chart.draw(data, options);

  var conclusionElement = document.createElement('p');
  conclusionElement.textContent = spreadsheet.conclusion;
  document.getElementById(spreadsheet.chartId).appendChild(conclusionElement);
}
