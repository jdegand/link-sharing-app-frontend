import { Link } from "./Link";
import { Profile } from "./Profile";

export interface UserInfoDto {
    id: number;
    email: String;
    username: String;
    firstname: String;
    lastname: String;
    role: String;
    profile: Profile;
    links: Link[];
}