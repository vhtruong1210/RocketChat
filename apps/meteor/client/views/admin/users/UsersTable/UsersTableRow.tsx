import { UserStatus as Status } from '@rocket.chat/core-typings';
import type { IRole, IUser, Serialized } from '@rocket.chat/core-typings';
import { Box, Button, Menu, Option } from '@rocket.chat/fuselage';
import type { DefaultUserInfo } from '@rocket.chat/rest-typings';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import type { ReactElement } from 'react';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Roles } from '../../../../../app/models/client/models/Roles';
import { GenericTableRow, GenericTableCell } from '../../../../components/GenericTable';
import { UserStatus } from '../../../../components/UserStatus';
import type { AdminUsersTab } from '../AdminUsersPage';
import { useChangeAdminStatusAction } from '../hooks/useChangeAdminStatusAction';
import { useChangeUserStatusAction } from '../hooks/useChangeUserStatusAction';
import { useDeleteUserAction } from '../hooks/useDeleteUserAction';
import { useResetE2EEKeyAction } from '../hooks/useResetE2EEKeyAction';
import { useResetTOTPAction } from '../hooks/useResetTOTPAction';
import { useSendWelcomeEmailMutation } from '../hooks/useSendWelcomeEmailMutation';
import { useVoipExtensionAction } from '../voip/hooks/useVoipExtensionAction';

type UsersTableRowProps = {
	user: Serialized<DefaultUserInfo>;
	tab: AdminUsersTab;
	isMobile: boolean;
	isLaptop: boolean;
	onReload: () => void;
	onClick: (id: IUser['_id'], e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>) => void;
	isSeatsCapExceeded: boolean;
	showVoipExtension: boolean;
};

