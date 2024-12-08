import { Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';

export const routes: Routes = [
	{path: "", component: LandingComponent},
	{path: "login", component: LoginComponent},
	{path: "signup", component: SignupComponent},
	{
		path: "home",
		component: HomeComponent,
		children: [
			{path: "feed", component: FeedComponent},
			{path: "settings", component: SettingsComponent},
			{path: "search", component: SearchComponent},
			{path: "notifications", component: NotificationsComponent},
			{path: "messages", component: MessagesComponent},
			{path: "profile", component: ProfileComponent},
			{path: "admin", component: AdmindashboardComponent}
		]
	}
];
