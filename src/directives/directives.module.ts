import { NgModule } from '@angular/core';
import { HideheaderDirective } from './hideheader/hideheader';
import { HideHeaderDirective } from './hide-header/hide-header';
@NgModule({
	declarations: [HideheaderDirective,
    HideHeaderDirective],
	imports: [],
	exports: [HideheaderDirective,
    HideHeaderDirective]
})
export class DirectivesModule {}
