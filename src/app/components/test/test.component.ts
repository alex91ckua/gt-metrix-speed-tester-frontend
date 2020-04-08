import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/core/models/test.type';
import { GtMetrixService } from 'src/app/core/services/gt-metrix.service';
import { ActivatedRoute } from '@angular/router';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  loaded = false;
  test: Test;
  readonly maxScorePoint = 100;
  readonly semicircle = false;
  readonly radius = 60;
  pageSpeedColor = 'white';
  yslowSpeedColor = 'white';
  readonly faExternalLinkAlt = faExternalLinkAlt;

  constructor(private gtMetrixService: GtMetrixService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.gtMetrixService.getTest(id).subscribe((data) => {
      this.test = data;
      this.loaded = true;

      if (this.test.results) {
        this.pageSpeedColor = this.getStatusColor(this.test.results.pagespeed_score);
        this.yslowSpeedColor = this.getStatusColor(this.test.results.yslow_score);
      }
    })
  }

  private convertBytesToKb(bytes: number){
    return (bytes / 1024).toFixed(0);
  }

  private convertMiliseconds(miliseconds: number, format: string) {
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
    
    total_seconds = miliseconds / 1000;
    total_minutes = Math.floor(total_seconds / 60);
    total_hours = Math.floor(total_minutes / 60);
    days = Math.floor(total_hours / 24);
  
    seconds = total_seconds % 60;
    minutes = total_minutes % 60;
    hours = total_hours % 24;
    
    switch(format) {
    case 's':
      return total_seconds.toFixed(1);
    case 'm':
      return total_minutes;
    case 'h':
      return total_hours;
    case 'd':
      return days;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
    }
  };

  private getStatusColor(points: number) {
    let color = 'red';
    if (points > 50) {
      color = '#d0d039';
    }
    if (points > 80) {
      color = '#5eba7d';
    }
    return color;
  }

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }

}
