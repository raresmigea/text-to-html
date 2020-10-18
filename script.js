function getInputValue() {
  var inputVal = document.getElementById('input').value;

  const inputLines = inputVal.split('\n');
  inputLines.forEach((arr, index) => {
    // rule 2 - preformatted
    if (arr.includes('`')) {
      inputLines[index] = arr.replace(/`([^`]+)`?/g, '<pre>$1</pre>');
    }

    // rule 3 - header
    if (arr.startsWith('#')) {
      var c = arr.split(' ')[0].match(/#/g || []).length;
      inputLines[index] = `<h${c}>${arr.replace(/#/g, '').trim()}</h${c}>`;
    }

    // rule 4 - bold
    if (arr.includes('!')) {
      inputLines[index] = arr.replace(/\!(\w+)\!/g, '<b>$1</b>');
    }

    // rule 5 - http requests
    if (arr.includes('{http')) {
      let url = arr.slice(arr.indexOf('http'), arr.indexOf('}'));
      const returnedJson = gets(url);
      inputLines[index] = arr.replace(arr, `{${returnedJson}}`);
    }
  });

  // rule 1 - paragraphs
  newTextStr = '';
  inputLines.forEach(function (paragraph) {
    newTextStr += '<p>' + paragraph + '</p>';
  });

  console.log('nn: ', newTextStr);

  document.getElementById('output').innerHTML = newTextStr;
}

function gets(yourUrl) {
  var Httpreq = new XMLHttpRequest();
  Httpreq.open('GET', yourUrl, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

/**
 * Related to the URL for HTTP request:
 * - I couldn't access the URL from the example so I've used a different one for testing:
 * http://soundcloud.com/oembed?url=http%3A//soundcloud.com/forss/flickermood&format=js&callback=?
 *
 * Related to rules 2 and 4.
 * I don't know if it is the case to have both rules for the same line, it is not implemented for both
 * at the same time. If needed, it would be needed a new if branch which is entered if both conditions
 * are true
 */