const UsersTableRow = ({
	user,
	tab,
	isMobile,
	isLaptop,
	isSeatsCapExceeded,
	showVoipExtension,
	onClick,
	onReload,
}: UsersTableRowProps): ReactElement => {
	const { t } = useTranslation();

	const {
		_id,
		emails,
		username = '',
		name = '',
		roles,
		status,
		active,
		avatarETag,
		lastLogin,
		type,
		freeSwitchExtension,
		federated,
	} = user;

	const registrationStatusText = useMemo(() => {
		const usersExcludedFromPending = ['bot', 'app'];

		if (!active && lastLogin) {
			return t('Deactivated');
		}

		if (federated) {
			return t('Federated');
		}

		if (!lastLogin && !usersExcludedFromPending.includes(type)) {
			return t('Pending');
		}

		if (active && lastLogin) {
			return t('Active');
		}
	}, [active, lastLogin, t, type, federated]);

	const roleNames = (roles || [])
		.map((roleId) => (Roles.findOne(roleId, { fields: { name: 1 } }) as IRole | undefined)?.name)
		.filter((roleName): roleName is string => !!roleName)
		.join(', ');

	const userId = user._id;
	const isAdmin = user.roles?.includes('admin');
	const isActive = user.active;
	const isFederatedUser = !!user.federated;

	const changeAdminStatusAction = useChangeAdminStatusAction(userId, isAdmin, onReload);
	const changeUserStatusAction = useChangeUserStatusAction(userId, isActive, onReload);
	const deleteUserAction = useDeleteUserAction(userId, onReload, onReload);
	const resetTOTPAction = useResetTOTPAction(userId);
	const resetE2EKeyAction = useResetE2EEKeyAction(userId);
	const resendWelcomeEmail = useSendWelcomeEmailMutation();
	const voipExtensionAction = useVoipExtensionAction({
		enabled: showVoipExtension,
		extension: freeSwitchExtension,
		username,
		name,
	});

	const isNotPendingDeactivatedNorFederated = tab !== 'pending' && tab !== 'deactivated' && !isFederatedUser;
	const menuOptions = useMemo(
		() => ({
			...(voipExtensionAction && {
				voipExtensionAction: {
					label: { label: voipExtensionAction.label, icon: voipExtensionAction.icon },
					action: voipExtensionAction.action,
				},
			}),
			...(isNotPendingDeactivatedNorFederated &&
				changeAdminStatusAction && {
					makeAdmin: {
						label: { label: changeAdminStatusAction.label, icon: changeAdminStatusAction.icon },
						action: changeAdminStatusAction.action,
					},
				}),
			...(isNotPendingDeactivatedNorFederated &&
				resetE2EKeyAction && {
					resetE2EKey: { label: { label: resetE2EKeyAction.label, icon: resetE2EKeyAction.icon }, action: resetE2EKeyAction.action },
				}),
			...(isNotPendingDeactivatedNorFederated &&
				resetTOTPAction && {
					resetTOTP: { label: { label: resetTOTPAction.label, icon: resetTOTPAction.icon }, action: resetTOTPAction.action },
				}),
			...(changeUserStatusAction &&
				!isFederatedUser && {
					changeActiveStatus: {
						label: { label: changeUserStatusAction.label, icon: changeUserStatusAction.icon },
						action: changeUserStatusAction.action,
					},
				}),
			...(deleteUserAction && {
				delete: { label: { label: deleteUserAction.label, icon: deleteUserAction.icon }, action: deleteUserAction.action },
			}),
		}),
		[
			changeAdminStatusAction,
			changeUserStatusAction,
			deleteUserAction,
			isFederatedUser,
			isNotPendingDeactivatedNorFederated,
			resetE2EKeyAction,
			resetTOTPAction,
			voipExtensionAction,
		],
	);

	const handleResendWelcomeEmail = () => resendWelcomeEmail.mutateAsync({ email: emails?.[0].address });

	return (
		<GenericTableRow
			onKeyDown={(e): void => onClick(_id, e)}
			onClick={(e): void => onClick(_id, e)}
			tabIndex={0}
			role='link'
			action
			qa-user-id={_id}
		>
			<GenericTableCell withTruncatedText>
				<Box display='flex' alignItems='center'>
					{username && <UserAvatar size={isMobile || isLaptop ? 'x28' : 'x40'} username={username} etag={avatarETag} />}
					<Box display='flex' flexGrow={1} flexShrink={1} flexBasis='0%' alignSelf='center' alignItems='center' withTruncatedText>
						<Box mi={8}>
							<UserStatus status={status || Status.OFFLINE} />
						</Box>
						<Box fontScale='p2' withTruncatedText>
							{name || username}
						</Box>
					</Box>
				</Box>
			</GenericTableCell>

			<GenericTableCell>
				<Box fontScale='p2m' color='hint' withTruncatedText>
					{username}
				</Box>
			</GenericTableCell>

			{!isLaptop && <GenericTableCell withTruncatedText>{emails?.length && emails[0].address}</GenericTableCell>}

			{!isLaptop && <GenericTableCell withTruncatedText>{roleNames}</GenericTableCell>}

			{tab === 'all' && !isMobile && (
				<GenericTableCell fontScale='p2' color='hint' withTruncatedText>
					{registrationStatusText}
				</GenericTableCell>
			)}

			{tab === 'pending' && !isMobile && (
				<GenericTableCell fontScale='p2' color='hint' withTruncatedText>
					<Box display='flex' flexDirection='row' alignContent='flex-end'>
						{active ? t('User_first_log_in') : t('Activation')}
					</Box>
				</GenericTableCell>
			)}

			{tab === 'all' && showVoipExtension && (
				<GenericTableCell fontScale='p2' color='hint' withTruncatedText>
					{freeSwitchExtension || t('Not_assigned')}
				</GenericTableCell>
			)}

			<GenericTableCell
				onClick={(e): void => {
					e.stopPropagation();
				}}
			>
				<Box display='flex' justifyContent='flex-end'>
					{tab === 'pending' && (
						<>
							{active ? (
								<Button small secondary onClick={handleResendWelcomeEmail}>
									{t('Resend_welcome_email')}
								</Button>
							) : (
								<Button small primary onClick={changeUserStatusAction?.action} disabled={isSeatsCapExceeded}>
									{t('Activate')}
								</Button>
							)}
						</>
					)}

					<Menu
						mi={4}
						placement='bottom-start'
						flexShrink={0}
						key='menu'
						aria-label={t('More_actions')}
						title={t('More_actions')}
						renderItem={({ label: { label, icon }, ...props }): ReactElement => (
							<Option label={label} title={label} icon={icon} variant={label === 'Delete' ? 'danger' : ''} {...props} />
						)}
						options={menuOptions}
					/>
				</Box>
			</GenericTableCell>
		</GenericTableRow>
	);
};

export default UsersTableRow;
