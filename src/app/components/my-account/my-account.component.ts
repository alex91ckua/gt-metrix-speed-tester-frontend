import { Component, OnInit } from '@angular/core';
import { GtMetrixService } from 'src/app/core/services/gt-metrix.service';
import { AccountStatus } from 'src/app/core/models/account-status.type';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  accountStatusData: AccountStatus = {
    api_credits: null,
    api_refill: null
  };

  constructor(private gtMetrixService: GtMetrixService) { }

  ngOnInit() {
    this.gtMetrixService.getAccountStatus().subscribe((data) => {
      this.accountStatusData = data;
    })
  }

}
