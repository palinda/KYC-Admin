import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';

import { UiFeaturesModule } from './../ui-features/ui-features.module';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { NbAuthJWTInterceptor, NbAuthSimpleInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { ExtraComponentsModule } from '../extra-components/extra-components.module';
import { NbToastrModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxModalContentComponent } from '../extra-components/modal-content';

export function filterInterceptorRequest(req: HttpRequest<any>) {
    return ['/login',
          ]
      .some(url => req.url.includes(url));
}

@NgModule({
  imports: [
  ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    UiFeaturesModule,
    ExtraComponentsModule,
    FormsModule,
    NbToastrModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
  ]
})
export class TablesModule { }
