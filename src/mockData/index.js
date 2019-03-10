import mockDataSet1 from './003PP.json';
import mockDataSet2 from './5000.json';
import mockDataSet3 from './R8970.json';
import mockDataSet4 from './W9848.json';
import mockDataSet5 from './Y0SE6.json';
import mockDataSet6 from './Z44.json';

function randomElement(array) {
  const randomIndex = Math.floor(array.length * Math.random());
  return array[randomIndex];
}

const dataPool = [mockDataSet1, mockDataSet2, mockDataSet3, mockDataSet4, mockDataSet5, mockDataSet6];

export default randomElement(dataPool);
