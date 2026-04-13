import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type FC, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import Alert from "./Alert";

type ToastItem = {
    id: number;
    success: boolean;
    title: string;
    message: string;
    isVisible: boolean;
};

type AlertContextValue = {
    triggerAlert: (success: boolean, message: string, title?: string) => void;
};

const AlertContext = createContext<AlertContextValue>({
    triggerAlert: () => undefined
});

const AUTO_HIDE_MS = 3000;
const EXIT_ANIMATION_MS = 320;

export const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const timerMapRef = useRef<Map<number, number[]>>(new Map());
    const idRef = useRef(0);

    const clearToastTimers = useCallback((id: number) => {
        const timerIds = timerMapRef.current.get(id);
        if (!timerIds) {
            return;
        }

        timerIds.forEach((timerId) => {
            clearTimeout(timerId);
        });
        timerMapRef.current.delete(id);
    }, []);

    const removeToast = useCallback((id: number) => {
        clearToastTimers(id);
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, [clearToastTimers]);

    const triggerAlert = useCallback((success: boolean, message: string, title?: string) => {
        const id = ++idRef.current;
        const resolvedTitle = title ?? (success ? "Success" : "Error");

        setToasts((prev) => {
            const next = [...prev, { id, success, title: resolvedTitle, message, isVisible: false }];
            return next.slice(-3);
        });

        const enterTimer = window.setTimeout(() => {
            setToasts((prev) =>
                prev.map((toast) => (toast.id === id ? { ...toast, isVisible: true } : toast))
            );
        }, 16);

        const exitTimer = window.setTimeout(() => {
            setToasts((prev) =>
                prev.map((toast) => (toast.id === id ? { ...toast, isVisible: false } : toast))
            );
        }, AUTO_HIDE_MS);

        const removeTimer = window.setTimeout(() => {
            removeToast(id);
        }, AUTO_HIDE_MS + EXIT_ANIMATION_MS);

        timerMapRef.current.set(id, [enterTimer, exitTimer, removeTimer]);
    }, [removeToast]);

    useEffect(() => {
        return () => {
            timerMapRef.current.forEach((timerIds) => {
                timerIds.forEach((timerId) => clearTimeout(timerId));
            });
            timerMapRef.current.clear();
        };
    }, []);

    const value = useMemo(() => ({ triggerAlert }), [triggerAlert]);

    return (
        <AlertContext.Provider value={value}>
            {children}
            {createPortal(
                <div className="pointer-events-none fixed bottom-5 right-5 z-9999 flex w-[min(92vw,360px)] flex-col gap-3">
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className={`pointer-events-auto transform transition-all duration-300 ${toast.isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                        >
                            <Alert
                                success={toast.success}
                                MainTitle={toast.title}
                                SubTitle={toast.message}
                                onClose={() => {
                                    removeToast(toast.id);
                                }}
                            />
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    return useContext(AlertContext);
};