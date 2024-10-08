import type { GetCompanyDto } from "@/entities/company/types.ts";
import { UserRole } from "@/entities/user/types.ts";
import { ClientView } from "@/view/IndexPage/components/ClientView";
import { MasterView } from "@/view/IndexPage/components/MasterView";

type IndexPageProps = {
    userRole: UserRole;
    companyInfo: GetCompanyDto | null;
    listLink: { name: string; icon: string; onClick: () => void }[];
};
export const IndexPage = ({ userRole, companyInfo, listLink }: IndexPageProps) => {
    return userRole === UserRole.CLIENT ? (
        <ClientView companyInfo={companyInfo} listLink={listLink} />
    ) : (
        <MasterView />
    );
};
