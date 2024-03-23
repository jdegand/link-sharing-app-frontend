import { Link } from "./Link";
import { ProfileDto } from "./ProfileDto";

export interface Preview {
    id: number;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    profile: ProfileDto;
    links: Link[];
}