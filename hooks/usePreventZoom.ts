import { useEffect } from "react";

const usePreventZoom = () => {
    useEffect(() => {
        const handleFocus = (event: FocusEvent) => {
            const target = event.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                target.style.fontSize = '16px';
            }
        };

        const handleBlur = (event: FocusEvent) => {
            const target = event.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                target.style.fontSize = '';
            }
        };

        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);

        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        };
    }, []);
};

export default usePreventZoom;