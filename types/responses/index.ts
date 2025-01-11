export type ParentStudentGetResponse = {
    success: boolean;
    children: Array<{
        name: string;
        id: bigint;
        class_id: bigint | null;
        created_at: Date | null;
        updated_at: Date | null;
        date_of_birth: Date;
        parent_id: string;
        student_id: bigint;
    }>;
};
