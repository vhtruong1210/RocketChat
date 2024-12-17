import type { ISubscription, RoomType } from '@rocket.chat/core-typings';
import { Box, States, StatesIcon, StatesSubtitle, StatesTitle } from '@rocket.chat/fuselage';
import { FeaturePreviewOff, FeaturePreviewOn } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import RoomSkeleton from './RoomSkeleton';
import RoomSidepanel from './Sidepanel/RoomSidepanel';
import { useOpenRoom } from './hooks/useOpenRoom';
import { CachedChatSubscription } from '../../../app/models/client';
import { FeaturePreviewSidePanelNavigation } from '../../components/FeaturePreviewSidePanelNavigation';
import { Header } from '../../components/Header';
import { getErrorMessage } from '../../lib/errorHandling';
import { NotAuthorizedError } from '../../lib/errors/NotAuthorizedError';
import { OldUrlRoomError } from '../../lib/errors/OldUrlRoomError';
import { RoomNotFoundError } from '../../lib/errors/RoomNotFoundError';

const RoomProvider = lazy(() => import('./providers/RoomProvider'));
const RoomNotFound = lazy(() => import('./RoomNotFound'));
const Room = lazy(() => import('./Room'));
const RoomLayout = lazy(() => import('./layout/RoomLayout'));
const NotAuthorizedPage = lazy(() => import('../notAuthorized/NotAuthorizedPage'));

type RoomOpenerProps = {
	type: RoomType;
	reference: string;
};

const isDirectOrOmnichannelRoom = (type: RoomType) => type === 'd' || type === 'l';

const RoomOpenerEmbedded = ({ type, reference }: RoomOpenerProps): ReactElement => {
	const { data, error, isSuccess, isError, isLoading } = useOpenRoom({ type, reference });

	const getSubscription = useEndpoint('GET', '/v1/subscriptions.getOne');

	const rid = data?.rid;
	useQuery(
		['subscriptions', rid],
		() => {
			if (!rid) {
				throw new Error('Room not found');
			}
			return getSubscription({ roomId: rid });
		},
		{
			enabled: !!rid,
			suspense: true,
			onSuccess({ subscription }) {
				if (!subscription) {
					throw new Error('Room not found');
				}
				CachedChatSubscription.upsertSubscription(subscription as unknown as ISubscription);
			},
		},
	);

	const { t } = useTranslation();

	return (
		<Box display='flex' w='full' h='full'>
			{!isDirectOrOmnichannelRoom(type) && (
				<FeaturePreviewSidePanelNavigation>
					<FeaturePreviewOff>{null}</FeaturePreviewOff>
					<FeaturePreviewOn>
						<RoomSidepanel />
					</FeaturePreviewOn>
				</FeaturePreviewSidePanelNavigation>
			)}

			<Suspense fallback={<RoomSkeleton />}>
				{isLoading && <RoomSkeleton />}
				{isSuccess && (
					<RoomProvider rid={data.rid}>
						<Room />
					</RoomProvider>
				)}
				{isError &&
					(() => {
						if (error instanceof OldUrlRoomError) {
							return <RoomSkeleton />;
						}

						if (error instanceof RoomNotFoundError) {
							return <RoomNotFound />;
						}

						if (error instanceof NotAuthorizedError) {
							return <NotAuthorizedPage />;
						}

						return (
							<RoomLayout
								header={<Header />}
								body={
									<States>
										<StatesIcon name='circle-exclamation' variation='danger' />
										<StatesTitle>{t('core.Error')}</StatesTitle>
										<StatesSubtitle>{getErrorMessage(error)}</StatesSubtitle>
									</States>
								}
							/>
						);
					})()}
			</Suspense>
		</Box>
	);
};

export default RoomOpenerEmbedded;
