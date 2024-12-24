import type { UserData } from "@/entities/user/types";
import { UserRole } from "@/entities/user/types";
import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ClientView } from "@/view/Profile/components/ClientView";
import { MasterView } from "@/view/Profile/components/MasterView";

type ProfileProps = {
    user: UserData | null;
};

const componentMap = {
    profile: (props: ProfileProps) => <ClientView {...props} />,
    personal: (props: object) => <MasterView {...props} />,
};

export const Profile = ({ user }: ProfileProps) => {
    const componentProps = {
        client: { user },
        personal: {},
    };
    const mainUrl = user?.role === UserRole.CLIENT ? "profile" : "personal";

    return (
        <NavigationLayout
            componentMap={componentMap}
            componentProps={componentProps}
            initialComponent={mainUrl}
        />
    );
};
