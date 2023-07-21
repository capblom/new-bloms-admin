import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './QuickDailyStats.css'

const QuickDailyStats = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [stats, setStats] = useState({
        numOrders: 0,
        avgOrderValue: 0,
        medOrderValue: 0,
        totalOrderValue: 0,
        numOrders7: 0,
        totalOrderValue7: 0
    })

    const consumerKey = 'ck_0bb0c1a16e735059f4a2c00644ad4af42285a69c'
    const consumerSecret = 'cs_e103c56e7fc70262b03bfb34fea7e198a1b44731'

    const config = {
        method: 'get',
        url: `https://blomsbulbs.com/wp-json/wc/v3/last-7-days-orders`,
        auth: {
            username: consumerKey,
            password: consumerSecret
        },
    }

    const fetchData = useCallback(async () => {
        setIsError(false)
        setIsLoading(true)

        try {
            const response = await axios(config)

            const orders = response.data.map(order => ({
                value: parseFloat(order.value),
                date: new Date(order.date),
            }));

            const numOrders7 = orders.length
            const totalOrderValue7 = Number(orders.reduce((sum, order) => sum + order.value, 0).toFixed(2));


            const today = new Date();
            today.setHours(0, 0, 0, 0)

            const todaysOrders = orders.filter(order => {
                const orderDate = new Date(order.date)
                orderDate.setHours(0, 0, 0, 0)
                return orderDate.getTime() === today.getTime()
            });

            const numOrders = todaysOrders.length
            const todaysOrderValues = todaysOrders.map(order => order.value)

            const totalOrderValue = Number(todaysOrderValues.reduce((sum, value) => sum + value, 0).toFixed(2));
            const avgOrderValue = numOrders > 0 ? Number((totalOrderValue / numOrders).toFixed(2)) : 0;

            const sortedValues = todaysOrderValues.slice().sort((a, b) => a - b)
            let medOrderValue;

            if (sortedValues.length % 2 === 0) {
                medOrderValue = Number(((sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2).toFixed(2));
            } else {
                medOrderValue = sortedValues[(sortedValues.length - 1) / 2];
            }

            setStats({
                numOrders,
                avgOrderValue,
                medOrderValue,
                totalOrderValue,
                numOrders7,
                totalOrderValue7,
            });
        } catch (error) {
            setIsError(true)
        }

        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className="quick-daily-stats-container fade-in">

            <div className="quick-daily-stats-label" id="qds-label-1">

                <h3>{stats.numOrders}</h3>
                <h5>NO OF ORDERS</h5>
            </div>

            <div className="quick-daily-stats-label" id="qds-label-2">

                <h3>£{stats.avgOrderValue}</h3>
                <h5>AVERAGE ORDER VALUE</h5>
            </div>

            <div className="quick-daily-stats-label" id="qds-label-3-4">

                <h3>£{stats.medOrderValue}</h3>
                <h5>MEDIAN ORDER VALUE</h5>
            </div>

            <div className="quick-daily-stats-label" id="qds-label-3-4">
                <h3>£{stats.totalOrderValue}</h3>
                <h5>TOTAL ORDER VALUE</h5>

            </div>

            <div className="quick-daily-stats-label">

                <h3>{stats.numOrders7}</h3>
                <h5>NO OF ORDERS (7 DAYS)</h5>
            </div>

            <div className="quick-daily-stats-label">

                <h3>£{stats.totalOrderValue7}</h3>
                <h5>TOTAL ORDER VALUE (7 DAYS)</h5>
            </div>

            {isLoading ? (
                <div className="qds-button-status status-accessing">
                    <h2>ACCESSING</h2>
                </div>
            ) : isError ? (
                <div className="qds-button-status status-error">
                    <h2>ERROR</h2>
                </div>
            ) : (
                <div className="qds-button-status status-connected fade-in">
                    <h2>CONNECTED</h2>
                </div>
            )}

<div className="qds-button-container">
                <div className="qds-button-label">
                    <h2>REFRESH</h2>
                </div>
                <div className='qds-button-button' onClick={fetchData}></div>
            </div>

        </div>
    )
}

export default QuickDailyStats
















