import { Link } from "./Link";
import { ProfileDto } from "./ProfileDto";

export interface Preview {
    id: number;
    email: String;
    username: String;
    firstname: String;
    lastname: String;
    role: String;
    profile: ProfileDto;
    links: Link[];
}