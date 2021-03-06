(function($) {
  $(function() {
    $.ajax({
      type: 'GET',
      //url: "http://rvp.results.cz/export.php?format=csv&jmeno=&prijmeni=&narozen=&rc=&stat=&oddil=&pohlavi=&id=&cs=&cw=&ks=&kw=",
      //url: 'assets/registr_utf8.csv',
      url: 'https://rvp.results.cz/export_bohemka.php',
      //url: 'https://ps.stdin.cz/export_bohemka.php', // use our server as HTTPS proxy for now
      success: processData
    });
  }); // end of document ready

  const nameCompare = (a, b) => {
    return (
      a.Prijmeni.localeCompare(b.Prijmeni) || a.Jmeno.localeCompare(b.Jmeno)
    );
  };

  const parseCSVLines = (allTextLines, headers) => {
    var lines = [];
    allTextLines.forEach((textLine, index) => {
      // skip headers
      if (index !== 0) {
        const data = textLine.split(';');
        if (data.length == headers.length) {
          var member = {};
          headers.forEach((key, i) => (member[key] = data[i]));

          // hack to include only Bohemians members
          if (member['Oddil'] === 'Boh.Pha') {
            lines.push(member);
          }
        }
      }
    });
    return lines;
  };

  const processData = allText => {
    const allTextLines = allText.split(/\r\n|\n/);
    const headers = allTextLines[0].split(';');
    var lines = parseCSVLines(allTextLines, headers);

    // Fill the table with bohemians members
    lines.sort(nameCompare).forEach(member => {
      $('#reg-members > tbody').append(
        $('<tr></tr>')
          .append(`<td>${member['Jmeno']} ${member['Prijmeni']}</td>`)
          .append(`<td>${member['RGC']}</td>`)
          .append(`<td>${member['KS']}</td>`)
          .append(`<td>${member['C1S']}</td>`)
          .append(`<td>${member['C2S']}</td>`)
          .append(`<td>${member['KW']}</td>`)
          .append(`<td>${member['C1W']}</td>`)
          .append(`<td>${member['C2W']}</td>`)
      );
    });

    // Add number of members to section heading
    $('#reg-heading').append(` (${lines.length})`);
  };
})(jQuery); // end of jQuery name space
