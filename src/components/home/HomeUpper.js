import React from "react";
import QuickDailyStats from "./QuickDailyStats";

const HomeUpper = () => {
    return (
        <div className="upper-container">
            <div className="upper-container-left">
                <QuickDailyStats></QuickDailyStats>
            </div>
            <div className="upper-container-right fade-in">
                <div className='upper-home-heading'>
                    <h2>AUTUMN 2023 ADMIN DASHBOARD</h2>
                    <h4>LIBRARY COMPUTER ACCESS/RETRIEVAL SYSTEM</h4>
                </div>

                <div className="upper-home-main">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt earum velit adipisci tempora unde eveniet porro, nihil provident tenetur illo possimus, aut optio sint facere omnis! Et, officia aliquid! Facilis odio architecto non impedit minus, nostrum omnis voluptates beatae vitae id perferendis quidem inventore cum ipsum ipsa vel repudiandae qui a harum pariatur.</p>
                </div>
            </div>
        </div>
    )
}

export default HomeUpper