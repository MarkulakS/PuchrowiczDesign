import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingsComponent } from './components/drawings/drawings.component';
import { Graphics2dComponent } from './components/graphics2d/graphics2d.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent },
  {path: 'drawings', component: DrawingsComponent },
  {path: 'graphics-2D', component: Graphics2dComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
