const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class CalculateMaxPath {
  constructor(path, data, row, column, multiDArray) {
    this.multiDArray = multiDArray;
    this.path = path;
    this.data = data;
    this.row = row;
    this.column = column;
  }

  static userInput = (cb) => {
    rl.question(
      "Please enter the path of the file (e.g. C:\\data.txt):",
      (path) => cb(path)
    );
  };

  getInput = () => {
    console.log(this.path);
    let rawData = fs.readFileSync(this.path, "utf-8");
    let modifiedRawData = rawData.split("").filter((el) => el !== "\r");
    let str = "";
    for (let i = 0; i < modifiedRawData.length; i++) {
      if (modifiedRawData[i] === "\n") {
        str = str + " \n ";
        continue;
      } else if (modifiedRawData[i] === " ") {
        str = str + " ";
      } else {
        str = str + modifiedRawData[i];
      }
    }
    this.data = str.split(" ");
  };

  countRowColumn = () => {
    // Count row and column in order to create 2d array.
    let row = 1;
    let column = 1;
    let columnCounter = 0;
    for (let i = 0; i < this.data.length; i++) {
      columnCounter++;
      if (this.data[i] === "\n") {
        if (column < columnCounter) {
          column = columnCounter;
        }
        columnCounter = 0;
        row++;
      }
    }
    this.column = column;
    this.row = row;
  };

  isPrime = (num) => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  };

  createMultiDArray = () => {
    // Create 2d array
    for (let i = 0; i < this.row; i++) {
      this.multiDArray[i] = [];
      for (let j = 0; j < this.column; j++) {
        this.multiDArray[i][j] = 0;
      }
    }
  };

  pushDataToMultiDArray = () => {
    // Push numbers to 2 dimensional array.
    let dataCount = 0;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        if (this.data[dataCount] === "\n") {
          dataCount++;
          break;
        }
        this.multiDArray[i][j] = Number(this.data[dataCount]);
        dataCount++;
      }
    }
  };
  checkForPrime = () => {
    // Check for prime
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        if (this.isPrime(this.multiDArray[i][j])) this.multiDArray[i][j] = 0;
      }
    }
  };
  calculateMaxPath = () => {
    for (let i = this.row - 2; i >= 0; i--) {
      for (let j = 0; j <= i; j++) {
        // if number is 0 do not add bottom to top and continue.
        if (this.multiDArray[i][j] === 0) {
          continue;
        }
        if (this.multiDArray[i + 1][j] > this.multiDArray[i + 1][j + 1])
          this.multiDArray[i][j] += this.multiDArray[i + 1][j];
        else this.multiDArray[i][j] += this.multiDArray[i + 1][j + 1];
      }
    }
    return this.multiDArray[0][0];
  };
}

try {
  const calculateMaxPath = (path) => {
    const calParameters = new CalculateMaxPath(path, null, 0, 0, []);

    calParameters.getInput();
    calParameters.countRowColumn();
    calParameters.createMultiDArray();
    calParameters.pushDataToMultiDArray();
    calParameters.checkForPrime();

    const finalMultiDArray = calParameters.multiDArray;

    console.log("Final multi dimensional array: ", finalMultiDArray);
    console.log("Result: ", calParameters.calculateMaxPath());
  };

  CalculateMaxPath.userInput(calculateMaxPath);
} catch (err) {
  console.error(err);
}
