import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { FormGenerateComponent } from './form-generate/form-generate.component';
import { FormSessionsComponent } from './form-sessions/form-sessions.component';

const routes: Routes = [{
  path: '',
  component: FormsComponent,
  children: [{
    path: 'inputs',
    component: FormInputsComponent,
  }, {
    path: 'layouts',
    component: FormLayoutsComponent,
  },
  {
    path: 'generate',
    component: FormGenerateComponent,
  },
  {
    path: 'sessions',
    component: FormSessionsComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class FormsRoutingModule {

}

export const routedComponents = [
  FormsComponent,
  FormInputsComponent,
  FormGenerateComponent,
  FormLayoutsComponent,
  FormSessionsComponent,
];
