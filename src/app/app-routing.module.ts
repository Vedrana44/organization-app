import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoComponent } from './todo/todo.component';
import { CalendarComponent } from './calendar/calendar.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/todo', pathMatch: 'full'},
    { path: 'todo', component: TodoComponent },
    { path: 'calendar', component: CalendarComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
