import { Link } from "./Link";
import { Profile } from "./Profile";

export interface UserInfoDto {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  role: string;
  profile: Profile;
  links: Link[];
}
