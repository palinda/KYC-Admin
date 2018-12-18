import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { NbAlertModule, NbButtonModule, NbToastrModule } from '@nebular/theme';
import { ExtraComponentsModule } from '../extra-components/extra-components.module';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    NbAlertModule,
    NbButtonModule,
    ExtraComponentsModule,
    NbToastrModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
  ]
})
export class FormsModule { }
