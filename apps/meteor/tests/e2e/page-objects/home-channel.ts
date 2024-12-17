import type { Locator, Page } from '@playwright/test';

import { HomeContent, HomeSidenav, HomeFlextab, Navbar, Sidebar, Sidepanel, CreateRoomModal } from './fragments';

export class HomeChannel {
	public readonly page: Page;

	readonly content: HomeContent;

	readonly sidenav: HomeSidenav;

	readonly sidebar: Sidebar;

	readonly sidepanel: Sidepanel;

	readonly navbar: Navbar;

	readonly tabs: HomeFlextab;

	readonly createRoomModal: CreateRoomModal;

	constructor(page: Page) {
		this.page = page;
		this.content = new HomeContent(page);
		this.sidenav = new HomeSidenav(page);
		this.sidebar = new Sidebar(page);
		this.sidepanel = new Sidepanel(page);
		this.navbar = new Navbar(page);
		this.tabs = new HomeFlextab(page);
		this.createRoomModal = new CreateRoomModal(page);
	}

	get toastSuccess(): Locator {
		return this.page.locator('.rcx-toastbar.rcx-toastbar--success');
	}

	get btnContextualbarClose(): Locator {
		return this.page.locator('[data-qa="ContextualbarActionClose"]');
	}

	async dismissToast() {
		// this is a workaround for when the toast is blocking the click of the button
		await this.toastSuccess.locator('button >> i.rcx-icon--name-cross.rcx-icon').click();
		await this.page.mouse.move(0, 0);
	}

	get composer(): Locator {
		return this.page.locator('textarea[name="msg"]');
	}

	get userCardToolbar(): Locator {
		return this.page.locator('[role=toolbar][aria-label="User card actions"]');
	}

	get composerToolbar(): Locator {
		return this.page.locator('[role=toolbar][aria-label="Composer Primary Actions"]');
	}

	get composerToolbarActions(): Locator {
		return this.page.locator('[role=toolbar][aria-label="Composer Primary Actions"] button');
	}

	get roomHeaderFavoriteBtn(): Locator {
		return this.page.getByRole('button', { name: 'Favorite' });
	}

	get readOnlyFooter(): Locator {
		return this.page.locator('footer', { hasText: 'This room is read only' });
	}

	get roomHeaderToolbar(): Locator {
		return this.page.locator('[role=toolbar][aria-label="Primary Room actions"]');
	}

	get markUnread(): Locator {
		return this.page.locator('role=menuitem[name="Mark Unread"]');
	}
}
