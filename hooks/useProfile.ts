import {useQuery} from "@tanstack/react-query";
import {getUserProfile} from "@/app/actions";

const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => getUserProfile(),
    })
}

export default useProfile