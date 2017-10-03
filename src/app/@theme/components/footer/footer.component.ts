import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://akveo.com" target="_blank">Hevan</a></b> 2017</span>
  `,
})
export class FooterComponent {
}
