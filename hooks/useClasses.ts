"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";

// Define the expected response structure from the API
type Class = {
    id: string; // Assuming BigInt is converted to string
    name: string;
};

export const useClasses = (): UseQueryResult<Class[]> => {
    return useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const response = await fetch("/api/classes");
            const jsonResponse = await response.json();

            if (!response.ok) {
                throw new Error(jsonResponse?.error || "Failed to fetch classes");
            }

            return jsonResponse as Class[];
        },
    });
};
