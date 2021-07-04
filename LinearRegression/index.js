
const loadCSV = require('./load.js');
const LinearRegression = require('./linearRegression.js');
const plot = require('node-remote-plot');



let { features, labels, testFeatures, testLabels } = loadCSV(
    './data/cars.csv',
    {
      shuffle: true,
      splitTest: 50,
      dataColumns: ['horsepower', 'weight', 'displacement'],
      labelColumns: ['mpg']
    }
  );

  //console.log(features, labels, testFeatures, testLabels);

  const regression = new LinearRegression(features, labels, {
    learningRate: 0.1,
    iterations: 3,
    batchSize: 10
  });
  
  regression.train();
  const r2 = regression.test(testFeatures, testLabels);
  console.log(r2);
  
  plot({
    x: regression.mseHistory.reverse(),
    xLabel: 'Iteration #',
    yLabel: 'Mean Squared Error for features "Horsepower, Weight, Displacement" '
  });
  
  console.log('R2 is', r2);
  
 // regression.predict([[120, 2, 380]]).print();