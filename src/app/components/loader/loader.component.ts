import { Component } from '@angular/core';
@Component({
  selector: 'app-loader',
  template: `
  <div id="app-loader" class="fixed inset-0 flex items-center justify-center bg-base-300 bg-opacity-60 z-50">
    <div class="loading loading-ring loading-lg">
    </div>
  </div>
  `,
  styles: /*css*/ `
    #app-loader {
      backdrop-filter: blur(1px);
    }

    .loading-lg {
      width: 6rem;
    }
  `,
  standalone: true,
})
export class LoaderComponent {}
