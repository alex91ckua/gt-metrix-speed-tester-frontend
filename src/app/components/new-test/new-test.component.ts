import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss']
})
export class NewTestComponent implements OnInit {

  formGroup;
  parsedCsvFile = null;
  fileName: null | string = null;
  error: null | string = null;

  constructor(private papa: Papa) { }

  ngOnInit() {
  }

  onStartClicked() {
  }

  private validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  /**
   * Check if csv file data are correct.
   * Only urls should exist
   */
  private isValidData(data: Array<Array<String>>): boolean{
    for (let i = 0; i < data.length; i++) {
      let el = data[i];
      try {
        if (this.validURL(el[0]) === false) {
          return false;
        }
      } catch (error) {
        return false;
      }
    }
    return true;
  }

  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileName = file.name;
      reader.readAsDataURL(file);
    
      this.papa.parse(file, {
        complete: (results) => {
          console.log('Parsed CSV: ', results);
          if (this.isValidData(results.data) && results.data.length > 0) {
            this.error = null;
            this.parsedCsvFile = results;
          } else {
            this.error = 'Selected CSV file format is wrong or empty.'
          }
        }
      });

    }
  }

}
