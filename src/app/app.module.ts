import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgstModule} from './ngst/ngst.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgstModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
