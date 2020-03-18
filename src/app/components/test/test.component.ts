import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/core/models/test.type';
import { GtMetrixService } from 'src/app/core/services/gt-metrix.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  loaded = false;
  test: Test;

  constructor(private gtMetrixService: GtMetrixService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.gtMetrixService.getTest(id).subscribe((data) => {
      this.test = data;
      this.loaded = true;
    })
  }

}
