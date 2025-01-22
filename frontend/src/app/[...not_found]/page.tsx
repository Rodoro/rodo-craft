import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import NotFound from "@/containers/pages/NotFound"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Not Found',
    ...NO_INDEX_PAGE
}

const page = () => {
    return <NotFound />
}
export default page