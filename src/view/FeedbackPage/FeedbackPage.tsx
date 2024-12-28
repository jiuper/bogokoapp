import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { FeedbackView } from "@/view/FeedbackPage/components/FeedbackView";

type FeedbackPageProps = {};
const componentMap = {
    [`${ROUTES.FEEDBACK}/:id`]: (props: FeedbackPageProps) => <FeedbackView {...props} />,
    [`${ROUTES.FEEDBACK}`]: (props: FeedbackPageProps) => <FeedbackView {...props} />,
};
export const FeedbackPage = ({}: FeedbackPageProps) => {
    const componentProps = {
        [`${ROUTES.FEEDBACK}/:id`]: {},
        [`${ROUTES.FEEDBACK}`]: {},
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.FEEDBACK}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
