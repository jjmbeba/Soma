"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";

type Role = {
    id: number;
    name: string;
};

export const useRoles = (): UseQueryResult<Role[]> => {
    return useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            const response = await fetch("/api/roles");
            const jsonResponse = await response.json();

            if (!response.ok) {
                throw new Error(jsonResponse?.error || "Failed to fetch roles");
            }

            return jsonResponse as Role[];
        },
    });
};
