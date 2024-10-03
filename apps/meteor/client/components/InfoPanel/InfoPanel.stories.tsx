import type { Meta, StoryFn } from '@storybook/react';
import type { ComponentType } from 'react';
import React from 'react';

import {
	InfoPanel,
	InfoPanelAction,
	InfoPanelActionGroup,
	InfoPanelAvatar,
	InfoPanelField,
	InfoPanelLabel,
	InfoPanelSection,
	InfoPanelText,
	InfoPanelTitle,
} from '.';
import { createFakeRoom } from '../../../tests/mocks/data';
import RetentionPolicyCallout from './RetentionPolicyCallout';

export default {
	title: 'Info Panel/InfoPanel',
	component: InfoPanel,
	subcomponents: {
		InfoPanelAction: InfoPanelAction as ComponentType<unknown>,
		InfoPanelActionGroup: InfoPanelActionGroup as ComponentType<unknown>,
		InfoPanelAvatar: InfoPanelAvatar as ComponentType<unknown>,
		InfoPanelField: InfoPanelField as ComponentType<unknown>,
		InfoPanelLabel: InfoPanelLabel as ComponentType<unknown>,
		InfoPanelSection: InfoPanelSection as ComponentType<unknown>,
		InfoPanelText: InfoPanelText as ComponentType<unknown>,
		InfoPanelTitle: InfoPanelTitle as ComponentType<unknown>,
		RetentionPolicyCallout: RetentionPolicyCallout as ComponentType<unknown>,
	},
} satisfies Meta<typeof InfoPanel>;

const fakeRoom = createFakeRoom();

export const Default: StoryFn<typeof InfoPanel> = () => (
	<InfoPanel>
		<InfoPanelAvatar />
		<InfoPanelSection>
			<InfoPanelTitle title='rocketchat-frontend-team' icon='hashtag' />
		</InfoPanelSection>

		<InfoPanelSection>
			<InfoPanelField>
				<InfoPanelLabel>Description</InfoPanelLabel>
				<InfoPanelText>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis nisi vel arcu bibendum vehicula. Integer vitae suscipit
					libero
				</InfoPanelText>
			</InfoPanelField>
			<InfoPanelField>
				<InfoPanelLabel>Announcement</InfoPanelLabel>
				<InfoPanelText>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis nisi vel arcu bibendum vehicula. Integer vitae suscipit
					libero
				</InfoPanelText>
			</InfoPanelField>
			<InfoPanelField>
				<InfoPanelLabel>Topic</InfoPanelLabel>
				<InfoPanelText>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis nisi vel arcu bibendum vehicula. Integer vitae suscipit
					libero
				</InfoPanelText>
			</InfoPanelField>
		</InfoPanelSection>
		<InfoPanelSection>
			<RetentionPolicyCallout room={fakeRoom} />
		</InfoPanelSection>
	</InfoPanel>
);
Default.storyName = 'InfoPanel';
