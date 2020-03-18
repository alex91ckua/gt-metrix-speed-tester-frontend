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

  constructor(private papa: Papa) { }

  ngOnInit() {
  }

  onStartClicked() {

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
          this.parsedCsvFile = results;
        }
      });

    }
  }

}
