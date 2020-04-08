import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { GtMetrixService } from 'src/app/core/services/gt-metrix.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss']
})
export class NewTestComponent implements OnInit {

  formGroup;
  data: null | Array<any> = null;
  fileName: null | string = null;
  error: null | string = null;
  startDisabled: boolean = false;

  constructor(private papa: Papa, private gtMetrixService: GtMetrixService) { }

  ngOnInit() {
  }

  onStartClicked(event) {
    this.startDisabled = true;
    // do request for each url
    this.data.forEach(item => {
      this.gtMetrixService.createTest(item.url).subscribe(
        (data) => {
          if (data.state) {
            item.state = data.state;
          }
        },
        error => {
          console.log(error);
          item.state = 'error';
          // error message in error.error property
          item.errorMsg = error.error.error;
        },
      )
    });
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
   * Validate csv file data if they are correct.
   * Only urls should exist
   */
  private validateData(data: Array<Array<String>>): boolean {
    for (let i = 0; i < data.length; i++) {
      const el = data[i];
      const url = el[0];
      try {
        if (this.validURL(url) === false) {
          return false;
        }
      } catch (error) {
        return false;
      }
    }
    return true;
  }

  private prettifyData(data: Array<Array<String>>) {
    this.data = [];
    for (let i = 0; i < data.length; i++) {
      const el = data[i];
      const url = el[0];

      const item = {
        url: url,
        state: 'ready for test'
      };
      this.data.push(item);
    }

    console.log(this.data);
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
          if (this.validateData(results.data) && results.data.length > 0) {
            this.startDisabled = false;
            this.error = null;
            this.prettifyData(results.data);
          } else {
            this.data = null;
            this.error = 'Selected CSV file format is wrong or empty.';
          }
        }
      });

    }
  }

}
