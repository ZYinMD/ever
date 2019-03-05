const mockHeader = ['Some Header', 'Another Header', 'Yet Another Header', 'Just One More'];

const mockData = [];
mockData[0] = [222, 55555, 'fooooooooooooooooooo', 'bar'];
mockData[1] = {
  Address: '12011 Lee Jackson Memorial Highway',
  'Address Line 2': 'Suite 400',
  City: 'Fairfax',
  State: 'VA',
};
mockData[2] = ['there can be', 'empty cells', '', 'just pass in empty string'];
mockData[3] = ['the width of ', 'these columns', 'are auto calculated', 'unless you specify'];

export { mockHeader, mockData };
