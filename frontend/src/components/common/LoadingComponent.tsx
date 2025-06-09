import type { ReactNode } from "react";
import Loader from "./loader/DefaultLoader";

type LoadingComponentProps = {
    children: ReactNode;
    isLoading: boolean;
    loader?: ReactNode;
};

export default function LoadingComponent({
    children,
    isLoading,
    loader
}: LoadingComponentProps){
    if (isLoading) {
        return loader ? loader : <Loader size="md"/>;
    }
    return <>{children}</>;
}