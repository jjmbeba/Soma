"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    {
        subject: "Math",
        score: 85,
    },
    {
        subject: "Science",
        score: 78,
    },
    {
        subject: "English",
        score: 92,
    },
    {
        subject: "History",
        score: 88,
    },
    {
        subject: "Art",
        score: 95,
    },
    {
        subject: "PE",
        score: 90,
    },
]

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="subject"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                />
                <Bar dataKey="score" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

