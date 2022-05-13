/*
* User Profile
* extended and used by User interface in system in UserService
* */
export interface UserDetailsDto {
    id?: string;
    userName?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    isActive?: boolean;
    emailConfirmed?: boolean;
    phoneNumber?: string | undefined;
    imageUrl?: string | undefined;
    tenantId?: string;
}


