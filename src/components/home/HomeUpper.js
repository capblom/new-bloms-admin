import React from "react";
import QuickDailyStats from "./QuickDailyStats";

const HomeUpper = () => {
    return (
        <div className="upper-container">
            <div className="upper-container-left">
                <QuickDailyStats></QuickDailyStats>
            </div>
            <div className="upper-container-right"></div>
        </div>
    )
}

export default HomeUpper