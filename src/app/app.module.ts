import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgstModule} from './ngst/ngst.module';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    NgstModule
  ],
  exports: [
  ],
  entryComponents:[DemoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
