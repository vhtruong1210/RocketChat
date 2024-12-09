import type { RocketChatRecordDeleted, ISubscription, ILivechatInquiryRecord, ILivechatDepartmentAgents } from '@rocket.chat/core-typings';
import {
	registerModel,
	SettingsRaw,
	UsersSessionsRaw,
	UsersRaw,
	EmailInboxRaw,
	FederationKeysRaw,
	FederationRoomEventsRaw,
	FederationServersRaw,
	InstanceStatusRaw,
	IntegrationHistoryRaw,
	IntegrationsRaw,
	OAuthAppsRaw,
	LivechatAgentActivityRaw,
	LivechatBusinessHoursRaw,
	LivechatCustomFieldRaw,
	LivechatDepartmentRaw,
	LivechatDepartmentAgentsRaw,
	LivechatInquiryRaw,
	LivechatRoomsRaw,
	LivechatTriggerRaw,
	LivechatVisitorsRaw,
	LoginServiceConfigurationRaw,
	MessagesRaw,
	MigrationsRaw,
	NotificationQueueRaw,
	PbxEventsRaw,
	PermissionsRaw,
	RolesRaw,
	RoomsRaw,
	StatisticsRaw,
	SessionsRaw,
	SubscriptionsRaw,
	TeamMemberRaw,
	TeamRaw,
	UploadsRaw,
	InvitesRaw,
	MatrixBridgedRoomRaw,
	ImportsModel,
	VideoConferenceRaw,
	AnalyticsRaw,
	ServerEventsRaw,
	CalendarEventRaw,
	AppsModel,
	AppsLogsModel,
	OAuthAccessTokensRaw,
	CustomSoundsRaw,
	CustomUserStatusRaw,
} from '@rocket.chat/models';
import type { Collection } from 'mongodb';

import { trashCollection } from './database/trash';
import { db } from './database/utils';

registerModel('ISettingsModel', new SettingsRaw(db, trashCollection));
registerModel('IUsersSessionsModel', new UsersSessionsRaw(db));
registerModel('IUsersModel', new UsersRaw(db, trashCollection));

registerModel('IRolesModel', new RolesRaw(db));
registerModel('IRoomsModel', new RoomsRaw(db, trashCollection));
registerModel('ISubscriptionsModel', new SubscriptionsRaw(db, trashCollection as Collection<RocketChatRecordDeleted<ISubscription>>));
registerModel('ITeamModel', new TeamRaw(db));
registerModel('ITeamMemberModel', new TeamMemberRaw(db));
registerModel('IMessagesModel', new MessagesRaw(db));

registerModel(
	'ILivechatInquiryModel',
	new LivechatInquiryRaw(db, trashCollection as Collection<RocketChatRecordDeleted<ILivechatInquiryRecord>>),
);
registerModel(
	'ILivechatDepartmentAgentsModel',
	new LivechatDepartmentAgentsRaw(db, trashCollection as Collection<RocketChatRecordDeleted<ILivechatDepartmentAgents>>),
);

registerModel('IPermissionsModel', new PermissionsRaw(db));
registerModel('ILoginServiceConfigurationModel', new LoginServiceConfigurationRaw(db));
registerModel('IInstanceStatusModel', new InstanceStatusRaw(db));
registerModel('IIntegrationHistoryModel', new IntegrationHistoryRaw(db));
registerModel('IIntegrationsModel', new IntegrationsRaw(db));
registerModel('IEmailInboxModel', new EmailInboxRaw(db));
registerModel('IPbxEventsModel', new PbxEventsRaw(db));
// registerModel('ILivechatPriorityModel', new LivechatPriorityRaw(db));
registerModel('ILivechatRoomsModel', new LivechatRoomsRaw(db));
registerModel('IUploadsModel', new UploadsRaw(db));
registerModel('ILivechatVisitorsModel', new LivechatVisitorsRaw(db));

registerModel('IFederationKeysModel', new FederationKeysRaw(db));
registerModel('IOAuthAppsModel', new OAuthAppsRaw(db));
registerModel('IStatisticsModel', new StatisticsRaw(db));
registerModel('IMigrationsModel', new MigrationsRaw(db));
registerModel('ILivechatDepartmentModel', new LivechatDepartmentRaw(db));
registerModel('ILivechatTriggerModel', new LivechatTriggerRaw(db));
registerModel('ILivechatCustomFieldModel', new LivechatCustomFieldRaw(db));
registerModel('ILivechatBusinessHoursModel', new LivechatBusinessHoursRaw(db));
registerModel('IFederationRoomEventsModel', new FederationRoomEventsRaw(db));
registerModel('IFederationServersModel', new FederationServersRaw(db));
registerModel('ISessionsModel', new SessionsRaw(db));
registerModel('INotificationQueueModel', new NotificationQueueRaw(db));
registerModel('IInvitesModel', new InvitesRaw(db));
registerModel('IMatrixBridgedRoomModel', new MatrixBridgedRoomRaw(db));
registerModel('IImportsModel', new ImportsModel(db));
registerModel('IVideoConferenceModel', new VideoConferenceRaw(db));
registerModel('IAnalyticsModel', new AnalyticsRaw(db));
registerModel('IServerEventsModel', new ServerEventsRaw(db));
registerModel('ICalendarEventModel', new CalendarEventRaw(db));
registerModel('IAppsModel', new AppsModel(db));
registerModel('IAppLogsModel', new AppsLogsModel(db));
registerModel('ILivechatAgentActivityModel', new LivechatAgentActivityRaw(db));
registerModel('IOAuthAccessTokensModel', new OAuthAccessTokensRaw(db));
registerModel('ICustomSoundsModel', new CustomSoundsRaw(db));
registerModel('ICustomUserStatusModel', new CustomUserStatusRaw(db));
