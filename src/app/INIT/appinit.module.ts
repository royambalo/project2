import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppinitService } from './appinit.service';

export function app_init(appinitService: AppinitService) {
  return () => appinitService.load();
}

@NgModule({
  providers: [
    AppinitService,
    {
      provide: APP_INITIALIZER,
      useFactory: app_init,
      deps: [AppinitService],
      multi: true,
    },
  ],
})
export class AppinitModule {}
