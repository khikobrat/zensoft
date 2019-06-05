import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pattern matching app';

  fileContent: string = '';
  inputFileName: string = '';
  fileContentPattern: string = '';
  patternFileName: string = '';
  matchLines: Array<any>;
  matchLinesMode2: Array<any>;
  matchLinesMode3: Array<any>;

  onUploadInput(fileList: FileList) {
    const file = fileList[0];
    this.inputFileName = file.name;
    const fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
    }
    fileReader.readAsText(file);
  }

  onUploadPattern(fileList: FileList) {
    const file = fileList[0];
    this.patternFileName = file.name;
    const fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = function(x) {
      self.fileContentPattern = fileReader.result;
    }
    fileReader.readAsText(file);
  }

  onClickCompare() {
    const listInput = this.fileContent.split('\n');
    const listPattern = this.fileContentPattern.split('\n');

    console.log(listInput)
    console.log(listPattern)
    const matchList = [];

    listInput.forEach((element) => {
      listPattern.forEach((pattern) => {
        if (element === pattern) {
          matchList.push(element);
        }
      });
    });

    this.matchLines = matchList;

    const matchListMode2 = [];

    listInput.forEach((element) => {
      listPattern.forEach((pattern) => {
        const elementList = element.split(' ');
        const patternList = pattern.split(' ');
        let counter = 0;

        elementList.forEach((el) => {
          patternList.forEach((pt) => {
            if (el === pt) {
              counter++;
            }
          });
        });

        if (counter === elementList.length || counter === patternList.length) {
          matchListMode2.push(element);
        }
      });
    });

    this.matchLinesMode2 = matchListMode2;

    const matchListMode3 = [];

    listInput.forEach((element) => {
      listPattern.forEach((pattern) => {
        const elementList = element.split(' ');
        const patternList = pattern.split(' ');

        const el = element;
        const pt = pattern
        let counter = 0;
        let doNotMatch1 = '';
        let doNotMatch2 = '';

        if (elementList.length === patternList.length) {
          for (let j = 0; j < elementList.length; j++) {
            if (elementList[j] !== patternList[j]) {
              doNotMatch1 = elementList[j];
              doNotMatch2 = patternList[j];
            } else {
              counter++;
            }
          }
        }

        const self = this;
        let pushed = false;

        if (counter >= elementList.length - 1) {
          let count = 0;

          const len1 = doNotMatch1.length;
          const len2 = doNotMatch2.length;
          if (len1 - len2 <= 1) {
            for (let i = 0; i < len2; i++) {
              if (doNotMatch1[i] !== doNotMatch2[i]) {
                count ++;
              }
            }

            if (count <= 1) {
              matchListMode3.push(element);
              pushed = true;
            }
          }

          if (len2 - len1 <= 1 && !pushed) {
            count = 0;
            for (let i = 0; i < len1; i++) {
              for (let k = 0; k < len2; k++) {
                if (doNotMatch1[i] === doNotMatch2[k]) {
                  count ++;
                }
              }
            }

            if (count === len1 || count === len2) {
              matchListMode3.push(element);
            }
          }
        }
      });
    });

    this.matchLinesMode3 = matchListMode3;
  }
}

