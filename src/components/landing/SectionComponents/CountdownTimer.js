import { jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export default function CountdownTimer({ targetHours }) {
    const [timeLeft, setTimeLeft] = useState({
        hours: targetHours,
        minutes: 58,
        seconds: 36,
    });
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                }
                else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                }
                else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (_jsxs("span", { children: [timeLeft.hours, "h : ", timeLeft.minutes.toString().padStart(2, "0"), "m :", " ", timeLeft.seconds.toString().padStart(2, "0"), "s"] }));
}
