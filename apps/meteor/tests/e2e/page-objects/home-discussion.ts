import type { Locator, Page } from '@playwright/test';

import { HomeContent, HomeSidenav, HomeFlextab, Navbar, Sidebar, CreateRoomModal } from './fragments';

export class HomeDiscussion {
	private readonly page: Page;

	readonly content: HomeContent;

	readonly sidenav: HomeSidenav;

	readonly sidebar: Sidebar;

	readonly navbar: Navbar;

	readonly tabs: HomeFlextab;

	readonly createRoomModal: CreateRoomModal;

	constructor(page: Page) {
		this.page = page;
		this.content = new HomeContent(page);
		this.sidenav = new HomeSidenav(page);
		this.sidebar = new Sidebar(page);
		this.navbar = new Navbar(page);
		this.tabs = new HomeFlextab(page);
		this.createRoomModal = new CreateRoomModal(page);
	}

	get inputChannelName(): Locator {
		return this.page.locator('role=textbox[name="Parent channel or team"]');
	}

	get inputName(): Locator {
		return this.page.locator('role=textbox[name="Name"]');
	}

	get inputMessage(): Locator {
		return this.page.locator('role=textbox[name="Message"]');
	}

	get btnCreate(): Locator {
		return this.page.locator('role=dialog >> role=group >> role=button[name="Create"]');
	}
}
