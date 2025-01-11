import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const results = [
    {
        subject: "Mathematics",
        grade: "A",
        date: "2023-05-15",
    },
    {
        subject: "Science",
        grade: "B+",
        date: "2023-05-12",
    },
    {
        subject: "English Literature",
        grade: "A-",
        date: "2023-05-10",
    },
    {
        subject: "History",
        grade: "B",
        date: "2023-05-08",
    },
]

export function RecentResults() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {results.map((result) => (
                    <TableRow key={result.subject}>
                        <TableCell className="font-medium">{result.subject}</TableCell>
                        <TableCell>{result.grade}</TableCell>
                        <TableCell>{result.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

