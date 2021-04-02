import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MongoModule } from './components/mongo/mongo.module';
import { NavBarModule } from './components/nav-bar/nav-bar.module';
import { ReadMeModule } from './components/read-me/read-me.module';
import { TerminalCommandModule } from './components/read-me/terminal-command/terminal-command.module';
import { MyStoreModule } from './components/store/store.module';
import { SetupPageComponent } from './components/setup-page/setup-page.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SetupPageComponent,
    GamePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MongoModule,
    NavBarModule,
    MyStoreModule,
    TerminalCommandModule,
    ReadMeModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
