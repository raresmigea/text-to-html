function getInputValue() {
  const inputVal = document.getElementById('input').value;
  const inputLines = inputVal.split('\n');

  inputLines.forEach((arr, index) => {
    // rule 2: pre-formatted
    if (arr.includes('`')) {
      inputLines[index] = arr.replace(/`([^`]+)`?/g, '<pre>$1</pre>');
    }

    // rule 3: header
    if (arr.startsWith('#')) {
      const c = arr.split(' ')[0].match(/#/g || []).length;
      inputLines[index] = `<h${c}>${arr.replace(/#/g, '').trim()}</h${c}>`;
    }

    // rule 4: bold
    if (arr.includes('!')) {
      inputLines[index] = arr.replace(/\!([^!]+)\!/g, '<b>$1</b>');
    }

    // rule 5: http requests
    if (arr.includes('{http')) {
      let url = arr.slice(arr.indexOf('http'), arr.indexOf('}'));
      const returnedJson = getUrlResponse(url);
      inputLines[index] = arr.replace(arr, `{${returnedJson}}`);
    }
  });

  // rule 1: paragraphs
  newTextStr = '';
  inputLines.forEach(function (paragraph) {
    newTextStr += '<p>' + paragraph + '</p>';
  });

  document.getElementById('output').innerHTML = newTextStr;
}

function getUrlResponse(url) {
  const Httpreq = new XMLHttpRequest();
  Httpreq.open('GET', url, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

/*
 * Data example
 *
 * http://soundcloud.com/oembed?url=http%3A//soundcloud.com/forss/flickermood&format=js&callback=?
 */
