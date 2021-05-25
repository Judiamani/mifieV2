import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ChatComponent } from './chat/chat.component';
import { SuivieComponent } from './suivie/suivie.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  { path: 'accueil', component: AccueilComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'suivie', component: SuivieComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
