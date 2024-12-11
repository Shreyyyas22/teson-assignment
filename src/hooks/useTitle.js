import { useEffect } from "react";

export const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} / Tech Store`;
    }, [title]);
    return null;
}
