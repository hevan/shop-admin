import { Component } from '@angular/core';

@Component({
  selector: 'ngx-my-tables',
  styleUrls: ['./tables-layouts.component.scss'],
  templateUrl: './tables-layouts.component.html',
})
export class MyTablesLayoutsComponent {

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

}
