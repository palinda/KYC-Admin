import { NgModule } from '@angular/core';

import { ImageViewerModule } from 'ngx-image-viewer';
import { ThemeModule } from '../../@theme/theme.module';
import { ButtonsModule } from './buttons/buttons.module';
import { UiFeaturesRoutingModule } from './ui-features-routing.module';
import { UiFeaturesComponent } from './ui-features.component';
import { GridComponent } from './grid/grid.component';
import { ModalsComponent } from './modals/modals.component';
import { IconsComponent } from './icons/icons.component';
import { ModalComponent } from './modals/modal/modal.component';
import { TypographyComponent } from './typography/typography.component';
import { TabsComponent, Tab1Component, Tab2Component } from './tabs/tabs.component';
import { SearchComponent } from './search-fields/search-fields.component';
import { PopoversComponent } from './popovers/popovers.component';
import {
  NgxPopoverCardComponent, NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
} from './popovers/popover-examples.component';
import { ModalVersionComponent } from './modals/modal/modal-version.component';

const components = [
  UiFeaturesComponent,
  GridComponent,
  ModalsComponent,
  IconsComponent,
  ModalComponent,
  ModalVersionComponent,
  TypographyComponent,
  TabsComponent,
  Tab1Component,
  Tab2Component,
  SearchComponent,
  PopoversComponent,
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    UiFeaturesRoutingModule,
    ButtonsModule,
    ImageViewerModule.forRoot()
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    ModalComponent,
    ModalVersionComponent,
    NgxPopoverCardComponent,
    NgxPopoverFormComponent,
    NgxPopoverTabsComponent,
  ],
})
export class UiFeaturesModule { }
