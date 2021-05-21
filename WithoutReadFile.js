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
    console.log();
    let rawData = this.data;
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
  const strLong = `215
  193 124
  117 237 442
  218 935 347 235
  320 804 522 417 345
  229 601 723 835 133 124
  248 202 277 433 207 263 257
  359 464 504 528 516 716 871 182
  461 441 426 656 863 560 380 171 923
  381 348 573 533 447 632 387 176 975 449
  223 711 445 645 245 543 931 532 937 541 444
  330 131 333 928 377 733 017 778 839 168 197 197
  131 171 522 137 217 224 291 413 528 520 227 229 928
  223 626 034 683 839 053 627 310 713 999 629 817 410 121
  924 622 911 233 325 139 721 218 253 223 107 233 230 124 233`;

  const strSmall = `1
  8 4
  2 6 9
  8 5 9 3`;

  // This version does not take path as an argument. Please visit GitHub page for txt file input version. https://github.com/haydin505/FindMaxPathForOrthogonal

  const calculateMaxPath = () => {
    const calParameters = new CalculateMaxPath(null, strLong, 0, 0, []);
    calParameters.getInput();
    calParameters.countRowColumn();
    calParameters.createMultiDArray();
    calParameters.pushDataToMultiDArray();
    calParameters.checkForPrime();

    const finalMultiDArray = calParameters.multiDArray;

    console.log("Final multi dimensional array: ", finalMultiDArray);
    console.log("Result: ", calParameters.calculateMaxPath());
  };
  calculateMaxPath();
} catch (err) {
  console.error(err);
}
