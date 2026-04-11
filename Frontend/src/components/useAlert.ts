import { useState, useRef, useCallback, useEffect } from "react";

export const useAlert = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [subtitle, setSubTitle] = useState("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const timeoutRef = useRef<number | null>(null);

    const triggerAlert = useCallback((success: boolean, message: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setIsSuccess(success);
        setSubTitle(message);
        setShowAlert(true);

        setTimeout(() => setIsVisible(true), 10);

        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => setShowAlert(false), 500);
        }, 3000);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return { isSuccess, showAlert, subtitle, isVisible, triggerAlert };
};